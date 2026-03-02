#!/usr/bin/env node

/**
 * Send weekly digest newsletter to all subscribers via Resend.
 *
 * Builds a grouped email template with articles organized by publication.
 *
 * Environment variables:
 *   RESEND_API_KEY             - Resend API key (re_xxx)
 *   POCKETBASE_URL             - PocketBase base URL (https://...)
 *   POCKETBASE_ADMIN_EMAIL     - Admin email for auth
 *   POCKETBASE_ADMIN_PASSWORD  - Admin password for auth
 *
 * Usage:
 *   node scripts/send-newsletter.js                   # send to all subscribers
 *   node scripts/send-newsletter.js --preview         # send only to reese@unvanity.com
 *   node scripts/send-newsletter.js --dry-run         # print what would be sent, send nothing
 *   node scripts/send-newsletter.js --since 2026-02-01
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const POCKETBASE_URL = process.env.POCKETBASE_URL;
const POCKETBASE_ADMIN_EMAIL = process.env.POCKETBASE_ADMIN_EMAIL;
const POCKETBASE_ADMIN_PASSWORD = process.env.POCKETBASE_ADMIN_PASSWORD;
const SITE_URL = "https://thecognitiveshift.com";
const FROM_EMAIL = "The Cognitive Shift <hello@thecognitiveshift.com>";
const PREVIEW_EMAIL = "rhys@unvanity.com";

// ---------------------------------------------------------------------------
// CLI flags
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const preview = args.includes("--preview");

function getFlagValue(flag) {
  const idx = args.indexOf(flag);
  if (idx === -1 || idx + 1 >= args.length) return null;
  return args[idx + 1];
}

// Default: articles published in the last 7 days
const sinceFlag = getFlagValue("--since");
const sinceDate = sinceFlag
  ? new Date(sinceFlag)
  : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

if (!dryRun && !RESEND_API_KEY) {
  console.error("ERROR: RESEND_API_KEY environment variable is required");
  process.exit(1);
}

if (!POCKETBASE_URL) {
  console.error("ERROR: POCKETBASE_URL environment variable is required");
  process.exit(1);
}

if (!dryRun && (!POCKETBASE_ADMIN_EMAIL || !POCKETBASE_ADMIN_PASSWORD)) {
  console.error("ERROR: POCKETBASE_ADMIN_EMAIL and POCKETBASE_ADMIN_PASSWORD are required");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// PocketBase helpers
// ---------------------------------------------------------------------------

let adminToken = null;

async function authenticateAdmin() {
  const res = await fetch(`${POCKETBASE_URL}/api/collections/_superusers/auth-with-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      identity: POCKETBASE_ADMIN_EMAIL,
      password: POCKETBASE_ADMIN_PASSWORD,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Admin auth failed: ${res.status} — ${body}`);
  }

  const data = await res.json();
  adminToken = data.token;
  console.log("Authenticated as admin");
}

async function pbFetch(path) {
  const url = `${POCKETBASE_URL}${path}`;
  const headers = {};
  if (adminToken) headers.Authorization = adminToken;

  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error(`PocketBase GET failed: ${res.status} ${res.statusText} — ${url}`);
  }
  return res.json();
}

async function fetchAllPages(path) {
  let page = 1;
  const perPage = 200;
  const items = [];

  while (true) {
    const separator = path.includes("?") ? "&" : "?";
    const data = await pbFetch(`${path}${separator}page=${page}&perPage=${perPage}`);
    items.push(...data.items);
    if (page >= data.totalPages) break;
    page++;
  }

  return items;
}

// ---------------------------------------------------------------------------
// Fetch data
// ---------------------------------------------------------------------------

async function getSubscribers() {
  const subscribers = await fetchAllPages("/api/collections/newsletter_subscribers/records");
  console.log(`Found ${subscribers.length} subscriber(s)`);
  return subscribers;
}

async function getRecentArticles() {
  const sinceISO = sinceDate.toISOString().replace("T", " ");
  const filter = `is_published=true && published_at>='${sinceISO}'`;
  const path = `/api/collections/articles/records?filter=${encodeURIComponent(filter)}&sort=-published_at&expand=author,publication`;
  const articles = await fetchAllPages(path);
  console.log(`Found ${articles.length} article(s) published since ${sinceDate.toISOString().slice(0, 10)}`);
  return articles;
}

// ---------------------------------------------------------------------------
// Email building — grouped by publication
// ---------------------------------------------------------------------------

function groupArticlesByPublication(articles) {
  const groups = {};
  for (const article of articles) {
    const pubName = article.expand?.publication?.name || "The Cognitive Shift";
    const pubSlug = article.expand?.publication?.slug || "";
    const key = pubSlug || pubName;
    if (!groups[key]) {
      groups[key] = { name: pubName, slug: pubSlug, articles: [] };
    }
    groups[key].articles.push(article);
  }
  return Object.values(groups);
}

function buildArticleRowHtml(article) {
  const authorName = article.expand?.author?.display_name || "The Cognitive Shift";
  const pubSlug = article.expand?.publication?.slug || "";
  const articleUrl = `${SITE_URL}/publications/${pubSlug}/${article.slug}`;
  const excerpt = article.excerpt || "";

  return `
        <tr>
          <td style="padding: 20px 0; border-bottom: 1px solid #e8e0d4;">
            <h3 style="margin: 0 0 6px; font-family: Georgia, 'Times New Roman', serif; font-size: 20px; font-weight: normal; color: #1a2a22; line-height: 1.3;">
              <a href="${articleUrl}" style="color: #1a2a22; text-decoration: none;">${article.title}</a>
            </h3>
            <p style="margin: 0 0 8px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 13px; color: #8a8070;">
              By ${authorName}
            </p>
            <p style="margin: 0 0 12px; font-family: Georgia, 'Times New Roman', serif; font-size: 16px; color: #3d3830; line-height: 1.6;">
              ${excerpt}
            </p>
            <a href="${articleUrl}" style="color: #5a7a5a; text-decoration: none; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase;">
              Read more &rarr;
            </a>
          </td>
        </tr>`;
}

function buildPublicationGroupHtml(group) {
  const pubUrl = group.slug ? `${SITE_URL}/publications/${group.slug}/` : SITE_URL;
  const articleRows = group.articles.map(buildArticleRowHtml).join("");

  return `
      <tr>
        <td style="padding: 28px 0 4px;">
          <table width="100%" cellpadding="0" cellspacing="0"><tr>
            <td style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: #5a7a5a; padding-bottom: 8px; border-bottom: 2px solid #c8a45c;">
              <a href="${pubUrl}" style="color: #5a7a5a; text-decoration: none;">${group.name}</a>
            </td>
          </tr></table>
        </td>
      </tr>
      <tr>
        <td>
          <table width="100%" cellpadding="0" cellspacing="0">
            ${articleRows}
          </table>
        </td>
      </tr>`;
}

function buildEmailHtml(articles) {
  const groups = groupArticlesByPublication(articles);
  const groupRows = groups.map(buildPublicationGroupHtml).join("");
  const unsubscribeUrl = `mailto:hello@thecognitiveshift.com?subject=Unsubscribe&body=Please%20unsubscribe%20me%20from%20the%20newsletter.`;

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin: 0; padding: 0; background-color: #1a2a22; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #1a2a22;">
    <!-- Header -->
    <tr>
      <td align="center" style="padding: 40px 20px 0;">
        <table width="600" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center" style="padding: 32px 40px;">
              <h1 style="margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 24px; font-weight: normal; color: #f0e8d8; letter-spacing: 0.02em;">The Cognitive Shift</h1>
              <table width="60" cellpadding="0" cellspacing="0" style="margin: 16px auto 8px;">
                <tr><td style="height: 1px; background: #c8a45c;"></td></tr>
              </table>
              <p style="margin: 0; font-size: 10px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: #5a7a68;">Weekly digest</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <!-- Body -->
    <tr>
      <td align="center" style="padding: 0 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #f5efe5;">
          <tr>
            <td style="padding: 12px 40px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                ${groupRows}
              </table>
            </td>
          </tr>
          <!-- CTA -->
          <tr>
            <td align="center" style="padding: 8px 40px 40px;">
              <a href="${SITE_URL}" style="display: inline-block; background-color: #1a2a22; color: #f0e8d8; padding: 14px 32px; text-decoration: none; font-size: 11px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase;">
                Visit The Cognitive Shift
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <!-- Footer -->
    <tr>
      <td align="center" style="padding: 0 20px 40px;">
        <table width="600" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center" style="padding: 24px 40px;">
              <p style="margin: 0 0 8px; font-size: 12px; color: #5a7a68; line-height: 1.5;">
                You received this because you subscribed to The Cognitive Shift newsletter.
              </p>
              <a href="${unsubscribeUrl}" style="color: #988f7a; font-size: 12px; text-decoration: underline;">Unsubscribe</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildEmailText(articles) {
  const groups = groupArticlesByPublication(articles);
  const lines = ["The Cognitive Shift — Weekly Digest\n"];

  for (const group of groups) {
    lines.push(`\n=== ${group.name} ===\n`);
    for (const article of group.articles) {
      const authorName = article.expand?.author?.display_name || "The Cognitive Shift";
      const pubSlug = article.expand?.publication?.slug || "";
      const articleUrl = `${SITE_URL}/publications/${pubSlug}/${article.slug}`;
      lines.push(`${article.title}`);
      lines.push(`By ${authorName}`);
      if (article.excerpt) lines.push(article.excerpt);
      lines.push(`Read more: ${articleUrl}\n`);
    }
  }

  lines.push(`---\nVisit: ${SITE_URL}`);
  lines.push("You received this because you subscribed to The Cognitive Shift newsletter.");
  lines.push("To unsubscribe, reply to this email with 'Unsubscribe'.");
  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Send via Resend
// ---------------------------------------------------------------------------

async function sendEmail(to, subject, html, text) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [to],
      subject,
      html,
      text,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend API error: ${res.status} — ${body}`);
  }

  return res.json();
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const mode = dryRun ? "DRY RUN" : preview ? "PREVIEW" : "SENDING NEWSLETTER";
  console.log(`=== ${mode} ===`);
  console.log(`Since: ${sinceDate.toISOString().slice(0, 10)}\n`);

  if (!dryRun) {
    await authenticateAdmin();
  }

  const [subscribers, articles] = await Promise.all([
    getSubscribers(),
    getRecentArticles(),
  ]);

  if (articles.length === 0) {
    console.log("\nNo new articles to send. Exiting.");
    return;
  }

  const subject = articles.length === 1
    ? `New: ${articles[0].title}`
    : `${articles.length} new articles on The Cognitive Shift`;

  const html = buildEmailHtml(articles);
  const text = buildEmailText(articles);

  // Determine recipients
  const recipients = preview
    ? [{ email: PREVIEW_EMAIL }]
    : subscribers;

  console.log(`\nSubject: ${subject}`);
  console.log(`Recipients: ${preview ? `${PREVIEW_EMAIL} (preview)` : recipients.length}`);
  console.log(`Articles: ${articles.map((a) => a.title).join(", ")}\n`);

  let sent = 0;
  let failed = 0;

  for (const sub of recipients) {
    if (dryRun) {
      console.log(`[DRY RUN] Would send to: ${sub.email}`);
      sent++;
      continue;
    }

    try {
      const result = await sendEmail(sub.email, subject, html, text);
      console.log(`Sent to ${sub.email} (id: ${result.id})`);
      sent++;
    } catch (err) {
      console.error(`Failed to send to ${sub.email}: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n=== DONE ===`);
  console.log(`Sent: ${sent}, Failed: ${failed}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
