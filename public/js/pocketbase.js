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
 * @returns {Promise<Object>} Created record
 */
async function createNewsletterSubscriber(email, source) {
  return _pbPost(_pbUrl("newsletter_subscribers"), {
    email: email,
    source: source,
    subscribed_at: new Date().toISOString()
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
