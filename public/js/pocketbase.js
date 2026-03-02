/**
 * The Cognitive Shift — PocketBase API Helpers
 *
 * Form submission helpers only. Content is statically rendered by Astro.
 * No SDK — uses fetch directly against CONFIG.POCKETBASE_URL.
 */

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function _pbUrl(collection) {
  return CONFIG.POCKETBASE_URL + "/api/collections/" + encodeURIComponent(collection) + "/records";
}

async function _pbPost(url, data) {
  var response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    var body = await response.text();
    throw new Error("PocketBase error " + response.status + ": " + body);
  }
  return await response.json();
}

// ---------------------------------------------------------------------------
// Form submissions (write-only, public create)
// ---------------------------------------------------------------------------

/**
 * Create a newsletter subscriber record.
 * @param {string} email
 * @param {string} source - e.g. "landing" or "article_modal"
 * @param {string} [publicationSlug] - publication slug the user subscribed from
 * @returns {Promise<Object>} Created record
 */
async function createNewsletterSubscriber(email, source, publicationSlug) {
  var payload = {
    email: email,
    source: source,
    subscribed_at: new Date().toISOString()
  };
  if (publicationSlug) {
    payload.publications = [publicationSlug];
  }
  return _pbPost(_pbUrl("newsletter_subscribers"), payload);
}

/**
 * Create a publication signal record.
 * Always succeeds (collection is not unique on email) — used for server-side
 * reconciliation into the subscriber's publications array.
 * @param {string} email
 * @param {string} publicationSlug
 * @returns {Promise<Object>} Created record
 */
async function createPublicationSignal(email, publicationSlug) {
  return _pbPost(_pbUrl("newsletter_publication_signals"), {
    email: email,
    publication_slug: publicationSlug
  });
}

/**
 * Create a community application record.
 * @param {Object} data - { email, role, linkedin_url, twitter_url, github_url, motivation }
 * @returns {Promise<Object>} Created record
 */
async function createCommunityApplication(data) {
  return _pbPost(_pbUrl("community_applications"), {
    email: data.email,
    role: data.role,
    linkedin_url: data.linkedin_url,
    twitter_url: data.twitter_url || "",
    github_url: data.github_url || "",
    motivation: data.motivation,
    status: "pending",
    applied_at: new Date().toISOString()
  });
}
