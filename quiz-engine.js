/* =============================================
   QUIZ-ENGINE.JS — Globaler Namespace window.FDA
   ============================================= */
window.FDA = window.FDA || {};

window.FDA.ARCHETYPEN = {
  S: {
    id: 'stressgainer',
    name: 'Der Stressgainer',
    tagline: 'Dein Job frisst dich auf. Und das Fett ist der Beweis.',
    beschreibung: 'Du arbeitest hart, du trägst Verantwortung, und irgendwo zwischen Termindruck und langen Abenden hat dein Körper angefangen, das zu speichern. Nicht weil du schlecht isst. Sondern weil dein Nervensystem im Dauerstress ist.',
    schmerzpunkte: [
      'Du weißt, dass du dich um dich kümmern solltest. Aber du hast einfach gerade nicht den Kopf dafür.',
      'Das Bauchfett sitzt genau da, wo es der Stress hintreibt, und keine Diät der Welt scheint daran etwas zu ändern.',
      'Du schaltest nie wirklich ab, nicht einmal nach Feierabend, und dein Körper zahlt den Preis.'
    ],
    schnellgewinn: 'Ein tägliches Cortisol-Reset-Protokoll: ein festes 20-Minuten-Fenster zur Entspannung, das kein Telefon und keine Arbeit beinhaltet.',
    hookZitat: 'Dein Körper reagiert chemisch auf dein Leben. Wir regulieren das Signal zuerst. Das Fett folgt.'
  },
  R: {
    id: 'reaktiver-esser',
    name: 'Der reaktive Esser',
    tagline: 'Du triffst nie eine bewusst schlechte Entscheidung. Du triffst einfach gar keine.',
    beschreibung: 'Im Beruf bist du organisiert und zuverlässig. Aber bei der Ernährung läuft alles auf Autopilot. Du isst, was gerade da ist, was die Familie isst, was die Kantine anbietet. Das Problem ist nicht die Qualität deiner Entscheidungen. Es ist das Fehlen jeder Entscheidung.',
    schmerzpunkte: [
      'Du isst eigentlich ganz vernünftig, aber die Waage bewegt sich trotzdem nicht. Das macht dich wahnsinnig.',
      'Die Kinderreste vom Teller, die Bürosnacks, das abendliche Greifen nach irgendwas: das alles zählt, auch wenn es sich nicht wie essen anfühlt.',
      'Du hast kein System. Deine Umgebung trifft alle Ernährungsentscheidungen für dich.'
    ],
    schnellgewinn: 'Die Dad-Teller-Methode: ein visuelles Portionssystem für jede Familienmahlzeit, ohne Kalorienzählen oder separates Kochen.',
    hookZitat: 'Du hast kein Willensproblem. Du hast ein Strukturproblem. Wir bauen die Struktur. Die Ergebnisse kommen von selbst.'
  },
  T: {
    id: 'unbestaendiger-trainer',
    name: 'Der unbeständige Trainer',
    tagline: 'Er geht ins Studio. Er geht nur ins falsche, in seinem Kopf.',
    beschreibung: 'Du siehst dich selbst als jemanden, der trainiert. Das ist Teil deines Selbstbildes. Aber dein tatsächliches Training sieht so aus: drei gute Wochen, dann zwei Wochen nichts, dann ein neuer Montag. Die Sessions sind unstrukturiert, zu bequem, nie progressiv. Du hast seit zwei Jahren dieselbe Form, obwohl du das Gefühl hast, regelmäßig zu gehen.',
    schmerzpunkte: [
      'Du gehst zum Training, aber jede Session ist improvisiert. Kein Plan, keine Progression, keine Ergebnisse.',
      'Wenn du eine Einheit verpasst, wird daraus schnell eine Woche, und aus einer Woche ein Monat.',
      'Du weißt, dass du mehr Konstanz brauchst, aber du weißt nicht, wie du sie aufbauen sollst.'
    ],
    schnellgewinn: 'Der 28-Tage Fit-Dad-Trainingsplan: 3x pro Woche, klare Einheiten, progressive Gewichte, mit eingebautem Plan für verpasste Sessions.',
    hookZitat: 'Du brauchst nicht mehr Motivation zum Trainieren. Du brauchst einen Plan, der dir genau sagt, was zu tun ist, und jemanden, der sicherstellt, dass du es wirklich tust.'
  },
  P: {
    id: 'schlafsloser-vater',
    name: 'Der schlaflose Vater',
    tagline: 'Er ist nicht faul. Er läuft auf Reserve, und sein Körper kämpft zurück.',
    beschreibung: 'Kleine Kinder im Haus, vielleicht noch ein Baby oder Kleinkind. Du hast seit einem, zwei, vielleicht drei Jahren nicht richtig geschlafen. Du hast dich so vollständig angepasst, dass du gar nicht mehr merkst, wie erschöpft du wirklich bist. Aber dein Körper weiß es.',
    schmerzpunkte: [
      'Du weißt, dass du mehr schlafen solltest. Aber mit den Kindern ist das gerade einfach nicht möglich.',
      'Dein Hunger ist außer Kontrolle, deine Energie bricht am Abend weg, und du gibst dir die Schuld dafür.',
      'Du willst anfangen, aber du hast buchstäblich nicht die Energie, auch noch an dich zu denken.'
    ],
    schnellgewinn: 'Das natürliche Energie-Reset-Protokoll: 5 Schlafqualitäts-Maßnahmen, die auch bei 5 Stunden wirken.',
    hookZitat: 'Du kannst nicht warten, bis die Kinder durchschlafen. Hier ist, wie du trotz des Schlafs, den du gerade bekommst, echte Ergebnisse erzielst.'
  },
  W: {
    id: 'sitzender-arbeiter',
    name: 'Der sitzende Arbeiter',
    tagline: 'Er trainiert. Sein Körper bewegt sich nicht. Das ist nicht dasselbe.',
    beschreibung: 'Büro oder Homeoffice. Du sitzt 9 bis 10 Stunden täglich. Du gehst zweimal die Woche ins Studio und hältst dich für aktiv. Aber an einem normalen Arbeitstag machst du unter 3.000 Schritte. Die Antwort auf deine fehlenden Ergebnisse liegt in den anderen 22 Stunden deines Tages.',
    schmerzpunkte: [
      'Du trainierst, du isst einigermaßen gesund, und das Gewicht steigt trotzdem. Du weißt nicht warum.',
      'Du schreibst es dem Alter zu. In Wirklichkeit ist es radikale Inaktivität außerhalb des Studios.',
      'Zwei Stunden Training können nicht 60 Stunden Sitzen kompensieren. Dein Stoffwechsel ist nicht kaputt. Dein Tag ist es.'
    ],
    schnellgewinn: 'Die 8.000-Schritte-Challenge: ein tägliches Bewegungsziel mit Wegen, die du bereits gehst (Schulweg, Mittagspause, Abend).',
    hookZitat: 'Dein Stoffwechsel ist nicht kaputt. Dein Tag ist es. Und das braucht null extra Zeit im Studio zum Beheben.'
  }
};

