/* Contact form
   Client-side validation + thank-you state. Checkbox is never pre-checked.
   Mobile phone and SMS consent are optional (consent is not a condition of any service). */

(function () {
  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  ready(function () {
    var form = document.querySelector(".offer-form");
    if (!form) return;

    var errorEl = form.querySelector(".form-error");
    var card = form.closest(".form-card");
    var thanks = card ? card.querySelector(".thank-you") : null;
    var boxes = form.querySelectorAll(".consent input[type=checkbox]");
    var consent = { get checked() { return Array.prototype.some.call(boxes, function (b) { return b.checked; }); } };

    Array.prototype.forEach.call(boxes,function(b){b.checked=false;b.removeAttribute("checked");});

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (errorEl) {
        errorEl.textContent = "";
        errorEl.classList.remove("show");
      }

      var name = form.querySelector("[name='full_name']");
      var email = form.querySelector("[name='email']");
      var phone = form.querySelector("[name='mobile_phone']");

      if (!name.value.trim() || !email.value.trim()) {
        showError("Please complete your name and email.");
        return;
      }

      if (!email.validity.valid) {
        showError("Please enter a valid email address.");
        return;
      }

      var digits = phone ? phone.value.replace(/\D/g, "") : "";
      if (consent && consent.checked && digits.length < 10) {
        showError("Enter a mobile phone number to receive texts, or uncheck the SMS box.");
        return;
      }
      if (digits.length && digits.length < 10) {
        showError("Please enter a valid mobile phone number, or leave it blank.");
        return;
      }

      form.classList.add("is-sent");
      if (thanks) thanks.classList.add("show");
      if (card) card.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });

    function showError(msg) {
      if (!errorEl) return;
      errorEl.textContent = msg;
      errorEl.classList.add("show");
    }
  });
})();
