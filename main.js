/* Eagle Accounting Services — site script */
(function () {
  var ICON = {
    ok: '<svg class="ic" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>',
    bad: '<svg class="ic" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>'
  };

  // Mobile menu
  var btn = document.getElementById("menu-btn");
  var panel = document.getElementById("mobile-panel");
  if (btn && panel) {
    btn.addEventListener("click", function () {
      var open = panel.hidden;
      panel.hidden = !open;
      btn.innerHTML = open ? btn.dataset.close : btn.dataset.open;
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
  }

  // Footer year
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Consultation form
  var form = document.getElementById("consult-form");
  if (!form) return;

  var status = document.getElementById("form-status");
  var submit = document.getElementById("submit-btn");
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function setError(id, msg) {
    var input = document.getElementById(id);
    var field = input.closest(".field");
    var err = field.querySelector(".err");
    field.classList.toggle("invalid", !!msg);
    input.setAttribute("aria-invalid", msg ? "true" : "false");
    if (err) err.textContent = msg || "";
  }

  function validate() {
    var ok = true;
    var name = form.elements["name"].value.trim();
    var email = form.elements["email"].value.trim();
    var phone = form.elements["phone"].value.trim();
    setError("f-name", name ? "" : "Enter your name.");
    if (!name) ok = false;
    if (!email) { setError("f-email", "Enter your email so we can reply."); ok = false; }
    else if (!EMAIL_RE.test(email)) { setError("f-email", "Enter an email like you@business.com."); ok = false; }
    else setError("f-email", "");
    var digits = phone.replace(/\D/g, "");
    if (phone && (digits.length < 10 || digits.length > 11)) { setError("f-phone", "Enter a 10-digit phone number, or leave it blank."); ok = false; }
    else setError("f-phone", "");
    return ok;
  }

  function show(kind, title, body) {
    status.hidden = false;
    status.className = "notice " + kind;
    status.innerHTML = ICON[kind] + '<div><strong></strong><span></span></div>';
    status.querySelector("strong").textContent = title;
    status.querySelector("span").textContent = body;
    status.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  ["f-name", "f-email", "f-phone"].forEach(function (id) {
    document.getElementById(id).addEventListener("blur", function () {
      if (form.dataset.tried) validate();
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    form.dataset.tried = "1";
    status.hidden = true;
    if (!validate()) {
      var first = form.querySelector('[aria-invalid="true"]');
      if (first) first.focus();
      return;
    }

    var services = Array.prototype.map.call(
      form.querySelectorAll('input[name="services"]:checked'),
      function (c) { return c.value; }
    );
    var payload = {
      "Name": form.elements["name"].value.trim(),
      "Business name": form.elements["business"].value.trim(),
      "Email": form.elements["email"].value.trim(),
      "Phone": form.elements["phone"].value.trim(),
      "Location": form.elements["location"].value.trim(),
      "Business stage": form.elements["stage"].value,
      "Services of interest": services.join(", ") || "Not specified",
      "Preferred contact": (form.querySelector('input[name="contact_pref"]:checked') || {}).value || "",
      "Best times to reach": form.elements["times"].value.trim(),
      "Message": form.elements["message"].value.trim(),
      _subject: "Free consultation request: " + form.elements["name"].value.trim(),
      _replyto: form.elements["email"].value.trim(),
      _template: "table",
      _captcha: "false",
      _honey: form.elements["_honey"].value
    };

    if (!form.dataset.endpoint) {
      show("ok", "Preview only: nothing was sent.",
        "On the live site, this request is emailed to jblairbookkeeping@gmail.com.");
      return;
    }

    submit.disabled = true;
    var label = submit.querySelector("span");
    var original = label.textContent;
    label.textContent = "Sending…";

    fetch(form.dataset.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload)
    })
      .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, d: d }; }); })
      .then(function (res) {
        if (!res.ok || String(res.d.success) !== "true") throw new Error(res.d && res.d.message);
        form.reset();
        delete form.dataset.tried;
        show("ok", "Thank you. Your request is in.",
          "We'll contact you to schedule your free 30-minute consultation. If it's urgent, call (615) 722-7195.");
      })
      .catch(function () {
        show("bad", "Your request didn't go through.",
          "Please try again in a moment, or call us at (615) 722-7195 or email jblairbookkeeping@gmail.com.");
      })
      .then(function () {
        submit.disabled = false;
        label.textContent = original;
      });
  });
})();
