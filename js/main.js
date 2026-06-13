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

  /* ---- Collapsible team bios (team page only) ---- */
  /* Bios are hidden until the visitor clicks a team member's name, so the
     page reads light. Progressive enhancement: with no JS, bios stay visible. */
  if (document.body.classList.contains("page-team")) {
    var cards = document.querySelectorAll(".team-card");
    cards.forEach(function (card, i) {
      var heading = card.querySelector("h3");
      var paras = card.querySelectorAll("p");
      if (!heading || !paras.length) return;

      // Wrap the bio paragraph(s) in one collapsible container
      var bio = document.createElement("div");
      bio.className = "team-bio";
      bio.id = "team-bio-" + i;
      paras[0].parentNode.insertBefore(bio, paras[0]);
      paras.forEach(function (p) { bio.appendChild(p); });

      // Turn the name into the toggle
      var name = heading.textContent;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "bio-toggle";
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-controls", bio.id);
      btn.innerHTML = '<span class="bio-toggle-name"></span><span class="bio-caret" aria-hidden="true"></span>';
      btn.querySelector(".bio-toggle-name").textContent = name;
      heading.textContent = "";
      heading.appendChild(btn);

      btn.addEventListener("click", function () {
        var open = bio.classList.toggle("open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
    });
  }
})();