window.FDA.FRAGEN = [
  {
    id: 1,
    text: 'Wenn du ehrlich bist: Wie würdest du deine Beziehung zum Thema Fitness in den letzten zwei Jahren beschreiben?',
    optionen: [
      { text: 'Ich starte immer wieder neu. Drei gute Wochen, dann nichts. Dann wieder von vorne.', key: 'T' },
      { text: 'Ich esse kaum schlecht, bewege mich aber kaum außerhalb meiner zwei Studiobesuche.', key: 'W' },
      { text: 'Ich esse, was gerade da ist. Irgendwann weiß ich gar nicht mehr, was ich heute gegessen habe.', key: 'R' },
      { text: 'Ich bin zu erschöpft, um ernsthaft anzufangen. Der Alltag lässt es einfach nicht zu.', key: 'P' },
      { text: 'Der Job und der Stress fressen mich auf. Ich weiß, dass das meinen Körper beeinflusst, aber ich weiß nicht wie.', key: 'S' }
    ]
  },
  {
    id: 2,
    text: 'Es ist 22 Uhr. Die Kinder schlafen. Was passiert in den meisten Fällen?',
    optionen: [
      { text: 'Ich greife nach irgendwas in der Küche. Nicht weil ich hungrig bin, sondern weil ich abschalten will.', key: 'S' },
      { text: 'Ich esse die Reste vom Abendbrot oder irgendwas, das noch da ist. Ich zähle das nicht als Mahlzeit.', key: 'R' },
      { text: 'Ich sitze auf dem Sofa, bin müde, aber zu aufgedreht zum Schlafen.', key: 'P' },
      { text: 'Ich hätte eigentlich trainieren wollen, aber ich bin zu kaputt. Ich verschiebe es auf morgen.', key: 'T' },
      { text: 'Ich arbeite noch, beantworte E-Mails, denke an morgen. Ich schalte eigentlich nie ab.', key: 'W' }
    ]
  },
  {
    id: 3,
    text: 'Was passiert typischerweise, wenn du zum Training gehen könntest?',
    optionen: [
      { text: 'Ich gehe, aber ich habe keinen echten Plan. Ich improvisiere irgendwie durch die Session.', key: 'T' },
      { text: 'Ich gehe zweimal die Woche. Aber die anderen 22 Stunden des Tages sitze ich fast nur.', key: 'W' },
      { text: 'Der Stress des Tages sitzt noch in mir. Ich kann mich nicht richtig konzentrieren.', key: 'S' },
      { text: 'Ich bin zu müde. Ich meine es ernst, aber der Körper macht nicht mit.', key: 'P' },
      { text: 'Ich esse vorher irgendwas Schnelles, was gerade da ist, und das zieht mich dann runter.', key: 'R' }
    ]
  },
  {
    id: 4,
    text: 'Wie viele Schritte machst du an einem normalen Arbeitstag ungefähr?',
    optionen: [
      { text: 'Kaum. Auto, Schreibtisch, Auto, Sofa. Vielleicht 2.000 bis 3.000 Schritte insgesamt.', key: 'W' },
      { text: 'Schwer zu sagen. Ich denke an Bewegung erst, wenn ich im Studio bin.', key: 'T' },
      { text: 'Ich weiß es nicht. Ich laufe durch die Küche, zur Kaffeemaschine, zum Meeting. Zählt das?', key: 'R' },
      { text: 'Zu wenig. Ich bin zu erschöpft, um noch extra zu laufen.', key: 'P' },
      { text: 'Ich sitze von morgens bis abends. Keine Zeit, irgendwo hinzugehen, außer zu Meetings.', key: 'S' }
    ]
  },
  {
    id: 5,
    text: 'Wie sieht deine Ernährung an einem normalen Arbeitstag aus?',
    optionen: [
      { text: 'Frühstück fällt meistens aus. Mittagessen ist, was gerade geht. Abends esse ich, was die Familie isst.', key: 'R' },
      { text: 'Ich trinke morgens zwei, drei Kaffees und merke erst um 13 Uhr, dass ich noch nichts gegessen habe.', key: 'S' },
      { text: 'Ich esse eigentlich gesund. Aber ich nehme trotzdem zu. Ich verstehe das nicht.', key: 'W' },
      { text: 'Ich esse, was die Familie isst, und abends greife ich noch mal. Ich registriere das kaum.', key: 'R' },
      { text: 'Ich brauche Koffein, um durch den Tag zu kommen. Ohne läuft nichts.', key: 'P' }
    ]
  },
  {
    id: 6,
    text: 'Das letzte Mal, als du einen konkreten Trainingsplan hattest: Was ist passiert?',
    optionen: [
      { text: 'Ich habe ihn zwei bis drei Wochen durchgehalten, dann kam etwas dazwischen, und ich kam nie zurück.', key: 'T' },
      { text: 'Ich hatte keinen echten Plan. Ich bin ins Studio gegangen und habe gemacht, was ich kannte.', key: 'T' },
      { text: 'Ich habe gemerkt, dass ich kaum Schritte mache, wenn ich nicht im Studio bin.', key: 'W' },
      { text: 'Ich konnte nie regelmäßig erscheinen, weil der Job oder die Familie immer etwas anderes brauchte.', key: 'S' },
      { text: 'Ich war zu müde, um konsequent zu bleiben. Ich wollte, aber der Körper hat nicht mitgemacht.', key: 'P' }
    ]
  },
  {
    id: 7,
    text: 'Wenn du an deinen Bauch denkst: Was schießt dir als Erstes durch den Kopf?',
    optionen: [
      { text: 'Das ist Stressfett. Ich spüre, dass es mit meinem Job zusammenhängt, aber ich weiß nicht, wie ich das ändere.', key: 'S' },
      { text: 'Das kommt davon, dass ich nie wirklich durchhalte. Ich fange an, breche ab, starte neu.', key: 'T' },
      { text: 'Ich esse eigentlich okay. Ich verstehe nicht, warum sich da trotzdem etwas ansammelt.', key: 'W' },
      { text: 'Das ist das Ergebnis von zu vielen Mahlzeiten, die ich gar nicht bewusst getroffen habe.', key: 'R' },
      { text: 'Das kommt vom schlechten Schlaf. Ich weiß das. Aber ich kann gerade nichts daran ändern.', key: 'P' }
    ]
  },
  {
    id: 8,
    text: 'Was hat in der Vergangenheit dazu geführt, dass du mit einer Routine aufgehört hast?',
    optionen: [
      { text: 'Eine stressige Arbeitswoche. Danach war das Momentum weg und ich habe nie wieder angefangen.', key: 'S' },
      { text: 'Ich habe eine Einheit verpasst, mir gesagt "diese Woche ist eh gelaufen", und dann war es vorbei.', key: 'T' },
      { text: 'Die Routine passte nicht zu unserem Familienessen und unserem Alltag.', key: 'R' },
      { text: 'Ich war so erschöpft, dass selbst der Gedanke an Sport mich überfordert hat.', key: 'P' },
      { text: 'Ich war im Studio aktiv, aber der Rest des Tages war komplett bewegungslos. Ergebnisse blieben aus.', key: 'W' }
    ]
  },
  {
    id: 9,
    text: 'Deine Frau fragt dich, wie es mit dem Fitness-Thema läuft. Was sagst du?',
    optionen: [
      { text: 'Ich bin momentan zu gestresst, um mir das auch noch aufzuhalsen. Wenn das Projekt durch ist, starte ich.', key: 'S' },
      { text: 'Ich sage, ich gehe regelmäßig. Was ich nicht sage: jede Session ist improvisiert und ohne Plan.', key: 'T' },
      { text: 'Ich esse doch eigentlich ganz gesund. Ich verstehe selbst nicht, warum es nicht klappt.', key: 'W' },
      { text: 'Ich wechsle das Thema. Ich will nicht zugeben, wie weit ich es habe kommen lassen.', key: 'R' },
      { text: 'Ich sage, ich bin zu müde. Sie weiß das. Wir beide wissen, dass das seit Jahren so ist.', key: 'P' }
    ]
  },
  {
    id: 10,
    text: 'Wenn du in 90 Tagen wirklich etwas verändern könntest: Was würde sich in deinem Alltag am meisten ändern?',
    optionen: [
      { text: 'Ich würde abends noch Energie für meine Kinder haben, statt nur noch auf dem Sofa zu sitzen.', key: 'P' },
      { text: 'Ich würde mich nicht mehr hinter dem Stress verstecken. Ich wäre der, der trotzdem funktioniert.', key: 'S' },
      { text: 'Ich würde endlich sehen, dass Konstanz möglich ist. Dass ich nicht immer wieder neu starten muss.', key: 'T' },
      { text: 'Ich würde wissen, was ich esse. Nicht reagieren, sondern entscheiden.', key: 'R' },
      { text: 'Ich würde verstehen, warum ich trotz Training keine Ergebnisse hatte, und was ich anders machen muss.', key: 'W' }
    ]
  }
];

