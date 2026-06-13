/* Jannalee Physiotherapy — minimal site JS
   Mobile nav toggle + static contact-form confirmation.
   No backend; form submission is intercepted and shows a thank-you message. */

(function () {
  "use strict";

  /* ---- Mobile nav toggle ---- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("primaryNav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    // Close the menu when a link is tapped (mobile)
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- Static contact form ---- */
  /* When a real booking backend (or Jane App embed) is wired up, replace this
     block with the real submit handler. For now it just confirms on screen. */
  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var success = document.getElementById("formSuccess");
      if (success) {
        success.classList.add("show");
        success.setAttribute("tabindex", "-1");
        success.focus();
      }
      form.reset();
      success.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  /* ---- Team bios open in a popup (team page) ---- */
  /* Each card carries a hidden .member-bio-content. "Read Bio" copies that
     person's name, credentials, bio, and booking link into one shared modal. */
  var modal = document.getElementById("bioModal");
  if (modal) {
    var mName = document.getElementById("bioModalName");
    var mCreds = document.getElementById("bioModalCreds");
    var mBio = document.getElementById("bioModalBio");
    var mBook = document.getElementById("bioModalBook");
    var lastTrigger = null;

    var openBio = function (card, trigger) {
      var name = card.querySelector(".member-name");
      var creds = card.querySelector(".member-creds");
      var bio = card.querySelector(".member-bio-content");
      var book = card.querySelector(".member-book");
      mName.textContent = name ? name.textContent : "";
      mCreds.textContent = creds ? creds.textContent : "";
      mBio.innerHTML = bio ? bio.innerHTML : "";
      if (book) {
        mBook.href = book.getAttribute("href");
        mBook.hidden = false;
      } else {
        mBook.hidden = true;
      }
      lastTrigger = trigger;
      modal.hidden = false;
      document.body.classList.add("modal-open");
      var closeBtn = modal.querySelector(".bio-modal-close");
      if (closeBtn) closeBtn.focus();
    };

    var closeBio = function () {
      modal.hidden = true;
      document.body.classList.remove("modal-open");
      if (lastTrigger) { lastTrigger.focus(); lastTrigger = null; }
    };

    var readBtns = document.querySelectorAll(".member-readbio");
    readBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var card = btn.closest(".member");
        if (card) openBio(card, btn);
      });
    });

    modal.addEventListener("click", function (e) {
      if (e.target.hasAttribute("data-close")) closeBio();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modal.hidden) closeBio();
    });
  }
})();
