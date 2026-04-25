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

    var optionenHTML = frage.optionen.map(function(opt, i) {
      var selected = antworten[index] === opt.key ? 'is-selected' : '';
      return '<button class="option-btn ' + selected + '" data-key="' + opt.key + '" type="button">' + opt.text + '</button>';
    }).join('');

    var weiterText = index < GESAMT - 1 ? 'Weiter' : 'Ergebnis anzeigen';
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
      zeigeAuswertung();
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

  function zeigeAuswertung() {
    progressFill.style.width = '100%';
    progressLabel.textContent = 'Frage ' + GESAMT + ' von ' + GESAMT;
    stage.innerHTML =
      '<div class="quiz-loading fade-in">' +
        '<div class="spinner"></div>' +
        '<h2 style="margin-top:1.5rem;">Wir analysieren deine Antworten…</h2>' +
        '<p>Einen Moment. Wir ermitteln dein pers\xf6nliches Athleten-Profil.</p>' +
      '</div>';

    setTimeout(function() {
      var gefiltert = antworten.filter(function(a) { return a !== null; });
      var ergebnis = window.FDA.berechneArchetyp(gefiltert);
      window.FDA.speichereErgebnis({
        archetyp: ergebnis.key,
        archetypDaten: ergebnis.archetyp,
        punkte: ergebnis.punkte,
        antworten: antworten,
        abgeschlossenAm: new Date().toISOString()
      });
      window.location.href = 'results.html?typ=' + ergebnis.key;
    }, 1800);
  }

  /* Öffentlich machen */
  window.FDA.initQuiz = initQuiz;
})();
