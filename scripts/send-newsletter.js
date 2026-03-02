#!/usr/bin/env node

/**
 * Send weekly digest newsletter to all subscribers via Resend.
 *
 * Before sending, reconciles publication signals into each subscriber's
 * publications array, then builds a grouped email template.
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
const FROM_EMAIL = "The Cognitive Shift <newsletter@thecognitiveshift.com>";
const PREVIEW_EMAIL = "reese@unvanity.com";

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
  const res = await fetch(`${POCKETBASE_URL}/api/admins/auth-with-password`, {
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

async function pbPatch(path, body) {
  const url = `${POCKETBASE_URL}${path}`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: adminToken,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PocketBase PATCH failed: ${res.status} — ${text}`);
  }
  return res.json();
}

async function pbDelete(path) {
  const url = `${POCKETBASE_URL}${path}`;
  const res = await fetch(url, {
    method: "DELETE",
    headers: { Authorization: adminToken },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PocketBase DELETE failed: ${res.status} — ${text}`);
  }
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
// Reconcile publication signals
// ---------------------------------------------------------------------------

async function reconcilePublicationSignals() {
  const signals = await fetchAllPages("/api/collections/newsletter_publication_signals/records");
  if (signals.length === 0) {
    console.log("No publication signals to reconcile");
    return;
  }

  console.log(`Reconciling ${signals.length} publication signal(s)...`);

  // Group signals by email
  const byEmail = {};
  for (const sig of signals) {
    if (!byEmail[sig.email]) byEmail[sig.email] = [];
    byEmail[sig.email].push(sig);
  }

  for (const [email, emailSignals] of Object.entries(byEmail)) {
    // Find the subscriber
    const filter = `email='${email.replace(/'/g, "\\'")}'`;
    const path = `/api/collections/newsletter_subscribers/records?filter=${encodeURIComponent(filter)}`;
    const data = await pbFetch(path);

    if (data.items.length === 0) {
      console.log(`  Skipping signals for ${email} — no subscriber record found`);
      continue;
    }

    const subscriber = data.items[0];
    const existing = new Set(subscriber.publications || []);
    let added = 0;

    for (const sig of emailSignals) {
      if (sig.publication_slug && !existing.has(sig.publication_slug)) {
        existing.add(sig.publication_slug);
        added++;
      }
    }

    if (added > 0) {
      await pbPatch(
        `/api/collections/newsletter_subscribers/records/${subscriber.id}`,
        { publications: Array.from(existing) }
      );
      console.log(`  ${email}: added ${added} publication(s) → [${Array.from(existing).join(", ")}]`);
    } else {
      console.log(`  ${email}: no new publications to add`);
    }

    // Delete processed signals
    for (const sig of emailSignals) {
      await pbDelete(`/api/collections/newsletter_publication_signals/records/${sig.id}`);
    }
  }

  console.log("Reconciliation complete\n");
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
          <td style="padding: 16px 0; border-bottom: 1px solid #e5e0d8;">
            <h3 style="margin: 0 0 6px; font-size: 18px; color: #2d2d2d;">
              <a href="${articleUrl}" style="color: #2d2d2d; text-decoration: none;">${article.title}</a>
            </h3>
            <p style="margin: 0 0 6px; font-size: 13px; color: #888;">
              By ${authorName}
            </p>
            <p style="margin: 0 0 10px; font-size: 15px; color: #444; line-height: 1.5;">
              ${excerpt}
            </p>
            <a href="${articleUrl}" style="color: #5a7a5a; text-decoration: underline; font-size: 13px;">
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
        <td style="padding: 24px 0 8px;">
          <h2 style="margin: 0; font-size: 20px; color: #2d2d2d; border-bottom: 2px solid #c9a96e; padding-bottom: 8px;">
            <a href="${pubUrl}" style="color: #2d2d2d; text-decoration: none;">${group.name}</a>
          </h2>
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

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin: 0; padding: 0; background-color: #f5f0eb; font-family: Georgia, 'Times New Roman', serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f0eb; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; padding: 40px;">
          <tr>
            <td>
              <h1 style="margin: 0 0 4px; font-size: 28px; color: #2d2d2d;">The Cognitive Shift</h1>
              <p style="margin: 0 0 24px; font-size: 16px; color: #888;">Weekly digest</p>
            </td>
          </tr>
          ${groupRows}
          <tr>
            <td style="padding-top: 32px;">
              <a href="${SITE_URL}" style="display: inline-block; background-color: #5a7a5a; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-size: 14px;">
                Visit The Cognitive Shift
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding-top: 32px; font-size: 12px; color: #999; line-height: 1.5;">
              You received this because you subscribed to The Cognitive Shift newsletter.
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

  // Reconcile publication signals before sending
  if (!dryRun) {
    await reconcilePublicationSignals();
  } else {
    console.log("[DRY RUN] Skipping signal reconciliation\n");
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
