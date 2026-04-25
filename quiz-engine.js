/* =============================================
   QUIZ-ENGINE.JS — Athlete Audit
   7 Fragen, 4 Antworten, localStorage
   Archetypen: V, T, R, M, L
   ============================================= */
window.FDA = window.FDA || {};

window.FDA.ARCHETYPEN = {
  V: {
    id: 'vollgas-athlet',
    name: 'Der Vollgasathlet',
    tagline: 'Du trainierst wie vor dem Endspiel. Dann kommt nichts mehr. Das ist kein Charakterfehler.',
    beschreibung: 'Du hast in deiner aktiven Zeit gelernt, dass Training weh tun muss. Alles darunter fühlt sich nicht wie Training an. Das Problem: Wettkampfintensität ohne Wettkampfstruktur, ohne Recovery-Protokoll, ohne Coach, der die Trainingslast steuert, garantiert den Absturz. Immer wieder.',
    schmerzpunkte: [
      'Du gehst drei Wochen all-in, dann bricht irgendwas weg und du bist für Monate raus.',
      'Moderates Training fühlt sich wie Zeitverschwendung an, obwohl du weißt, dass es das nicht ist.',
      'Dein Körper kann die Intensität nicht mehr halten wie mit 22, aber dein Kopf hat das noch nicht akzeptiert.'
    ],
    schnellgewinn: 'Ein 4-Wochen-Block bei 60 Prozent deiner gewohnten Intensität. Langweilig. Aber es ist das Einzige, das wirklich funktioniert, um wieder eine belastbare Basis aufzubauen.',
    hookZitat: 'Du weißt, wie man hart trainiert. Das ist nicht das Problem. Das Problem ist, dass dein System aus der Athletenzeit fehlt.'
  },
  T: {
    id: 'teamkind',
    name: 'Das Teamkind',
    tagline: 'Du hattest nie ein Disziplinproblem. Du hattest immer jemanden, der die Disziplin für dich organisiert hat.',
    beschreibung: 'Jahrelang hat dir jemand gesagt, wann du trainierst, wie du trainierst und was als nächstes kommt. Der Trainingsplan war fertig. Die Mannschaft war da. Die Session war nicht optional. Jetzt bist du auf dich allein gestellt, und das System, das dich in Form gehalten hat, existiert nicht mehr.',
    schmerzpunkte: [
      'Wenn du allein trainierst, hörst du nach 3 Wochen auf, ohne genau zu wissen warum.',
      'Du weißt genau, was du tun solltest. Du tust es einfach nicht, wenn niemand es von dir erwartet.',
      'Die Mannschaft hat dich täglich auf den Platz gebracht, nicht du selbst. Das ist keine Schwäche. Das ist, wie Mannschaftssport funktioniert.'
    ],
    schnellgewinn: 'Ein nicht verhandelbarer Wochenplan mit fixen Trainingszeiten und einem externen Accountability-Mechanismus, der nicht auf deiner Motivation basiert.',
    hookZitat: 'Du brauchst keinen Motivationscoach. Du brauchst eine neue Mannschaft.'
  },
  R: {
    id: 'rost-veteran',
    name: 'Der Rost-Veteran',
    tagline: 'Dein Körper erinnert sich an jeden Zweikampf. Du trainierst jetzt darum herum.',
    beschreibung: 'Knie, Schulter, Rücken. Die Jahre auf dem Platz haben Spuren hinterlassen. Du hast versucht, wieder so zu trainieren wie früher, irgendwas hat geschmerzt, du hast aufgehört. Jetzt trainierst du vorsichtig, wenn überhaupt. Und dein Körper verändert sich weiter in die falsche Richtung.',
    schmerzpunkte: [
      'Alte Verletzungen aus deiner aktiven Zeit setzen heute Grenzen, die du früher nicht kanntest.',
      'Du hast Angst, wieder ernsthaft zu trainieren, weil du weißt, was Überlastung kostet.',
      'Du trainierst um die Verletzungen herum, statt ein Programm zu haben, das mit ihnen arbeitet.'
    ],
    schnellgewinn: 'Eine ehrliche Bestandsaufnahme deiner tatsächlichen körperlichen Einschränkungen. 80 Prozent davon sind handhabbar, nicht disqualifizierend. Der Rest braucht einen angepassten Plan, kein weniger Training.',
    hookZitat: 'Du musst nicht trainieren wie mit 22. Du musst trainieren wie jemand, der mit 22 einer der Besten war, und jetzt einen anderen Ansatz braucht.'
  },
  M: {
    id: 'metabolismus-schock',
    name: 'Der Metabolismus-Schock',
    tagline: 'Du isst noch wie ein Sportler. Du bewegst dich wie ein Büroangestellter. Dein Körper macht da keinen Unterschied mehr.',
    beschreibung: 'In deiner aktiven Zeit hat dein Körper alles verarbeitet. 15 bis 20 Stunden Training pro Woche, kombiniert mit einem Athletenstoffwechsel auf Hochlast. Heute trainierst du vielleicht 2 Stunden pro Woche. Dein Essen hat sich kaum verändert. Die Mathematik ist simpel. Dein mentales Modell hat sie noch nicht akzeptiert.',
    schmerzpunkte: [
      'Du isst eigentlich gesund, aber das Gewicht geht nicht runter. Du verstehst es nicht.',
      'Früher hat dein Körper alles verziehen. Heute scheint alles zu verfangen.',
      'Du denkst, dein Stoffwechsel hat sich mit dem Alter verlangsamt. In Wirklichkeit hat sich dein Alltag verändert.'
    ],
    schnellgewinn: 'Eine realistische Bestandsaufnahme deiner tatsächlichen täglichen Aktivität, nicht nur der Trainingszeit. Die Lücke zwischen früher und heute ist größer als du denkst, und kleiner zu überbrücken als du glaubst.',
    hookZitat: 'Dein Stoffwechsel ist nicht kaputt. Dein Athletenleben ist vorbei, und dein Körper hat das verstanden. Jetzt musst nur noch du es verstehen.'
  },
  L: {
    id: 'leistungsblockierte',
    name: 'Der Leistungsblockierte',
    tagline: 'Du tust alles richtig. Du weißt nur nicht, warum es nicht mehr funktioniert.',
    beschreibung: 'Du trainierst regelmäßig. Du isst vernünftig. Du machst keine Ausreden. Und trotzdem verändert sich kaum etwas. Dein athletischer Körper hat sich in Woche 2 an dein Training angepasst. Seitdem gibt es keinen Reiz mehr zum Wachsen. Das ist kein Alters- oder Motivationsproblem.',
    schmerzpunkte: [
      'Du trainierst seit Monaten, aber der Körper sieht aus wie vor 6 Monaten.',
      'Du machst die richtigen Übungen, aber niemand hat dir erklärt, warum sie aufgehört haben zu wirken.',
      'Ohne progressive Belastungssteigerung gibt es keine Anpassung. Dein Körper braucht einen Grund zu wachsen.'
    ],
    schnellgewinn: 'Messe jede Session. Erhöhe in mindestens einer Übung pro Training die Last oder die Wiederholungen um einen kleinen Schritt. Dein Körper reagiert schneller als ein Nicht-Athlet, weil das Fundament noch da ist.',
    hookZitat: 'Du hast das athletische Fundament. Du brauchst nur jemanden, der dir zeigt, wie man es wieder aktiviert.'
  }
};