/* ---- Scoring ---- */
window.FDA.TIEBREAK = ['S', 'T', 'R', 'P', 'W'];

window.FDA.berechneArchetyp = function(antworten) {
  var punkte = { S: 0, R: 0, T: 0, P: 0, W: 0 };
  antworten.forEach(function(key) {
    if (punkte[key] !== undefined) punkte[key]++;
  });
  var max = Math.max(punkte.S, punkte.R, punkte.T, punkte.P, punkte.W);
  var gleichstand = Object.keys(punkte).filter(function(k) { return punkte[k] === max; });
  var gewinner = gleichstand.length === 1
    ? gleichstand[0]
    : window.FDA.TIEBREAK.find(function(k) { return gleichstand.includes(k); });
  return { key: gewinner, archetyp: window.FDA.ARCHETYPEN[gewinner], punkte: punkte };
};

/* ---- sessionStorage ---- */
window.FDA.speichereErgebnis = function(data) {
  try { sessionStorage.setItem('fda_quiz_ergebnis', JSON.stringify(data)); } catch(e) {}
};

window.FDA.ladeErgebnis = function() {
  try {
    var raw = sessionStorage.getItem('fda_quiz_ergebnis');
    return raw ? JSON.parse(raw) : null;
  } catch(e) { return null; }
};
