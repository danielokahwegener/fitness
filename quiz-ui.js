/* =============================================
   QUIZ-UI.JS — DOM-Rendering, Animationen, Navigation
   Läuft nach quiz-engine.js (kein ES-Modul)
   ============================================= */

(function() {
  var GESAMT = window.FDA.FRAGEN.length;
  var aktuelleIndex = 0;
  var antworten = new Array(GESAMT).fill(null);
  var istAnimiert = false;

  var stage, progressFill, progressLabel;

  /* ---- Profil-Felder (nach Frage 7) ---- */
  var PROFIL_FELDER = [
    {
      key: 'sport',
      label: 'Welchen Sport hast du gespielt?',
      optionen: [
        { text: 'Fussball',    value: 'fussball' },
        { text: 'Basketball',  value: 'basketball' },
        { text: 'Handball',    value: 'handball' },
        { text: 'Eishockey',   value: 'eishockey' },
        { text: 'Rugby',       value: 'rugby' },
        { text: 'Anderes',     value: 'anderes' }
      ]
    },
    {
      key: 'niveau',
      label: 'Auf welchem Niveau?',
      optionen: [
        { text: 'Hobby / Freizeit',          value: 'hobby' },
        { text: 'Kreisliga - Bezirksliga',    value: 'amateur' },
        { text: 'Verbandsliga und höher',     value: 'semipro' }
      ]
    },
    {
      key: 'letzte_saison',
      label: 'Letzte aktive Saison?',
      optionen: [
        { text: 'Vor 1-2 Jahren',  value: '1-2-jahre' },
        { text: 'Vor 3-5 Jahren',  value: '3-5-jahre' },
        { text: 'Vor 6-10 Jahren', value: '6-10-jahre' },
        { text: 'Vor 10+ Jahren',  value: '10-plus' }
      ]
    },
    {
      key: 'alter',
      label: 'Dein Alter?',
      optionen: [
        { text: '30-34', value: '30-34' },
        { text: '35-39', value: '35-39' },
        { text: '40-44', value: '40-44' },
        { text: '45-49', value: '45-49' },
        { text: '50+',   value: '50-plus' }
      ]
    },
    {
      key: 'gewicht_plus',
      label: 'Gewichtszunahme seit Spielerzeit?',
      optionen: [
        { text: '+5-10 kg',        value: '5-10kg' },
        { text: '+11-20 kg',       value: '11-20kg' },
        { text: '+21-30 kg',       value: '21-30kg' },
        { text: 'Mehr als +30 kg', value: '30-plus-kg' }
      ]
    }
  ];

  function initQuiz() {
    stage         = document.getElementById('quiz-stage');
    progressFill  = document.getElementById('progress-fill');
    progressLabel = document.getElementById('progress-label');
    rendereFrageKarte(0);
  }

  function rendereFrageKarte(index, richtung) {
    var frage = window.FDA.FRAGEN[index];
    var prozent = Math.round((index / GESAMT) * 100);
    progressFill.style.width = prozent + '%';
    progressLabel.textContent = 'Frage ' + (index + 1) + ' von ' + GESAMT;

    var animClass = richtung === 'back' ? 'slide-in-back' : '';

    var optionenHTML = frage.optionen.map(function(opt) {
      var selected = antworten[index] === opt.key ? 'is-selected' : '';
      return '<button class="option-btn ' + selected + '" data-key="' + opt.key + '" type="button">' + opt.text + '</button>';
    }).join('');

    var weiterText     = index < GESAMT - 1 ? 'Weiter' : 'Weiter';
    var weiterDisabled = antworten[index] === null ? 'disabled' : '';
    var zurueckDisabled = index === 0 ? 'disabled' : '';

    var card = document.createElement('div');
    card.className = 'question-card ' + animClass;
    card.innerHTML =
      '<div class="question-number">Frage ' + (index + 1) + ' von ' + GESAMT + '</div>' +
      '<p class="question-text">' + frage.text + '</p>' +
      '<div class="options-list">' + optionenHTML + '</div>' +
      '<div class="question-nav">' +
        '<button class="btn--back" id="btn-zurueck" type="button" ' + zurueckDisabled + '>← Zur\xfcck</button>' +
        '<button class="btn btn--primary" id="btn-weiter" type="button" ' + weiterDisabled + '>' + weiterText + '</button>' +
      '</div>';

    stage.innerHTML = '';
    stage.appendChild(card);

    card.querySelectorAll('.option-btn').forEach(function(btn) {
      btn.addEventListener('click', function() { waehleAntwort(btn, index); });
    });

    document.getElementById('btn-weiter').addEventListener('click', function() { naechsteFrage(index); });
    document.getElementById('btn-zurueck').addEventListener('click', function() { vorherigeFrage(index); });
  }

  function waehleAntwort(btn, index) {
    antworten[index] = btn.dataset.key;
    stage.querySelectorAll('.option-btn').forEach(function(b) { b.classList.remove('is-selected'); });
    btn.classList.add('is-selected');
    var weiterBtn = document.getElementById('btn-weiter');
    if (weiterBtn) weiterBtn.disabled = false;
  }

  function naechsteFrage(index) {
    if (antworten[index] === null || istAnimiert) return;
    if (index < GESAMT - 1) {
      animiereWechsel(function() {
        aktuelleIndex = index + 1;
        rendereFrageKarte(aktuelleIndex, 'forward');
      });
    } else {
      animiereWechsel(function() { zeigeProfil(); });
    }
  }

  function vorherigeFrage(index) {
    if (index === 0 || istAnimiert) return;
    animiereWechsel(function() {
      aktuelleIndex = index - 1;
      rendereFrageKarte(aktuelleIndex, 'back');
    });
  }

  function animiereWechsel(callback) {
    istAnimiert = true;
    var card = stage.querySelector('.question-card');
    if (card) {
      card.classList.add('slide-out');
      setTimeout(function() { istAnimiert = false; callback(); }, 240);
    } else {
      istAnimiert = false;
      callback();
    }
  }

  /* ---- Profil-Schritt (nach Frage 7) ---- */
  function zeigeProfil() {
    var profilAuswahl = { sport: null, niveau: null, letzte_saison: null, alter: null, gewicht_plus: null };

    progressFill.style.width = '95%';
    progressLabel.textContent = 'Fast geschafft';

    var felderHTML = PROFIL_FELDER.map(function(feld) {
      var optionenHTML = feld.optionen.map(function(opt) {
        return '<button class="profil-btn" data-field="' + feld.key + '" data-value="' + opt.value + '" type="button">' + opt.text + '</button>';
      }).join('');
      return '<div class="profil-feld">' +
        '<p class="profil-feld-label">' + feld.label + '</p>' +
        '<div class="profil-optionen">' + optionenHTML + '</div>' +
      '</div>';
    }).join('');

    var card = document.createElement('div');
    card.className = 'question-card';
    card.innerHTML =
      '<div class="question-number">Fast geschafft</div>' +
      '<p class="question-text">Noch 5 kurze Angaben zu deinem Profil.</p>' +
      '<div class="profil-felder">' + felderHTML + '</div>' +
      '<div class="question-nav">' +
        '<button class="btn--back" id="btn-profil-zurueck" type="button">← Zur\xfcck</button>' +
        '<button class="btn btn--primary" id="btn-profil-weiter" type="button" disabled>Ergebnis anzeigen</button>' +
      '</div>';

    stage.innerHTML = '';
    stage.appendChild(card);

    card.querySelectorAll('.profil-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var field = btn.dataset.field;

        card.querySelectorAll('.profil-btn[data-field="' + field + '"]').forEach(function(b) {
          b.classList.remove('is-selected');
        });
        btn.classList.add('is-selected');

        if (field === 'sport' && btn.dataset.value === 'anderes') {
          profilAuswahl.sport = null;
          var existing = card.querySelector('.profil-text-input');
          if (!existing) {
            var sportOptionen = card.querySelector('.profil-btn[data-field="sport"]').closest('.profil-optionen');
            var input = document.createElement('input');
            input.type = 'text';
            input.className = 'profil-text-input';
            input.placeholder = 'Dein Sport...';
            sportOptionen.insertAdjacentElement('afterend', input);
            input.focus();
            input.addEventListener('input', function() {
              profilAuswahl.sport = input.value.trim() || null;
              var alleGesetzt = PROFIL_FELDER.every(function(f) { return profilAuswahl[f.key] !== null; });
              document.getElementById('btn-profil-weiter').disabled = !alleGesetzt;
            });
          }
        } else {
          var inputEl = card.querySelector('.profil-text-input');
          if (field === 'sport' && inputEl) { inputEl.remove(); }
          profilAuswahl[field] = btn.dataset.value;
        }

        var alleGesetzt = PROFIL_FELDER.every(function(f) { return profilAuswahl[f.key] !== null; });
        document.getElementById('btn-profil-weiter').disabled = !alleGesetzt;
      });
    });

    document.getElementById('btn-profil-weiter').addEventListener('click', function() {
      window.FDA.profil = profilAuswahl;
      zeigeAuswertung();
    });

    document.getElementById('btn-profil-zurueck').addEventListener('click', function() {
      animiereWechsel(function() {
        aktuelleIndex = GESAMT - 1;
        rendereFrageKarte(aktuelleIndex, 'back');
      });
    });
  }

  function zeigeAuswertung() {
    progressFill.style.width = '100%';
    progressLabel.textContent = 'Frage ' + GESAMT + ' von ' + GESAMT;
    stage.innerHTML =
      '<div class="quiz-loading fade-in">' +
        '<div class="spinner"></div>' +
        '<h2 style="margin-top:1.5rem;">Wir analysieren deine Antworten…</h2>' +
        '<p>Einen Moment. Wir ermitteln dein pers\xf6nliches Sportler-Profil.</p>' +
      '</div>';

    setTimeout(function() {
      var gefiltert = antworten.filter(function(a) { return a !== null; });
      var ergebnis = window.FDA.berechneArchetyp(gefiltert);
      window.FDA.speichereErgebnis({
        archetyp: ergebnis.key,
        archetypDaten: ergebnis.archetyp,
        punkte: ergebnis.punkte,
        antworten: antworten,
        profil: window.FDA.profil || null,
        abgeschlossenAm: new Date().toISOString()
      });
      window.location.href = 'results.html?typ=' + ergebnis.key;
    }, 1800);
  }

  /* Öffentlich machen */
  window.FDA.initQuiz = initQuiz;
})();