/* =============================================
   7 FRAGEN, 4 ANTWORTEN PRO FRAGE
   ============================================= */
window.FDA.FRAGEN = [
  {
    id: 1,
    text: 'Was hat dein Training zu deiner aktiven Sportlerzeit am besten funktionieren lassen?',
    optionen: [
      { text: 'Ich habe trainiert wie vor einem Endspiel. Immer. Ohne halbe Sachen.', key: 'V' },
      { text: 'Der Plan war da, der Coach hat gesagt, was zu tun ist. Ich habe es getan.', key: 'T' },
      { text: 'Ich konnte alles essen, alles trainieren. Mein Körper hat das einfach weggesteckt.', key: 'M' },
      { text: 'Mein Körper war belastbar. Heute erinnert er mich an jeden Zweikampf von damals.', key: 'R' }
    ]
  },
  {
    id: 2,
    text: 'Was passiert, wenn du heute mit ernsthaftem Training anfängst?',
    optionen: [
      { text: 'Ich starte mit voller Intensität, halte es 2 bis 3 Wochen durch und höre dann auf.', key: 'V' },
      { text: 'Ich fange an, wenn ich einen Plan habe oder jemanden dabei. Alleine verliere ich nach kurzer Zeit den Faden.', key: 'T' },
      { text: 'Ich starte, aber Schmerzen oder körperliche Beschwerden setzen schnell Grenzen.', key: 'R' },
      { text: 'Ich trainiere regelmäßig, sehe aber kaum Fortschritt am Körper.', key: 'L' }
    ]
  },
  {
    id: 3,
    text: 'Wie hat sich deine Ernährung seit deiner aktiven Sportlerzeit verändert?',
    optionen: [
      { text: 'Kaum. Ich esse ähnlich wie früher, aber ich trainiere deutlich weniger.', key: 'M' },
      { text: 'Je nach Phase: in Trainingsphasen sehr gut, in Pausen gar nicht strukturiert.', key: 'V' },
      { text: 'Ernährung war nie mein Fokus. Der Verbrauch und der Trainer haben das früher geregelt.', key: 'T' },
      { text: 'Ich esse vernünftig, aber das Ergebnis am Körper ist trotzdem nicht da.', key: 'L' }
    ]
  },
  {
    id: 4,
    text: 'Du siehst ein altes Foto aus deiner Spielerzeit. Was geht dir als Erstes durch den Kopf?',
    optionen: [
      { text: 'Damals hatte ich eine Mannschaft und einen Trainer. Heute bin ich auf mich allein gestellt.', key: 'T' },
      { text: 'Ich war in dieser Form, weil ich täglich auf dem Platz war. So läuft das heute einfach nicht mehr.', key: 'V' },
      { text: 'Mein Körper von damals hat das problemlos vertragen. Heute ist das eine andere Geschichte.', key: 'R' },
      { text: 'Damals habe ich alles gegessen und trotzdem so ausgesehen. Das ist heute vorbei.', key: 'M' }
    ]
  },
  {
    id: 5,
    text: 'Was bremst dich heute am meisten, wenn du versuchst, wieder in Form zu kommen?',
    optionen: [
      { text: 'Ich kann kein mittleres Tempo halten. Vollgas oder nichts.', key: 'V' },
      { text: 'Ohne feste Struktur und Accountability von außen komme ich einfach nicht in die Gänge.', key: 'T' },
      { text: 'Alte Verletzungen oder körperliche Einschränkungen aus der Sportlerzeit setzen mir Grenzen.', key: 'R' },
      { text: 'Ich tue das Richtige, aber mein Körper reagiert nicht mehr so wie er sollte.', key: 'L' }
    ]
  },
  {
    id: 6,
    text: 'Wie würdest du deinen aktuellen Trainingsrhythmus ehrlich beschreiben?',
    optionen: [
      { text: 'Intensive Phasen, dann lange Pausen. Das Muster wiederholt sich immer wieder.', key: 'V' },
      { text: 'Ich trainiere nur konstant, wenn ich feste Verabredungen oder externe Verpflichtungen habe.', key: 'T' },
      { text: 'Ich trainiere vorsichtig und modifiziert, weil ich mit alten Beschwerden umgehen muss.', key: 'R' },
      { text: 'Ich trainiere regelmäßig, aber die Körperzusammensetzung verändert sich kaum.', key: 'M' }
    ]
  },
  {
    id: 7,
    text: 'Was wäre für dich der ehrlichste Satz darüber, was fehlt?',
    optionen: [
      { text: 'Ich weiß, wie man hart trainiert. Ich weiß nicht, wie man das dauerhaft macht ohne Wettkampfdruck.', key: 'V' },
      { text: 'Ich brauche jemanden, der mir einen Plan gibt und prüft, ob ich ihn wirklich einhalte.', key: 'T' },
      { text: 'Ich will wieder ernsthaft trainieren, traue meinem Körper aber nicht mehr so ganz.', key: 'R' },
      { text: 'Ich tue alles, was ich tun soll. Ich verstehe nur nicht, warum sich trotzdem so wenig verändert.', key: 'L' }
    ]
  }
];

