/**
 * The Cognitive Shift — Main JS
 *
 * Handles all signup toggle instances and form submissions.
 * Newsletter modal logic lives in newsletter-modal.js.
 */

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function showFormError(form, message) {
  var existing = form.parentElement.querySelector(".signup-error");
  if (existing) existing.remove();

  var el = document.createElement("div");
  el.className = "signup-error";
  el.textContent = message;
  el.style.color = "#c0392b";
  el.style.fontSize = "0.85rem";
  el.style.marginTop = "0.5rem";
  form.insertAdjacentElement("afterend", el);

  setTimeout(function () {
    if (el.parentElement) el.remove();
  }, 5000);
}

// ---------------------------------------------------------------------------
// Newsletter form handler (simple email → subscribe, stay on page)
// ---------------------------------------------------------------------------

async function handleNewsletterSignup(event) {
  event.preventDefault();
  var form = event.target;
  var emailInput = form.querySelector('input[type="email"]');
  var button = form.querySelector("button");
  var email = emailInput.value.trim();

  if (!email) return;

  var originalText = button.textContent;
  button.textContent = "Joining...";
  button.disabled = true;

  try {
    await createNewsletterSubscriber(email, "newsletter", "");
    localStorage.setItem("tcs_newsletter", "subscribed");
    button.textContent = "You\u2019re in";
    emailInput.value = "";
    setTimeout(function () {
      button.textContent = originalText;
      button.disabled = false;
    }, 3000);
  } catch (err) {
    var isDuplicate = err.message && err.message.indexOf("400") !== -1;
    if (isDuplicate) {
      localStorage.setItem("tcs_newsletter", "subscribed");
      button.textContent = "Already subscribed";
      emailInput.value = "";
      setTimeout(function () {
        button.textContent = originalText;
        button.disabled = false;
      }, 3000);
    } else {
      console.error("Newsletter signup error:", err);
      button.textContent = originalText;
      button.disabled = false;
      showFormError(form, "Something went wrong \u2014 please try again.");
    }
  }
}

// ---------------------------------------------------------------------------
// Community form handler (email → create subscriber → redirect to /signup/)
// ---------------------------------------------------------------------------

async function handleCommunitySignup(event) {
  event.preventDefault();
  var form = event.target;
  var emailInput = form.querySelector('input[type="email"]');
  var button = form.querySelector("button");
  var email = emailInput.value.trim();

  if (!email) return;

  var originalText = button.textContent;
  button.textContent = "Joining...";
  button.disabled = true;

  try {
    await createNewsletterSubscriber(email, "community", "");
  } catch (err) {
    var isDuplicate = err.message && err.message.indexOf("400") !== -1;
    if (!isDuplicate) {
      console.error("Community signup error:", err);
      button.textContent = originalText;
      button.disabled = false;
      showFormError(form, "Something went wrong \u2014 please try again.");
      return;
    }
  }

  localStorage.setItem("tcs_signup_email", email);
  button.textContent = "Redirecting...";
  setTimeout(function () {
    window.location.href = "/signup/?source=community";
  }, 400);
}

// ---------------------------------------------------------------------------
// Initialize all signup toggle instances on the page
// ---------------------------------------------------------------------------

function initAllToggles() {
  var blocks = document.querySelectorAll("[data-signup-toggle]");

  blocks.forEach(function (block) {
    var toggle = block.querySelector("[data-toggle-switch]");
    var labelNewsletter = block.querySelector('[data-label="newsletter"]');
    var labelCommunity = block.querySelector('[data-label="community"]');
    var panelNewsletter = block.querySelector('[data-panel="newsletter"]');
    var panelCommunity = block.querySelector('[data-panel="community"]');
    var formNewsletter = block.querySelector('[data-form="newsletter"]');
    var formCommunity = block.querySelector('[data-form="community"]');

    if (!toggle) return;

    var isCommunity = false;
    toggle.setAttribute("aria-checked", "false");

    toggle.addEventListener("click", function () {
      isCommunity = !isCommunity;
      toggle.setAttribute("aria-checked", isCommunity ? "true" : "false");

      if (isCommunity) {
        labelNewsletter.classList.remove("mode-toggle-label--active");
        labelCommunity.classList.add("mode-toggle-label--active");
        panelNewsletter.classList.remove("mode-panel--active");
        panelCommunity.classList.add("mode-panel--active");
      } else {
        labelCommunity.classList.remove("mode-toggle-label--active");
        labelNewsletter.classList.add("mode-toggle-label--active");
        panelCommunity.classList.remove("mode-panel--active");
        panelNewsletter.classList.add("mode-panel--active");
      }
    });

    if (formNewsletter) {
      formNewsletter.addEventListener("submit", handleNewsletterSignup);
    }
    if (formCommunity) {
      formCommunity.addEventListener("submit", handleCommunitySignup);
    }
  });
}

// ---------------------------------------------------------------------------
// Page initialization
// ---------------------------------------------------------------------------

function initPage() {
  initAllToggles();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPage);
} else {
  initPage();
}
