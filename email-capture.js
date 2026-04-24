/* =============================================
   EMAIL-CAPTURE.JS — ConvertKit-Integration
   Nach Erfolg: Ergebnis einblenden (kein Redirect)
   ============================================= */

window.FDA = window.FDA || {};

/* KONFIGURATION: Ersetze diese Werte mit deinen echten ConvertKit-Daten */
window.FDA.CK_CONFIG = {
  endpunkt: 'https://api.convertkit.com/v3/forms/FORM_ID/subscribe',
  apiKey: 'DEIN_API_KEY',
  tagIds: {
    S: 'TAG_ID_STRESSGAINER',
    R: 'TAG_ID_REAKTIVER_ESSER',
    T: 'TAG_ID_UNBESTAENDIGER_TRAINER',
    P: 'TAG_ID_SCHLAFSLOSER_VATER',
    W: 'TAG_ID_SITZENDER_ARBEITER'
  }
};

window.FDA.sendeAnConvertKit = function(vorname, email, archetypKey) {
  var cfg = window.FDA.CK_CONFIG;
  var tagId = cfg.tagIds[archetypKey];
  var payload = {
    api_key: cfg.apiKey,
    first_name: vorname,
    email: email,
    tags: tagId ? [tagId] : []
  };
  return fetch(cfg.endpunkt, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload)
  }).then(function(res) {
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return res.json();
  });
};

window.FDA.initEmailCapture = function(archetypKey) {
  var form       = document.getElementById('email-form');
  var statusEl   = document.getElementById('form-status');
  var submitBtn  = document.getElementById('btn-submit');
  var gateWrap   = document.getElementById('email-gate-wrap');
  var reveal     = document.getElementById('ergebnis-reveal');

  if (!form) return;

  /* Live E-Mail-Validierung */
  var emailInput = document.getElementById('email');
  emailInput.addEventListener('blur', function() {
    var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
    if (emailInput.value.length > 0 && !valid) {
      emailInput.classList.add('is-error');
    } else {
      emailInput.classList.remove('is-error');
    }
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var vorname = document.getElementById('vorname').value.trim();
    var email   = emailInput.value.trim();
    if (!vorname || !email) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Wird gesendet…';
    statusEl.textContent = '';

    window.FDA.sendeAnConvertKit(vorname, email, archetypKey)
      .then(function() {
        /* Gate ausblenden, Ergebnis einblenden */
        if (gateWrap) gateWrap.style.display = 'none';
        if (reveal) {
          reveal.classList.remove('hidden');
          reveal.classList.add('fade-in');
          /* Sanft zum Ergebnis scrollen */
          setTimeout(function() {
            reveal.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      })
      .catch(function(err) {
        console.error('ConvertKit-Fehler:', err);
        statusEl.textContent = 'Etwas ist schiefgelaufen. Bitte versuche es noch einmal.';
        statusEl.style.color = 'var(--error)';
        statusEl.style.fontSize = '0.8rem';
        statusEl.style.marginTop = '0.5rem';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Mein Ergebnis anzeigen';
      });
  });
};