/* ---- Scoring ---- */
window.FDA.TIEBREAK = ['V', 'T', 'L', 'M', 'R'];

window.FDA.berechneArchetyp = function(antworten) {
  var punkte = { V: 0, T: 0, R: 0, M: 0, L: 0 };
  antworten.forEach(function(key) {
    if (punkte[key] !== undefined) punkte[key]++;
  });
  var max = Math.max(punkte.V, punkte.T, punkte.R, punkte.M, punkte.L);
  var gleichstand = Object.keys(punkte).filter(function(k) { return punkte[k] === max; });
  var gewinner = gleichstand.length === 1
    ? gleichstand[0]
    : window.FDA.TIEBREAK.find(function(k) { return gleichstand.includes(k); });
  return { key: gewinner, archetyp: window.FDA.ARCHETYPEN[gewinner], punkte: punkte };
};

/* ---- localStorage (persistiert bei Tab-Wechsel) ---- */
window.FDA.speichereErgebnis = function(data) {
  try { localStorage.setItem('fda_quiz_ergebnis', JSON.stringify(data)); } catch(e) {}
};

window.FDA.ladeErgebnis = function() {
  try {
    var raw = localStorage.getItem('fda_quiz_ergebnis');
    return raw ? JSON.parse(raw) : null;
  } catch(e) { return null; }
};
