/* Site script: mobile nav, smooth scroll, enquiry form, click tracking.
   No dependencies. Loaded with defer. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  function setNav(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('is-open', open);
  }
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setNav(toggle.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) { setNav(false); toggle.focus(); }
    });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setNav(false); });
  }

  /* ---------- Smooth scroll for same-page links ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href').slice(1);
    var target = id && document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    var focusable = target.querySelector('input, select, textarea') || target;
    if (focusable === target && !target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    window.setTimeout(function () { focusable.focus({ preventScroll: true }); }, reduceMotion ? 0 : 450);
    if (history.replaceState) history.replaceState(null, '', '#' + id);
  });

  /* ---------- Click-to-call / WhatsApp tracking ----------
     Every call / WhatsApp / enquiry link carries data-track="call|whatsapp|enquire"
     and data-track-location="header|hero|mobile-bar|...". Events are sent to GA4
     (gtag) and/or Google Tag Manager (dataLayer) only if those are enabled. */
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-track]');
    if (!el) return;
    var payload = {
      event: 'lead_click',
      lead_type: el.getAttribute('data-track'),
      lead_location: el.getAttribute('data-track-location') || '',
      page_path: location.pathname
    };
    if (window.dataLayer && typeof window.dataLayer.push === 'function') window.dataLayer.push(payload);
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'lead_click', {
        lead_type: payload.lead_type,
        lead_location: payload.lead_location,
        page_path: payload.page_path
      });
    }
  });

  /* ---------- Enquiry form ---------- */
  var PHONE_RE = /^[6-9]\d{9}$/;
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function cleanPhone(v) {
    v = (v || '').replace(/[\s\-()]/g, '');
    if (v.indexOf('+91') === 0) v = v.slice(3);
    else if (v.length === 12 && v.indexOf('91') === 0) v = v.slice(2);
    else if (v.length === 11 && v.charAt(0) === '0') v = v.slice(1);
    return v;
  }

  function setError(field, msg) {
    var wrap = field.closest('.field');
    if (!wrap) return;
    var err = wrap.querySelector('.err');
    wrap.classList.toggle('is-invalid', !!msg);
    field.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (err) err.textContent = msg || '';
  }

  function validate(form) {
    var firstBad = null;
    function check(name, test, msg) {
      var f = form.elements[name];
      if (!f) return;
      var ok = test(f.value.trim(), f);
      setError(f, ok ? '' : msg);
      if (!ok && !firstBad) firstBad = f;
    }
    check('name', function (v) { return v.length >= 2; }, 'Please enter your name.');
    check('phone', function (v, f) {
      var p = cleanPhone(v);
      if (PHONE_RE.test(p)) { f.value = p; return true; }
      return false;
    }, 'Enter a 10-digit Indian mobile number (starts with 6, 7, 8 or 9).');
    check('email', function (v) { return v === '' || EMAIL_RE.test(v); }, 'Please check your email address.');
    check('adults', function (v) { return v === '' || (+v >= 1 && +v <= 60); }, 'Enter number of adults (1–60).');
    check('children', function (v) { return v === '' || (+v >= 0 && +v <= 30); }, 'Enter number of children (0–30).');
    check('travel_date', function (v) {
      if (!v) return true;
      var d = new Date(v + 'T00:00:00');
      var today = new Date(); today.setHours(0, 0, 0, 0);
      return !isNaN(d) && d >= today;
    }, 'Please choose a date in the future.');
    return firstBad;
  }

  var forms = document.querySelectorAll('form.js-enquiry');
  Array.prototype.forEach.call(forms, function (form) {
    var status = form.querySelector('.form__status');
    var btn = form.querySelector('button[type="submit"]');

    // Today as minimum travel date
    var dateField = form.elements.travel_date;
    if (dateField) {
      var t = new Date();
      dateField.min = t.getFullYear() + '-' + String(t.getMonth() + 1).padStart(2, '0') + '-' + String(t.getDate()).padStart(2, '0');
    }

    form.addEventListener('input', function (e) {
      if (e.target.closest('.field.is-invalid')) setError(e.target, '');
    });

    form.addEventListener('submit', function (e) {
      // Honeypot: real visitors never fill this hidden field
      var hp = form.elements._gotcha;
      if (hp && hp.value) { e.preventDefault(); window.location.href = '/thank-you.html'; return; }

      var bad = validate(form);
      if (bad) { e.preventDefault(); bad.focus(); return; }

      var action = form.getAttribute('action') || '';
      if (action.indexOf('{{') !== -1) {
        // Form endpoint not configured yet – stop and tell the site owner.
        e.preventDefault();
        if (status) status.textContent = 'Form endpoint not set up yet. Please call or WhatsApp us.';
        return;
      }
      if (!window.fetch || !window.FormData) return; // normal POST + server redirect

      e.preventDefault();
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
      if (status) status.textContent = '';
      fetch(action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (res) {
          if (!res.ok) throw new Error('HTTP ' + res.status);
          if (window.dataLayer) window.dataLayer.push({ event: 'generate_lead', form_id: form.id || 'enquiry' });
          if (typeof window.gtag === 'function') window.gtag('event', 'generate_lead', { form_id: form.id || 'enquiry' });
          window.location.href = '/thank-you.html';
        })
        .catch(function () {
          if (btn) { btn.disabled = false; btn.textContent = 'Send enquiry'; }
          if (status) status.textContent = 'Sorry, that did not go through. Please try again or call / WhatsApp us directly.';
        });
    });
  });
})();
