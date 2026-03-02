/**
 * The Cognitive Shift — Newsletter Modal JS
 *
 * Scroll-triggered newsletter signup modal for article pages.
 * Trigger: 30% scroll through .article-content.
 * Condition: Only shows if localStorage "tcs_newsletter" is NOT set.
 */

(function () {
  var _modalTriggered = false;

  /**
   * Attach scroll listener that fires once the reader scrolls past
   * 30% of .article-content height.
   */
  function scrollTrigger() {
    var content = document.querySelector(".article-content");
    if (!content) return;

    function onScroll() {
      if (_modalTriggered) return;

      var rect = content.getBoundingClientRect();
      var contentHeight = content.offsetHeight;
      var scrolledIntoContent = -rect.top + window.innerHeight;
      var threshold = contentHeight * 0.3;

      if (scrolledIntoContent >= threshold) {
        _modalTriggered = true;
        window.removeEventListener("scroll", onScroll);
        showModal();
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /**
   * Show the newsletter modal overlay.
   * Skips if tcs_newsletter is already set in localStorage.
   */
  function showModal() {
    if (localStorage.getItem("tcs_newsletter")) return;

    var overlay = document.getElementById("newsletter-modal-overlay");
    if (!overlay) return;

    overlay.style.display = "";
    overlay.classList.remove("fade-out");
  }

  /**
   * Close the modal with a fade-out animation.
   */
  function closeModal() {
    var overlay = document.getElementById("newsletter-modal-overlay");
    if (!overlay) return;

    overlay.classList.add("fade-out");
    overlay.addEventListener("animationend", function handler() {
      overlay.removeEventListener("animationend", handler);
      overlay.style.display = "none";
      overlay.classList.remove("fade-out");
    });
  }

  /**
   * Wire up all modal event handlers.
   */
  function initNewsletterModal() {
    var overlay = document.getElementById("newsletter-modal-overlay");
    var closeBtn = document.getElementById("newsletter-modal-close");
    var form = document.getElementById("newsletter-modal-form");
    var alreadyBtn = document.getElementById("newsletter-modal-already");

    if (!overlay) return;

    var publicationSlug = overlay.getAttribute("data-publication-slug") || "";

    // Close button — hide modal, no localStorage update (will reappear next visit)
    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal);
    }

    // Click on overlay background closes modal
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) {
        closeModal();
      }
    });

    // Subscribe form handler
    if (form) {
      form.addEventListener("submit", async function (e) {
        e.preventDefault();
        var input = form.querySelector('input[type="email"]');
        var button = form.querySelector("button");
        var email = input.value.trim();
        if (!email) return;

        var originalText = button.textContent;
        button.textContent = "Joining...";
        button.disabled = true;

        var isDuplicate = false;

        try {
          await createNewsletterSubscriber(email, "article_modal", publicationSlug);
        } catch (subErr) {
          isDuplicate = subErr.message && subErr.message.indexOf("400") !== -1;
          if (!isDuplicate) {
            // Real error — show message and bail
            console.error("Modal signup error:", subErr);
            button.textContent = originalText;
            button.disabled = false;

            var existingErr = overlay.querySelector(".modal-signup-error");
            if (existingErr) existingErr.remove();
            var errEl = document.createElement("div");
            errEl.className = "modal-signup-error";
            errEl.textContent = "Something went wrong \u2014 please try again.";
            errEl.style.color = "#c0392b";
            errEl.style.fontSize = "0.85rem";
            errEl.style.marginTop = "0.5rem";
            errEl.style.textAlign = "center";
            form.insertAdjacentElement("afterend", errEl);
            return;
          }
        }

        // Success (new or duplicate) — set localStorage and show confirmation
        localStorage.setItem("tcs_newsletter", "subscribed");

        var confirmMsg = isDuplicate ? "You\u2019re already subscribed" : "You are in";
        var modalContent = overlay.querySelector(".modal-content");
        modalContent.innerHTML =
          '<p style="font-family:\'Playfair Display\',Georgia,serif;font-size:1.2rem;' +
          'color:var(--cream);text-align:center;padding:2rem 0;margin:0;">' + confirmMsg + '</p>';

        setTimeout(closeModal, 2000);
      });
    }

    // "Already subscribed" handler
    if (alreadyBtn) {
      alreadyBtn.addEventListener("click", function () {
        localStorage.setItem("tcs_newsletter", "existing");
        closeModal();
      });
    }

    // Activate scroll trigger on article pages
    if (document.querySelector(".article-content")) {
      scrollTrigger();
    }
  }

  document.addEventListener("DOMContentLoaded", initNewsletterModal);
})();
