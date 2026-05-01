/* =============================================
   EMAIL-CAPTURE.JS — MailerLite-Integration
   Nach Erfolg: Ergebnis einblenden (kein Redirect)
   ============================================= */

window.FDA = window.FDA || {};

/*
  KONFIGURATION — MailerLite-Zugangsdaten eintragen:

  apiKey:
    MailerLite → Integrations → API → API Tokens → Create new token
    Den erzeugten Token hier eintragen.

  groupIds:
    MailerLite → Subscribers → Groups → eine Gruppe pro Archetyp anlegen
    (z.B. "Vollgasathlet", "Teamkind" usw.)
    Jede Gruppe anklicken → die Zahl am Ende der URL ist die Group-ID.
    Diese Gruppen werden als Trigger für die jeweilige Automatisierung genutzt.
*/
window.FDA.ML_CONFIG = {
  apiKey: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiZWUyOWYyZDM3OTdjMGU4OWJlZDRkNmYxYjljOTJlN2FjODY1MjdmOWRlZTY4YzI1MDMyNDRkOGY1MTRlYzczODQ5MWNhZjg1OTNjMWJiNmIiLCJpYXQiOjE3Nzc2NDgyODUuODQ4NzY5LCJuYmYiOjE3Nzc2NDgyODUuODQ4Nzc0LCJleHAiOjQ5MzMzMjE4ODUuODM0Mjc2LCJzdWIiOiIyMzI3NzU4Iiwic2NvcGVzIjpbXX0.fj1Tk9I81HPcT2PQP2pjSiiy2BMmpX-hunHVw2guNpDibthoQw9DPQNovfGB_mpc6GPqXsYSOUcmeOvOSOjXcL6YcXJfKER1ykRsqN6VMPCuyF_OHewjP0sBm3XRFkUyNhB-KY1Vuru8L_9w06kit13GCQTl0jhUP270WJOKTiXQz51vjEFXxAJnZSih8XAPAXZrDwYBB7vuOvNmRYf5bfkXBxkRKxgtq9C4-gH0D1wJq82i3t6tMpjQc3OtonZraR3q-SqHCIjLwMt00SKlzXHuB9bunm7mWsVkyswtkjOo9klscobpliE1VQMELKNXTHpLMfWmtFdcxyD6vB1yHO2EGvsyAPFJM-Vu6kELiSzXWRYuhqXFlJFxBlHqUQYZHhkp1kKeGqk0thmJX5Bhi9HfggkeO1jsCjXcOiGTcxVBmTF89w6wSs7CATnDT4cbAyM1C8O2ImaDi7ArWXUSc6rF9chVIXwS-alvAmf0sqhCOBRcThzN7EJ6o0rLJwywFa8wQIaQNfIKljMzTaHuppBhNmF-G5aYcZbEPGJdYDyGhLAQeEgSdE_U5cktclbpuh_HPyFqop12r8ffUQEhvWGhHjleYrVHllwZzqNepVneAPJNSOMoLX5shdHUShuk-gQH_OvjCEGC0mI-ziVkpTvAw8Iv3ez4cnvud355kp0',
  groupIds: {
    V: '186277911229105388',
    T: '186277929446016594',
    R: '186277945189336521',
    M: '186277961974940789',
    L: '186277978308609039'
  }
};

window.FDA.sendeAnMailerLite = function(vorname, email, archetypKey) {
  var cfg     = window.FDA.ML_CONFIG;
  var groupId = cfg.groupIds[archetypKey];
  var payload = {
    email:  email,
    fields: { name: vorname },
    groups: groupId ? [groupId] : [],
    status: 'active'
  };
  return fetch('https://connect.mailerlite.com/api/subscribers', {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'Accept':        'application/json',
      'Authorization': 'Bearer ' + cfg.apiKey
    },
    body: JSON.stringify(payload)
  }).then(function(res) {
    /* 200 = updated, 201 = created — beides ist Erfolg */
    if (res.status !== 200 && res.status !== 201) throw new Error('HTTP ' + res.status);
    return res.json();
  });
};

window.FDA.initEmailCapture = function(archetypKey) {
  var form      = document.getElementById('email-form');
  var statusEl  = document.getElementById('form-status');
  var submitBtn = document.getElementById('btn-submit');
  var gateWrap  = document.getElementById('email-gate-wrap');
  var reveal    = document.getElementById('ergebnis-reveal');

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

    submitBtn.disabled    = true;
    submitBtn.textContent = 'Wird gesendet…';
    statusEl.textContent  = '';

    window.FDA.sendeAnMailerLite(vorname, email, archetypKey)
      .then(function() {
        /* Gate ausblenden, Ergebnis einblenden */
        if (gateWrap) gateWrap.style.display = 'none';
        if (reveal) {
          reveal.classList.remove('hidden');
          reveal.classList.add('fade-in');
          setTimeout(function() {
            reveal.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      })
      .catch(function(err) {
        console.error('MailerLite-Fehler:', err);
        statusEl.textContent  = 'Etwas ist schiefgelaufen. Bitte versuche es noch einmal.';
        statusEl.style.color  = 'var(--error)';
        statusEl.style.fontSize  = '0.8rem';
        statusEl.style.marginTop = '0.5rem';
        submitBtn.disabled    = false;
        submitBtn.textContent = 'Mein Ergebnis anzeigen';
      });
  });
};
