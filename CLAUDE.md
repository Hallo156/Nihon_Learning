# Japanisch Lernprogramm

Erstellt von **Hi156** unter Verwendung von **Claude** (Anthropic).

Interaktive Web-App zum Japanisch lernen. Deutsche und englische UI, Vanilla JS, kein Build-System. Gehostet auf GitHub — laeuft auch lokal via `file://` ohne Server.

## Dateistruktur

```
index.html                 Hauptmenue (14 Karten → Module, inkl. Simulation-Gruppe)
css/
  common.css               Shared: Body, Container, Feedback, Buttons, Score, Nav-Back, Lang-Toggle,
                           next-btn, mode-toggle, view-toggle, choices-area/choice-button,
                           input-area, level-filters, segment-filters, ref-block/ref-body, ref-table,
                           quiz-type-toggle, question-display, segment-badge, vis-toggles
  index.css                Karten-Grid + Gruppen-Ueberschriften fuers Hauptmenue
  kana.css                 Kana-Display (100px), Filter-Panel (kana-spezifisch)
  kanji.css                Kanji-Display (120px), Meaning-Display, Feedback-Extras
  kanji-list.css           Flip-Card Styles, Level-Gruppen, Responsive Grid
  numbers.css              Number-Display (64px), Container-Override
  training.css             Container-Override (900px), Hide-Translation-Regel
  verb.css                 Fragen-Bereich, Verb-Trainer-Ausnahme (Buttons vertikal), Zweizeilige Choice-Buttons, Feedback
  adjective.css            Fragen-Bereich, Adjektiv-Trainer (Buttons vertikal), Zweizeilige Choice-Buttons, Typ-Badge (い/な)
  kanji-vocab.css          Wort-Display (64px), Override fuer Kanji-Vokabular-Modul
  simulation.css           Dialog-Layout (Bubbles, Lücken, Eingabe-Modus-Toggle)
  location-obj.css         SVG-Szene, Hit-Areas, Ball-Styles (Gegenstand-Position)
  location-map.css         SVG-Karte, Richtungsbuttons 2x2-Grid, Gebaeude-Choices (Stadtkarte)
  transport.css            Ketten-Visualisierung (Punkte/Striche), Transport-Icons, Lücken-Animation
  existence.css            Lesetext-Box, Gebaeude-Badges (4 Typen), Zweizeilige Choice-Buttons, Fragenfortschritt
  sidebar.css              Aufklappbare Nachschlag-Sidebar (Toggle-Tab, Panel, Backdrop, Responsive)
js/
  common.js                Shared: shuffleArray(), ScoreTracker, showFeedback(), clearFeedback(), Quick Answer
  i18n.js                  Internationalisierung: Sprach-Toggle DE/EN, UI-String Dictionary, t() Funktion
  quiz-engine.js           Shared Quiz-Logik: QuizEngine-Klasse, getLangField(), buildVisibilityToggles(), buildReferenceSidebar()
  kana.js                  Kana-Daten (6 Kategorien, ~230 Zeichen) + Quiz-Logik + Romaji-Varianten
  kanji-data.js            Kanji-Daten nach Stufen: A1 (73), A2 (35) = 108 Kanji; mit category-Feld (i18n-Key)
  kanji.js                 Kanji-Quiz via QuizEngine: 3 Typen, Stufenfilter
  kanji-list.js            Kanji-Karteikarten: Flip-Cards nach Level + Kategorie gruppiert, Kategorien ausklappbar (sessionStorage)
  numbers-data.js          Zahlen-Daten: Grundzahlen (1-10000), 10 Counter-Tabellen, Referenz-HTML
  numbers.js               Zahlen-Quiz via QuizEngine: 4 Fragetypen, dynamische Generierung, Segment-Filter
  training-data.js         Trainingsdaten: 6 Segmente, ~49 Fragen (MC/Fill), Referenz-Inhalte (particles+positions+shopping entfernt)
  training.js              Grammatik-Quiz via QuizEngine: Segment-Filter, Nachschlag-Sidebar
  verb.js                  15 Verb-Daten (je 4 Formen: Geg./Vgh./Vern.Geg./Vern.Vgh.) + Zeitform-Filter + Quiz via QuizEngine + Romaji-Toggle + Nachschlag-Referenz
  adjective-data.js        Adjektiv-Daten: 25 Adjektive (18 い, 7 な), je 4 Formen bilingual + adjReference (4 Abschnitte inkl. Zeitformen)
  adjective.js             Adjektiv-Quiz via QuizEngine: Zeitform-Filter + 4-Choice-Quiz (Bedeutung+Form) + Romaji-Toggle + Typ-Badge + Nachschlag-Sidebar
  kanji-vocab-data.js      Kanji-Vokabular-Daten: ~55 Verbindungen mit reading, romaji, meanings (bilingual, kein level-Feld)
  kanji-vocab.js           Kanji-Vokabular-Quiz via QuizEngine: 3 Typen, dynamischer Stufenfilter via computeVocabLevel()
  simulation-data.js       Simulations-Daten: 4 Themen (Kleidung, Essen, Moebel, Kore/Sore/Are), Multiline-Dialoge mit Luecken (bilingual); Korero-Szenen haben visual-Feld
  simulation-ref.js        Nachschlag-Referenz fuer Einkaufs-Simulation: Einkaufsphrasen, これ/それ/あれ, Adjektive
  simulation.js            Simulations-Quiz: Szenenwechsel, Lueckenfuellen (MC + Text), renderKoreroVisual() fuer Positionen, nutzt getLangField + buildVisibilityToggles
  giving-data.js           Geben&Nehmen-Daten: 3 Szenen (giving1/2/3), Dialoge bilingual + romaji-Felder; speakerLabels pro Szene; Nachschlag-Referenz (givingReference)
  giving.js                Geben&Nehmen-Quiz: wie Simulation, zusaetzlich Romaji-Toggle via buildVisibilityToggles, renderBlankLine zeigt romaji unter JP-Text
  location-obj-data.js     10 Positionen mit SVG-Koordinaten, JP/DE/EN, Romaji; Nachschlag-Referenz (locationObjReference)
  location-obj.js          SVG-Builder, Beschreiben-Quiz (MC), Zeigen-Quiz (Hit-Area-Klick), via QuizEngine
  location-map-data.js     8 Gebaeude, directionData, 12 descQuestions; Nachschlag-Referenz (locationMapReference)
  location-map.js          SVG-Karte-Builder, Nav-Minispiel, Desc-Quiz, nutzt getLangField + buildVisibilityToggles
  transport-data.js        Transport-Daten: 12 Orte, 8 Transportmittel, 9 Routen (einfach/mittel/komplex), bilingual
  transport-ref.js         Nachschlag-Referenz fuer Transport: Transportmittel, Orte, Satzmuster, のります/おります
  transport.js             Ketten-Quiz: Visualisierung, Lücken-Quiz, MC + Texteingabe, Nachschlag-Sidebar
  existence-data.js        Lesetext-Daten: 6 Texte (2x Manshon, 2x Apaato, 1x Hotel, 1x Ikkenya), je 5-6 Fragen (MC+Fill), housingTypes, existenceReference (bilingual)
  existence.js             Leseverstehen-Quiz: Textanzeige, Gebaeude-Filter, Fragen sequenziell (MC+Fill), Übersetzungs-Toggle, Nachschlag-Sidebar
pages/
  kana.html                Kana-Trainer (Checkbox-Filter, Romaji-Eingabe, Score)
  kanji.html               Kanji-Trainer (3 Quiz-Typen, Stufenfilter, MC + Texteingabe, Score)
  kanji-list.html          Kanji-Karteikarten (Flip-Cards nach Level, alle Stufen)
  numbers.html             Zahlen & Zaehler Trainer (4 Quiz-Typen, 13 Segmente, Nachschlag-Sidebar)
  training.html            Grammatik-Trainer (dynamisches Quiz, Nachschlag-Sidebar)
  verb.html                Verb-Trainer (Zeitform-Filter, 4-Choice-MC, Mode-Toggle, Romaji-Toggle)
  adjective.html           Adjektiv-Trainer (Zeitform-Filter, 4-Choice-MC, Mode-Toggle, Romaji-Toggle)
  kanji-vocab.html         Kanji-Vokabular-Trainer (3 Quiz-Typen, dynamischer Stufenfilter, MC + Texteingabe, Score)
  simulation.html          Einkaufs-Simulation (Multiline-Dialog, Szenenfilter, MC + Texteingabe, Score)
  giving.html              Geben & Nehmen (Multiline-Dialog, Szenenfilter, Romaji-Toggle, MC + Texteingabe, Score)
  location-obj.html        Gegenstand-Position (SVG-Szene, Beschreiben + Zeigen, Score)
  location-map.html        Stadtkarte (SVG-Karte, Navigation + Beschreibungs-Quiz, Score)
  transport.html           Verkehr & Fortbewegung (Ketten-Quiz, Schwierigkeitsfilter, MC + Texteingabe, Score)
  existence.html           Leseverstehen: Wohnen (Lesetext + Quiz, Gebaeude-Filter, MC + Texteingabe, Score)
```

## Architektur-Regeln

- **Alle JS-Dateien erwarten common.js als erstes Script.** Standard-Reihenfolge: `common.js` → `i18n.js` → `quiz-engine.js` → ggf. Daten-Script → `[modul].js`
- **quiz-engine.js wird von allen Modulen geladen** (ausser kana.html und kanji-list.html, die keine QuizEngine nutzen).
- **kanji.js braucht kanji-data.js.** Reihenfolge: common.js → i18n.js → quiz-engine.js → kanji-data.js → kanji.js
- **kanji-list.js braucht kanji-data.js.** Reihenfolge: common.js → i18n.js → kanji-data.js → kanji-list.js
- **training.js braucht training-data.js.** Reihenfolge: common.js → i18n.js → quiz-engine.js → training-data.js → training.js
- **numbers.js braucht numbers-data.js.** Reihenfolge: common.js → i18n.js → quiz-engine.js → numbers-data.js → numbers.js
- **kanji-vocab.js braucht kanji-data.js UND kanji-vocab-data.js.** Reihenfolge: common.js → i18n.js → quiz-engine.js → kanji-data.js → kanji-vocab-data.js → kanji-vocab.js
- **simulation.js braucht simulation-data.js + simulation-ref.js.** Reihenfolge: common.js → i18n.js → quiz-engine.js → simulation-data.js → simulation-ref.js → simulation.js
- **giving.js braucht giving-data.js.** Reihenfolge: common.js → i18n.js → quiz-engine.js → giving-data.js → giving.js
- **location-obj.js braucht location-obj-data.js.** Reihenfolge: common.js → i18n.js → quiz-engine.js → location-obj-data.js → location-obj.js
- **location-map.js braucht location-map-data.js.** Reihenfolge: common.js → i18n.js → quiz-engine.js → location-map-data.js → location-map.js
- **transport.js braucht transport-data.js + transport-ref.js.** Reihenfolge: common.js → i18n.js → quiz-engine.js → transport-data.js → transport-ref.js → transport.js
- **existence.js braucht existence-data.js.** Reihenfolge: common.js → i18n.js → quiz-engine.js → existence-data.js → existence.js
- **verb.js hat keine separate Daten-Datei.** Reihenfolge: common.js → i18n.js → quiz-engine.js → verb.js
- **adjective.js braucht adjective-data.js.** Reihenfolge: common.js → i18n.js → quiz-engine.js → adjective-data.js → adjective.js
- **Pfade:** HTML in `pages/` nutzt `../css/` und `../js/`. `index.html` im Root nutzt `css/` und `js/`.
- **Kein Framework, keine Dependencies.** Alles laeuft ohne Server direkt im Browser (file://) und via GitHub Pages.
- **Antworten immer in Romaji oder Kana akzeptieren.** Jedes `correct[]`-Array muss sowohl Kana- als auch Romaji-Varianten enthalten (z.B. `['に', 'ni']`). Texteingabe-Pruefung case-insensitive fuer Romaji.
- **Das Tool soll immer in Deutsch und Englisch verstaendlich sein.** Alle UI-Texte muessen ueber i18n.js (`t()`-Funktion und `data-i18n`-Attribute) in beiden Sprachen verfuegbar sein. Daten-Dateien (kanji-data.js, training-data.js, verb.js) muessen bilinguale Felder (`meaning_en`, `prompt_en`, `explanation_en`, etc.) enthalten.

## QuizEngine (`quiz-engine.js`)

Zentrale Quiz-Infrastruktur — wird von 8 Modulen genutzt. Enthaelt vier Hauptkomponenten:

### `getLangField(obj, deKey, enKey?)`
Sprach-Helfer fuer bilinguale Datenfelder. Gibt `obj[enKey]` zurueck wenn `currentLang === 'en'` und Wert existiert, sonst `obj[deKey]`. Konvention: `enKey` = `deKey + '_en'` wenn nicht explizit angegeben.
- Standard-Muster: `getLangField(q, 'prompt')` → versucht `q.prompt_en`, Fallback `q.prompt`
- Expliziter EN-Key: `getLangField(b, 'de', 'en')` → versucht `b.en`, Fallback `b.de`
- Genutzt von: allen QuizEngine-Modulen + simulation.js, transport.js, location-map.js

### `buildVisibilityToggles(config)`
Erzeugt Sichtbarkeits-Toggle-Leiste (Romaji / Uebersetzung). Config: `{ container, insertBefore?, insertAfter?, target, toggles[] }`. Jeder Toggle: `{ key, i18nKey, cssClass, defaultOn, onToggle? }`. Gibt State-Objekt `{ [key]: boolean }` zurueck.
- Speichert Zustand in `localStorage`, setzt CSS-Klassen auf `target`, aktualisiert Button-Text bei `langchange`
- Genutzt von: verb.js, location-obj.js, simulation.js, transport.js, location-map.js

### `QuizEngine`-Klasse
Config-basierter Quiz-Lifecycle. Constructor erhaelt Objekt mit:

**DOM-IDs** (optional — Features uebersprungen wenn Element fehlt): `feedbackId`, `nextButtonId`, `choicesAreaId`, `textInputId`, `checkButtonId`, `displayAreaId`, `modeRandomId`, `modeSemiId`, `correctSpanId`, `incorrectSpanId`, `quickAnswerTarget`

**Pflicht-Callbacks:**
- `getPool()` → Array der aktuellen Fragen
- `renderQuestion(item, engine)` → Frage ins DOM rendern
- `buildFeedback(item, isCorrect)` → HTML-String fuer Feedback

**Optionale Callbacks:** `checkText(input, item)`, `onCorrect(item)`, `onIncorrect(item)`, `onReset()`, `onLangChange()`

**Methoden:**
- `loadQuestion()` — Reset DOM, waehle naechste Frage, rufe `renderQuestion()` auf
- `finishAnswer(isCorrect)` — Score, Feedback, Quick Answer / Next Button
- `renderChoiceButtons(choices, onSelect)` — Standard-MC-Buttons erzeugen
- `handleMCAnswer(selected, correctArr)` — Buttons einfaerben + finishAnswer
- `handleTextSubmit()` — Texteingabe validieren via `checkText`
- `resetQuiz()` — Score reset, Pools neu befuellen, loadQuestion
- `switchMode(mode)` — 'random' | 'semi-random', Buttons + resetQuiz

**Automatisches Event-Binding:** nextButton, textInput Enter, checkButton, modeRandom/modeSemi, langchange

### `buildReferenceSidebar(config)`
Erzeugt aufklappbare Nachschlag-Sidebar am rechten Rand. Config: `{ storageKey, buildContent(container) }`.
- `storageKey`: localStorage-Key fuer offen/zu-Zustand (z.B. `'sidebar_training'`)
- `buildContent(container)`: Callback der den Inhalt ins Panel rendert (typisch: `<details class="ref-block">` mit `.ref-body` + `.ref-table`)
- Toggle-Tab fixiert am rechten Rand (writing-mode: vertical-rl), Panel 320px breit (85vw mobil)
- Hoert auf `langchange` → Inhalt automatisch neu gebaut
- Z-Index: 900 (Toggle), 899 (Panel), 898 (Backdrop) — unter Lang-Toggle (1000)
- CSS in `sidebar.css` (muss separat verlinkt werden)
- Genutzt von: training.js, numbers.js, verb.js, location-obj.js, location-map.js, simulation.js, transport.js, giving.js

### Modul-Tiers

| Tier | Module | Nutzung von quiz-engine.js |
|------|--------|----------------------------|
| 1 (Standard-Quiz) | training, numbers, kanji, kanji-vocab | QuizEngine-Klasse vollstaendig |
| 2 (Adaptiert) | verb, location-obj | QuizEngine mit custom Rendering/Klick-Handler |
| 3 (Nur Utilities) | simulation, transport, location-map | getLangField() + buildVisibilityToggles(), eigener Quiz-Lifecycle |
| — | kana, kanji-list | Kein quiz-engine.js (einzigartiger Flow / kein Quiz) |

### Template fuer neues Modul (Tier 1)

```javascript
const engine = new QuizEngine({
    feedbackId: 'feedbackArea',
    nextButtonId: 'nextButton',
    choicesAreaId: 'choicesArea',
    textInputId: 'textInput',
    checkButtonId: 'checkButton',
    displayAreaId: 'displayArea',
    modeRandomId: 'modeRandom',
    modeSemiId: 'modeSemiRandom',
    correctSpanId: 'correctCount',
    incorrectSpanId: 'incorrectCount',
    quickAnswerTarget: '.container-class',

    getPool: () => filteredData,
    renderQuestion: (item, eng) => { /* ... */ },
    checkText: (input, item) => { /* ... return boolean */ },
    buildFeedback: (item, isCorrect) => { /* ... return HTML string */ }
});
```

## Internationalisierung (i18n)

- **Zentrales Dictionary:** `i18n.js` enthaelt `uiStrings` mit ~78 Eintraegen fuer alle geteilten UI-Texte.
- **t(key, ...args):** Uebersetzungsfunktion mit `{0}`-Platzhalter-Unterstuetzung. Liefert DE oder EN je nach `currentLang`.
- **data-i18n Attribute:** Statische HTML-Texte werden per `data-i18n="key"` und `data-i18n-placeholder="key"` markiert und beim Sprachwechsel automatisch aktualisiert.
- **langchange Event:** `CustomEvent('langchange')` wird bei Toggle ausgeloest. Modul-Scripts hoeren darauf und laden Fragen/Feedback neu.
- **Toggle-Button:** Wird per JS in `i18n.js` injiziert (`.lang-toggle`, feste Position rechts oben). Zeigt "EN" wenn aktuell DE, und "DE" wenn aktuell EN.
- **localStorage:** Sprachpraeferenz wird unter Key `'lang'` gespeichert (default: `'de'`).
- **Bilinguale Datenfelder:** Daten-Dateien haben `_en`-Varianten (z.B. `meaning_en[]`, `prompt_en`, `explanation_en`, `label_en`, `title_en`, `html_en`). `getLangField()` in `quiz-engine.js` waehlt je nach `currentLang`.
- **Globaler Level-Filter:** `getActiveLevels()` in `i18n.js` liefert aktuell aktive Levels (localStorage-Key `'levels'`, default `['A1']`). `CustomEvent('levelchange')` wird bei Toggle ausgeloest. Kanji-Trainer, Kanji-Liste und Kanji-Vokabular hoeren darauf. Toggle-Bar wird per JS injiziert (`.level-toggle-bar`, fixiert rechts oben unter dem Sprach-Toggle).

## Zeilengrenze

Dateien sollen **maximal 1000 Zeilen** haben. Falls eine Datei die Grenze ueberschreitet:
1. Logisch zusammenhaengende Abschnitte in eigene Datei auslagern (z.B. Daten vs. Logik)
2. Neue Datei im gleichen Ordner anlegen
3. **Diese CLAUDE.md sofort aktualisieren** (Dateistruktur + Beschreibung)

Aktueller Stand (alle unter 1000 Zeilen):
- `common.js`: ~88 Zeilen
- `i18n.js`: ~311 Zeilen
- `quiz-engine.js`: ~465 Zeilen (QuizEngine-Klasse, getLangField, buildVisibilityToggles, buildReferenceSidebar)
- `verb.js`: ~290 Zeilen (15 Verben × 4 Formen, Zeitform-Filter, buildVerbPool, Quiz via QuizEngine, Nachschlag-Sidebar)
- `kana.js`: ~199 Zeilen
- `kanji-data.js`: ~175 Zeilen (reine Daten: A1=73, A2=35 — B1/B2 zu A2, mehrere zu A1 umgestuft, 円 hinzugefügt, category-Feld)
- `kanji.js`: ~162 Zeilen (via QuizEngine)
- `kanji-list.js`: ~228 Zeilen (Kategorie-Rendering, categoryOrder, sessionStorage-Helfer)
- `numbers-data.js`: ~305 Zeilen (reine Daten: Grundzahlen, Counter-Tabellen, Referenz — bilingual)
- `numbers.js`: ~278 Zeilen (via QuizEngine, Nachschlag-Sidebar statt View-Toggle)
- `training-data.js`: ~330 Zeilen (reine Daten: 6 Segmente Grammatik, Fragen, Referenz — bilingual; particles+positions+shopping entfernt)
- `training.js`: ~165 Zeilen (via QuizEngine, Nachschlag-Sidebar statt View-Toggle)
- `kanji-vocab-data.js`: ~128 Zeilen (reine Daten: ~55 Vokabeln, bilingual, kein level-Feld)
- `kanji-vocab.js`: ~186 Zeilen (via QuizEngine)
- `training.html`: ~73 Zeilen (dynamisches Skelett)
- `numbers.html`: ~73 Zeilen (dynamisches Skelett)
- `kanji-list.html`: ~36 Zeilen (Karteikarten-Skelett)
- `kanji-vocab.html`: ~70 Zeilen (Vokabular-Trainer-Skelett)
- `common.css`: ~594 Zeilen (inkl. alle Shared Quiz-Elemente, quiz-type-toggle, question-display, vis-toggles)
- `sidebar.css`: ~140 Zeilen (Sidebar-Toggle, Panel, Backdrop, Responsive)
- `kana.css`: ~55 Zeilen (nur Kana-spezifisch)
- `verb.css`: ~55 Zeilen (Verb-spezifisch, vertikale Buttons-Ausnahme, .verb-highlight, .verb-romaji-hint, Toggle-CSS)
- `kanji.css`: ~63 Zeilen (nur Kanji-spezifisch, Display + Feedback)
- `kanji-list.css`: ~225 Zeilen (Flip-Card Styles + Kategorie-Abschnitt: .category-section, .category-summary, .cat-arrow)
- `training.css`: ~14 Zeilen (nur Container-Override + hide-translation)
- `numbers.css`: ~18 Zeilen (nur Container + Number-Display)
- `kanji-vocab.css`: ~30 Zeilen (Wort-Display Override)
- `adjective-data.js`: ~370 Zeilen (25 Adjektive × 4 Formen bilingual + adjReference 4 Abschnitte inkl. Zeitformen)
- `adjective.js`: ~130 Zeilen (Zeitform-Filter, buildAdjPool, Quiz via QuizEngine, Typ-Badge, Nachschlag-Sidebar)
- `adjective.css`: ~100 Zeilen (Fragen-Bereich, vertikale Buttons, Zweizeilige Choice-Buttons, Typ-Badge い/な, Toggle-CSS)
- `simulation-data.js`: ~720 Zeilen (reine Daten: 8 Szenen — 2x Kleidung/Essen/Moebel + 2x Kore/Sore/Are, Multiline-Dialoge bilingual; Korero-Szenen: `visual`-Feld)
- `simulation-ref.js`: ~71 Zeilen (Nachschlag-Referenz: Einkaufsphrasen, これ/それ/あれ, Adjektive)
- `simulation.js`: ~535 Zeilen (Dialog-Rendering, Luecken-Logik, MC + Text, Spaced Repetition, renderKoreroVisual(), Nachschlag-Sidebar; nutzt getLangField + buildVisibilityToggles)
- `giving-data.js`: ~289 Zeilen (reine Daten: 3 Szenen — giving1/2/3, bilingual + romaji-Felder; speakerLabels pro Szene; givingReference)
- `giving.js`: ~503 Zeilen (Dialog-Rendering + Romaji-Toggle, Luecken-Logik, MC + Text, Spaced Repetition, Nachschlag-Sidebar; nutzt getLangField + buildVisibilityToggles)
- `simulation.css`: ~165 Zeilen (Dialog-Bubbles, Blank-Styles, Eingabe-Modus-Toggle)
- `location-obj-data.js`: ~150 Zeilen (10 Positionen mit SVG-Koordinaten, JP/DE/EN, Romaji; inkl. in_regal; locationObjReference)
- `location-obj.js`: ~253 Zeilen (SVG-Builder, Beschreiben + Zeigen Quiz via QuizEngine, Nachschlag-Sidebar)
- `location-obj.css`: ~135 Zeilen (Szene, Hit-Areas, Ball, Display-Bereich)
- `location-map-data.js`: ~267 Zeilen (8 Gebaeude, directionData, 8 Nav-Fragen, 12 Desc-Fragen; locationMapReference)
- `location-map.js`: ~437 Zeilen (SVG-Karte, Nav-Minispiel, Desc-Quiz, Nachschlag-Sidebar; nutzt getLangField + buildVisibilityToggles)
- `location-map.css`: ~185 Zeilen (Karte, Richtungsbuttons 2x2, Gebaeude-Choices, Schritt-Log, Finalize-Button)
- `transport-data.js`: ~960 Zeilen (12 Orte, 8 Transportmittel, 14 Routen inkl. 5 のります/おります-Routen, sentenceOptions, bilingual)
- `transport-ref.js`: ~103 Zeilen (Nachschlag-Referenz: Transportmittel, Orte, Satzmuster, のります/おります)
- `transport.js`: ~649 Zeilen (Ketten-Rendering, Lücken-Quiz, MC + Text, Spaced Repetition, Nachschlag-Sidebar; nutzt getLangField + buildVisibilityToggles)
- `transport.css`: ~460 Zeilen (Kette, Punkte/Striche, SVG-Icons in CSS, Lücken-Animation, Satz-Buttons)
- `existence-data.js`: ~380 Zeilen (6 Lesetexte × 5-6 Fragen, housingTypes, existenceReference bilingual)
- `existence.js`: ~180 Zeilen (Filter, Text-Rendering, Fragen-Lifecycle, MC+Fill, Übersetzungs-Toggle, Nachschlag-Sidebar)
- `existence.css`: ~115 Zeilen (Lesetext-Box, Gebaeude-Badges, Choice-Buttons, Fragenfortschritt)

## Module im Detail

### Kana-Trainer (`kana.js` + `kana.html`)
- 6 Checkbox-Filter: hiraganaBasic, katakanaBasic, hiraganaDakuten, katakanaDakuten, hiraganaYoon, katakanaYoon
- Romaji-Varianten akzeptiert: Hepburn (shi) + Kunrei-shiki (si) + Yoon-Varianten (sha/sya)
- Bei Richtig: 800ms Delay, dann auto-naechstes Zeichen
- Enter-Taste = Pruefen
- **Kein quiz-engine.js** — einzigartiger Auto-Advance-Flow (800ms), kein Spaced Repetition
- **IDs (vereinheitlicht):** Texteingabe `#textInput` (war `romajiInput`), Filter-Button `#applyFilter` (war `applyFiltersButton`)

### Verb-Trainer (`verb.js` + `verb.html`)
- 15 Verben im ます-Form, je **4 Formen**: Gegenwart / Vergangenheit / Verneinung Geg. / Verneinung Vgh. → 60 Pool-Items bei allen aktiven Filtern
- Datenstruktur: `{ verb_masu, romaji, meaning_de, meaning_en, forms: { present, past, neg_present, neg_past } }` — jede Form: `{ jp, de, en, verb_jp, verb_romaji }`
- **Pool-Items** (flach): `{ base: verbObj, formKey, sentence_jp, sentence_de, sentence_en, verb_jp, verb_romaji }`
- **Quiz-Format:** Vollständiger JP-Satz angezeigt; Nutzer wählt **4 Choices** — jede zeigt `Bedeutung` (fett) + `Zeitform-Label` (klein) zweizeilig
- **Zeitform-Filter:** 3 Checkboxen (Gegenwart / Vergangenheit / Verneinung), "Filter anwenden" → `resetQuiz()`; mindestens 1 muss aktiv sein
- Distraktoren-Strategie: 1 gleiche-Verb-andere-Form, 1 anderes-Verb-gleiche-Form, 1 zufällig — garantiert lehrreiche Auswahl
- **Via QuizEngine** (MC-only): Custom Button-Rendering, ruft `engine.finishAnswer()` direkt auf (prüft verb_masu UND formKey)
- **Sichtbarkeits-Toggle** via `buildVisibilityToggles()`: Romaji — localStorage `verb_romaji`, standard-an
- **Nachschlag-Sidebar:** Zeitformen-Tabelle (ます/ました/ません/ませんでした) + Verb-Tabelle (15) + Partikel-Übersicht
- Feedback zeigt: `Bedeutung – Zeitform` + JP-Satz + Übersetzung + konjugiertes Verb + Romaji
- Index-Gruppe: **Zahlen & Vokabular**
- i18n-Keys: `verb.*` (7 Einträge), `index.verb.*` (2 Einträge), `form.*` (4 geteilt mit Adjektiv), `filter.tense.*` (4 geteilt)

### Adjektiv-Trainer (`adjective-data.js` + `adjective.js` + `adjective.html`)
- 25 Adjektive (18 い, 7 な), je **4 Formen**: Gegenwart / Vergangenheit / Verneinung Geg. / Verneinung Vgh. → 100 Pool-Items bei allen aktiven Filtern
- Datenstruktur: `{ adj, romaji, type('i'|'na'), meaning_de, meaning_en, forms: { present, past, neg_present, neg_past } }` — jede Form: `{ jp, de, en, adj_jp, adj_romaji }`
- い-Konjugation: stem+かった (Past) / stem+くない (NegPres) / stem+くなかった (NegPast); Sonderfall: いい→よ-Stamm
- な-Konjugation: でした (Past) / じゃない です (NegPres) / じゃなかった です (NegPast)
- **Pool-Items** (flach): `{ base: adjObj, formKey, sentence_jp/de/en, adj_jp, adj_romaji }`
- **Quiz-Format:** Vollständiger JP-Satz angezeigt; Nutzer wählt **4 Choices** — zweizeilig: Bedeutung + Zeitform-Label
- **Zeitform-Filter:** 3 Checkboxen (Gegenwart / Vergangenheit / Verneinung), "Filter anwenden" → `resetQuiz()`
- Distraktoren-Strategie: gleiche-Adj-andere-Form + anderes-Adj-gleiche-Form + zufällig
- **Via QuizEngine** (MC-only): prüft adj UND formKey
- **Sichtbarkeits-Toggle** via `buildVisibilityToggles()`: Romaji — localStorage `adj_romaji`, standard-an
- **Nachschlag-Sidebar:** Zeitformen-Tabelle (beide Adj-Typen) + い-Adj-Tabelle (18) + な-Adj-Tabelle (7)
- Feedback zeigt: `Bedeutung – Zeitform` + JP-Satz + Übersetzung + konjugierte Form + Romaji + Typ-Badge (い/な)
- Index-Gruppe: **Zahlen & Vokabular**
- i18n-Keys: `adj.*` (9 Einträge), `index.adj.*` (2 Einträge)

### Kanji-Trainer (`kanji-data.js` + `kanji.js` + `kanji.html`)
- 108 Kanji in 2 Stufen: A1 (73), A2 (35)
- Datenstruktur: `{ kanji, meaning_de[], meaning_en[], on, kun, romaji, romaji_variants[], category, level }`
- **Via QuizEngine**: 3 Quiz-Typen per Toggle, `renderQuestion` verzweigt intern nach `currentQuizType`
- Stufenfilter: **global** via Level-Toggle-Bar (rechts oben), kein lokaler Filter mehr
- Texteingabe: Enter = Pruefen, akzeptiert meaning_de + meaning_en-Varianten bzw. Romaji-Varianten
- Feedback zeigt: Kanji, Level-Badge, Bedeutungen, On/Kun-yomi, Romaji

### Kanji-Liste (`kanji-data.js` + `kanji-list.js` + `kanji-list.html`)
- Flip-Cards: Vorderseite zeigt Kanji, Rueckseite zeigt Bedeutung + On/Kun-Lesung + Romaji
- Hierarchie: Level-Gruppe → Kategorie-Abschnitt → Karten-Grid
- **A1-Kategorien (11):** Zahlen, Wochentage, Zeit, Kompass & Richtungen, Grundbegriffe, Verben & Tätigkeiten, Adjektive, Essen, Familie, Schule & Bildung, Land & Gesellschaft
- **A2-Kategorien (5):** Aktionen, Körper, Weiteres, Konzepte & Adjektive, Fortgeschrittene Konzepte
- Kategorien ausklappbar via `<details>/<summary>` — erste Kategorie pro Level standard-offen
- Aufklapppzustand per `sessionStorage` gespeichert (bleibt bei Sprach-/Levelwechsel erhalten; reset bei Seiten-Reload)
- `category`-Feld in `kanji-data.js`: i18n-Key (z.B. `'kanjiList.cat.zahlen'`) — 16 Kategorie-Keys in `i18n.js`
- **Kein quiz-engine.js** — Karteikarten, kein Quiz
- Level-Filter: **global** via Level-Toggle-Bar, reagiert auf `levelchange`-Event
- Click zum Umdrehen (CSS 3D Transform, perspective)
- Responsive Grid: auto-fill minmax(100px, 1fr)
- i18n: Sprach-Toggle aktualisiert Bedeutungen, Level-Labels und Kategorienamen

### Zahlen & Zaehler (`numbers-data.js` + `numbers.js` + `numbers.html`)
- 13 Segmente: 3 Grundzahlen-Bereiche (1-10, 11-100, 100-10000) + 10 Counter (つ, 人, 本, 枚, 匹, 台, 冊, 杯, 個, 回)
- Checkbox-Filter fuer Segmentauswahl (Zahlen 1-10 default an), "Filter anwenden" resettet Quiz
- **Via QuizEngine**: 4 Fragetypen dynamisch generiert, `renderQuestion` verzweigt nach Fragetyp
- Datenstruktur Counter: `{ kanji, description, description_en, use_de, use_en, items[{n, reading, romaji}], examples[] }`
- Alle Lautverschiebungen (rendaku/Gemination) korrekt: z.B. さんぼん (3本), いっぴき (1匹)
- **Nachschlag-Sidebar:** Counter-Tabellen als klappbare details/summary in aufklappbarer Sidebar rechts
- Texteingabe: Enter = Pruefen, akzeptiert Kana + Romaji

### Grammatik-Trainer (`training-data.js` + `training.js` + `training.html`)
- 6 Themen-Segmente (Grammatik): Existenzsatz, Geben/Nehmen, Verb-Vgh., い-Adj-Vgh., な-Adj-Vgh., Negation
- Entfernt: Partikel (に/を) — in Transport-Modul enthalten; Positionen (まえ/うしろ…) — in Gegenstand-Position enthalten
- Checkbox-Filter fuer Segmentauswahl (Existenzsatz default an), "Filter anwenden" resettet Quiz
- **Via QuizEngine**: ~70 Fragen in 3 Typen (MC, Fill, Translate), `renderQuestion` verzweigt nach Fragetyp
- Datenstruktur: `{ segment, type, prompt, prompt_en?, prompt_jp?, correct[], choices?, choices_en?, correct_en?, explanation, explanation_en? }`
- **Sichtbarkeits-Toggle** via `buildVisibilityToggles()`: Uebersetzung ein/aus
- **Nachschlag-Sidebar:** Grammatik-Referenz als klappbare details/summary in aufklappbarer Sidebar rechts
- Texteingabe: Enter = Pruefen, Feedback mit Erklaerung nach Antwort
- Loesungen erst nach Beantwortung sichtbar

### Kanji-Vokabular (`kanji-vocab-data.js` + `kanji-vocab.js` + `kanji-vocab.html`)
- ~55 zusammengesetzte Woerter (Kanji+Kanji, Kanji+Kana) relevant fuer A1/A2
- Datenstruktur: `{ word, reading, romaji, romaji_variants[], meaning_de[], meaning_en[] }` — **kein `level`-Feld**
- **Dynamischer Stufenfilter:** `computeVocabLevel(word)` berechnet Level zur Laufzeit aus `kanji-data.js`. Hoechster Level aller Kanji-Zeichen des Worts. Aendert sich automatisch wenn Kanji in `kanji-data.js` umgestuft werden.
- **Via QuizEngine**: 3 Quiz-Typen per Toggle, nahezu identisches Muster wie kanji.js
- Stufenfilter: **global** via Level-Toggle-Bar, reagiert auf `levelchange`-Event
- Texteingabe Wort→Bedeutung: akzeptiert meaning_de + meaning_en (case-insensitive)
- Texteingabe Bedeutung→Wort: akzeptiert Kanji-Schreibung, Hiragana-Lesung, Romaji + Varianten
- Texteingabe Wort→Lesung: akzeptiert Hiragana + Romaji + Varianten
- Feedback zeigt: Wort, dynamischer Level-Badge, Hiragana-Lesung (Romaji), DE + EN Bedeutungen
- HTML laedt kanji.css + kanji-vocab.css (Override fuer `.word-display` 64px)

## CSS-Design-System

- Hintergrund: `#f0f2f5`, Container: weiss mit Shadow
- Primaerfarbe: `#007bff` (Buttons, Links, Headings)
- Feedback: Gruen `#e8f5e9`/`#2e7d32` (richtig), Rot `#ffebee`/`#c62828` (falsch)
- Alle Module nutzen `.feedback.correct` / `.feedback.incorrect` aus common.css
- Sprach-Toggle: `.lang-toggle` (fixiert, rechts oben, blaue Pill-Form)
- Quick Answer Toggle: `.quick-answer-toggle` (Pill-Form, grau=aus, orange=an)
- **Shared Quiz-Elemente** in `common.css`: `.next-btn` (gruen), `.mode-toggle` (Pill, max 350px), `.view-toggle` (Pill), `.quiz-type-toggle` (Pill), `.choices-area` + `.choice-button` (18px, horizontal wrap, inkl. `:disabled`/`.correct-choice`/`.wrong-choice`), `.input-area` (max 300px), `.question-display` + `.segment-badge`, `.level-filters`, `.segment-filters`, `.ref-block`/`.ref-body`, `.ref-table`, `.map-vis-toggles` / `.map-vis-btn` (Sichtbarkeits-Toggles)
- **Globaler Level-Toggle** in `common.css`: `.level-toggle-bar` (fixiert, rechts oben unter Sprach-Toggle), `.level-toggle-btn` / `.level-toggle-btn.active`
- **Ausnahme Verb-Trainer:** `.verb-trainer .choices-area` erzwingt vertikales Layout (Saetze als Antworten koennen lang sein)
- **Body-Klassen** auf allen Modul-Seiten: `.kana`, `.verb`, `.kanji`, `.kanji-vocab`, `.kanji-list`, `.training`, `.numbers`, `.simulation`, `.giving`, `.location-obj`, `.location-map`, `.transport` — als CSS-Scope-Anker fuer modul-spezifische Overrides

## Quick Answer (Schnell-Modus)

- **Zuschaltbar** per Toggle-Button auf jeder Quiz-Seite (⚡ Schnell / ⚡ Normal)
- **localStorage:** Einstellung unter Key `'quickAnswer'` gespeichert (default: `false`)
- **Bei richtig + aktiv:** 400ms gruener Feedback-Flash, dann automatisch naechste Frage. Texteingabe sofort fokussiert.
- **Bei falsch:** Normales Verhalten (Feedback lesen, "Naechste Frage" klicken)
- **Zentrale Logik** in `common.js`: `quickAnswerEnabled`, `isQuickAnswer()`, `toggleQuickAnswer()`, `injectQuickAnswerButton(container)`
- **quickanswerchange Event:** `CustomEvent('quickanswerchange')` wird bei Toggle ausgeloest. Button-Text aktualisiert sich automatisch.
- **QuizEngine** integriert Quick Answer automatisch ueber `quickAnswerTarget` Config. Tier-3-Module rufen `injectQuickAnswerButton()` manuell auf.
- **Alle 9 Module** nutzen Quick Answer: kana.js (verkuerzt 800→400ms), kanji.js, verb.js, training.js, numbers.js, kanji-vocab.js, simulation.js, location-obj.js, location-map.js

### Einkaufs-Simulation (`simulation-data.js` + `simulation.js` + `simulation.html`)
- 8 Szenen (A1-Fokus): je 2x Kleidung kaufen, Lebensmittel kaufen, Moebel kaufen, これ/それ/あれ Demonstrativpronomen
- Multiline-Dialog: feste Zeilen (Sprecher sichtbar) + Lueckenzeilen (aktive Luecke hervorgehoben)
- Eingabe-Modus Toggle: "Multiple Choice" (Buttons) oder "Gemischt" (Romaji/Kana/Kanji)
- Lückenfortschritt: Lücken werden der Reihe nach freigeschaltet, bereits gefuellte Luecken gruen dargestellt
- Szenenwahl per Checkbox-Filter + "Filter anwenden"-Button
- Modi: "Zufaellig" / "Wiederholung" (gleicher 70/30 Algorithmus wie andere Module)
- **Tier-3-Modul:** Eigener Quiz-Lifecycle, nutzt `getLangField()` + `buildVisibilityToggles()` aus quiz-engine.js
- Feedback nach jeder Luecke: Erklaerung (DE/EN) + richtige Antwort bei Fehler
- Quick Answer: nach richtiger Antwort 400ms Delay, dann automatisch naechste Luecke
- Sprecher-Labels: "Verkäufer" / "Kunde" (i18n-Keys `sim.speaker.staff` / `sim.speaker.customer`)
- Datenstruktur Zeile: `{ type:'text'|'blank', speaker, jp?, de?, en?, before?, after?, before_en?, after_en?, correct[], choices[], explanation, explanation_en, mcOnly?, visual? }`
- `visual`-Feld (optional, nur Korero-Szenen): `{ position: 'near-customer'|'near-staff'|'far', item: Emoji-String }` — rendert visuellen Positions-Indikator (👤 Du / Emoji / 👤 Verk.) über der aktiven Lücke via `renderKoreroVisual()`
- **Nachschlag-Sidebar:** Einkaufsphrasen, これ/それ/あれ Demonstrativpronomen, Adjektive (via simulation-ref.js)
- i18n-Keys: `sim.*` (11 Eintraege in i18n.js)
- Index-Gruppe: "Simulation" (`index.group.simulation`)

### Geben & Nehmen (`giving-data.js` + `giving.js` + `giving.html`)
- 3 Szenen (A1-Fokus): giving1 (Geburtstag — Sakura/Kenta), giving2 (Familie — Yui/Sota), giving3 (Kette — Momo/Riku)
- Jede Szene hat `speakerLabels: { ten: {de,en}, kyaku: {de,en} }` mit Charakternamen statt "Verkäufer"/"Kunde"
- **Romaji-Toggle** (Besonderheit dieses Moduls): jede Zeile hat ein `romaji`-Feld (text-Zeilen) bzw. `before_romaji`/`after_romaji`/`answer_romaji` (blank-Zeilen); `.dialog-romaji`-Span in CSS ausblendbar per `hide-romaji`-Klasse
- Romaji-Anzeige: unter dem JP-Text in kleiner kursiver Schrift (`font-size: 12px, color: #999`). Bei aktiver Lücke: `before_romaji ＿＿＿ after_romaji`, nach Antwort: vollständig mit `answer_romaji`
- **Sichtbarkeits-Toggles** via `buildVisibilityToggles()`: Romaji (`giving_romaji`) + Übersetzung (`giving_translation`) — beide standard-an
- **Tier-3-Modul:** Eigener Quiz-Lifecycle (wie simulation.js), ohne renderKoreroVisual(); nutzt `getLangField()` + `buildVisibilityToggles()`
- Abgedeckte Grammatik: あげます (Sprecher → andere), もらいます (Sprecher ← andere), くれます (andere → Sprecher); giving3 kontrastiert くれました vs もらいました für dasselbe Ereignis (andere Perspektive)
- Datenstruktur Zeile text: `{ type:'text', speaker, jp, romaji, de, en }`
- Datenstruktur Zeile blank: `{ type:'blank', speaker, before, after, before_romaji, after_romaji, answer_romaji, before_en, after_en, de, en, correct[], choices[], explanation, explanation_en }`
- simulation.css wird mitgeladen (Dialog-Bubble-Styles); `.dialog-romaji` + `.giving-trainer.hide-romaji .dialog-romaji` in simulation.css ergaenzt
- **Nachschlag-Sidebar:** あげます/もらいます/くれます Uebersicht, Perspektiv-Regeln, Partikel に/から (via givingReference in giving-data.js)
- i18n-Keys: `giving.title`, `index.giving.title`, `index.giving.desc` (3 Eintraege)
- Index-Gruppe: "Simulation"

## Regeln fuer Dialogdaten (Simulation + kuenftige Dialoge)

### Eindeutigkeit der Antworten (Prioritaet: hoch)
Jede Luecke in einem Dialog muss **genau eine richtige Antwort** haben — entweder:
1. **Alle gueltigen Varianten ins `correct[]`-Array** aufnehmen (z.B. Kana + Romaji + Schreibvarianten), ODER
2. **Die `choices[]` so einschraenken**, dass nur die eine korrekte Option sinnvoll ist — die falschen Optionen muessen aus einem anderen Wortfeld stammen (z.B. Obst statt andere Farben, Moebel statt andere Kleidungsstuecke).

**Nie** mehrere thematisch gleichwertige Optionen als Choices anbieten, wenn der Dialog nur eine davon erlaubt (Beispiel: nicht alle Farben als Choices wenn der Dialog auf „blau" festgelegt ist).

### Gegenstand-Position (`location-obj-data.js` + `location-obj.js` + `location-obj.html`)
- SVG-Szene (viewBox 500×360): Tisch (テーブル), Box (箱), Regal (棚) als fixe Objekte; roter Ball (ボール) an wechselnden Positionen
- 9 Positionen: auf/unter dem Tisch, neben/vor/hinter der Box, neben/vor dem Regal, zwischen Box+Tisch, auf dem Regal
- Datenstruktur: `{ id, jp, romaji, de, en, ballCx, ballCy, hitX, hitY, hitW, hitH }`
- **Via QuizEngine** (Tier 2): 2 Quiz-Typen per Toggle — **Beschreiben** (MC, custom Buttons mit JP/Romaji/Translation) / **Zeigen** (SVG-Klick, ruft `engine.finishAnswer()` direkt auf)
- SVG komplett inline als String (kein fetch, laeuft auf file://)
- **Sichtbarkeits-Toggles** via `buildVisibilityToggles()`: Romaji + Uebersetzung
- **Nachschlag-Sidebar:** Positionswoerter-Tabelle (上/下/前/後ろ/横/中/間) + Satzmuster (~の[Position]にあります)
- Quick Answer: 400ms auto-advance bei richtig
- i18n-Keys: `locObj.*` (7 Eintraege in i18n.js)
- Index-Gruppe: "Simulation"

### Stadtkarte (`location-map-data.js` + `location-map.js` + `location-map.html`)
- SVG-Karte (viewBox 610×390): 3×3-Strassengitter mit 8 farbigen Gebaeuden als Rechtecke + JP-Kanji + Romaji-Labels
- 8 Gebaeude: 駅 (Bahnhof), 学校 (Schule), コンビニ (Konbini), 病院 (Krankenhaus), 公園 (Park), 銀行 (Bank), 郵便局 (Postamt), 図書館 (Bibliothek)
- Datenstruktur Gebaeude: `{ id, jp, romaji, de, en, color, col, row, x, y, w, h }`
- **Tier-3-Modul:** Eigener Quiz-Lifecycle, nutzt `getLangField()` + `buildVisibilityToggles()` aus quiz-engine.js
- 2 Modi per Toggle:
  - **Navigation**: 8 scripted Routen (steps[]: migi/hidari/massugu/modoru), Richtungsbuttons 2×2-Grid werden bei jeder Frage/jedem Schritt neu gemischt (shuffleArray) — Lernender muss みぎ/ひだり/まっすぐ/もどる kennen
  - **Beschreiben**: 12 Fragen (Gebaeude hervorgehoben, Frage "Was ist rechts/links/ueber/unter X?"), 4 MC-Buttons mit Gebaeude-JP+DE/EN
- Highlight: hervorgehobenes Gebaeude mit goldenem Stroke + Glow-Filter (SVG `<filter>`)
- Start-Marker: weisser Kreis mit "S" auf dem Startgebaeude (Nav-Modus)
- Getrennte Spaced-Repetition-Pools fuer Nav und Desc (beim Typwechsel erhalten)
- **Nachschlag-Sidebar:** Richtungswoerter (みぎ/ひだり/まっすぐ/もどる), Gebaeude-Liste (8), Positionsfragen-Muster
- Quick Answer: 400ms auto-advance
- i18n-Keys: `locMap.*` (12 Eintraege in i18n.js)
- Index-Gruppe: "Simulation"

### Verkehr & Fortbewegung (`transport-data.js` + `transport.js` + `transport.html`)
- **Ketten-Visualisierung:** Abwechselnde Punkte (Orte) und Striche (Transportmittel) horizontal scrollbar
- 12 Orte (`transportPlaces`): いえ, えき, がっこう, くうこう, びょういん, こうえん, スーパー, バス停, 地下鉄の駅, ホテル, 会社, コンビニ — je mit Emoji-Icon, Kanji, Romaji, DE/EN
- 8 Transportmittel (`transportModes`): あるいて, でんしゃ, ちかてつ, バス, タクシー, くるま, ひこうき, じてんしゃ — je mit inline SVG-Icon, Farbe, Romaji
- 14 Routen-Szenarien in 3 Schwierigkeiten: einfach (1 Schritt), mittel (2 Schritte), komplex (3 Schritte) + 5 のります/おります-Verb-Routen
- **Tier-3-Modul:** Eigener Quiz-Lifecycle, nutzt `getLangField()` + `buildVisibilityToggles()` aus quiz-engine.js
- **Lücken:** Unbekannte Transportmittel als animiertes ???-Icon; nach Beantwortung aufgedeckt (CSS-Animation)
- Eingabe-Modus Toggle: "Multiple Choice" (4 Transport-Buttons mit SVG-Icon) / "Texteingabe" (Kana oder Romaji)
- Schwierigkeits-Filter: Checkboxen (Einfach / Mittel / Komplex), "Filter anwenden" resettet Quiz
- Visibility-Toggles via `buildVisibilityToggles()`: Romaji / Übersetzung ein-/ausblenden
- Modi: "Zufällig" / "Wiederholung" (70/30 Spaced Repetition)
- Quick Answer: 400ms auto-advance bei richtig
- Datenstruktur Route: `{ id, label:{de,en}, difficulty, nodes:[{type:'place'|'transport',id}], questions:[{stepIndex,type,prompt_de,prompt_en,promptArgs,correct[],correctId,choices[],sentenceOptions[],explanation_de,explanation_en}] }`
- **Verb-Fragen** (のります/おります): `correctId:'norimasu'|'orimasu'` — sentenceOptions.modeId matcht correctId; JS-Fallback holt Fahrzeug-Icon aus Ketten-Node; Texteingabe akzeptiert kurze Kana/Romaji ODER vollständigen Satz
- **Nachschlag-Sidebar:** Transportmittel-Tabelle (8), Orte-Tabelle (12), Satzmuster (で-Partikel), のります/おります (via transport-ref.js)
- i18n-Keys: `transport.*` (8 Eintraege in i18n.js)
- Index-Gruppe: "Simulation"

### Leseverstehen: Wohnen (`existence-data.js` + `existence.js` + `existence.html`)
- 6 Lesetexte (A1-Fokus): 2x Manshon, 2x Apaato, 1x Hotel, 1x Ikkenya — je 5-6 Fragen
- Jeder Text hat: Titel (bilingual), JP-Text, Übersetzung (DE+EN), Fragen-Array
- **Ablauf:** Text immer sichtbar → Fragen sequenziell beantworten → nächster Text
- **Fragetypen:** `mc` (Multiple-Choice mit jp/de/en-Choices) + `fill` (Texteingabe, correct[]-Array)
- Gebäudetyp-Filter: 4 Checkboxen (マンション / アパート / ホテル / 一軒家), "Filter anwenden" resettet Quiz
- **Übersetzungs-Toggle** via `buildVisibilityToggles()`: ein/aus für Textübersetzung (`exist_translation`)
- **Nachschlag-Sidebar:** Grammatik あります/います, Gebäudetypen, Räume, Möbel (via existenceReference in existence-data.js)
- Fragen decken ab: Gebäudetyp, Anzahl (Zähler), Existenz (あります/ありません・います/いません), Inhalt von Räumen
- **Tier-3-Modul:** Eigener Quiz-Lifecycle, nutzt `getLangField()` + `buildVisibilityToggles()` + `buildReferenceSidebar()`
- Quick Answer: 400ms auto-advance bei richtiger Antwort (ausser letzter Frage eines Texts)
- Fill-Antworten: akzeptiert Zahl (1/2/3…), Kana (いち/に/さん…), Romaji (ichi/ni/san…), Zähler-Varianten
- Datenstruktur Text: `{ id, type, title_de, title_en, text_jp, text_de, text_en, questions[] }`
- Datenstruktur Frage MC: `{ prompt_de, prompt_en, type:'mc', correct[], choices[{jp,de,en}], explanation_de, explanation_en }`
- Datenstruktur Frage Fill: `{ prompt_de, prompt_en, type:'fill', correct[], explanation_de, explanation_en }`
- i18n-Keys: `existence.*` (4 Eintraege), `index.existence.*` (2 Eintraege)
- Index-Gruppe: "Simulation"

### mcOnly-Pflicht bei offenem Vokabular
Luecken, bei denen auf A1-Niveau viele verschiedene Woerter grammatisch passen wuerden (z.B. „Ich suche ___", „Haben Sie ___ in ___?"), **muessen** `mcOnly: true` erhalten. Texteingabe waere hier unfair, da der Lernende die spezifisch im Dialog erwartete Antwort nicht erraten kann. Faustregel: Wenn die Luecke ein Nomen/Adjektiv ist das den Dialog-Ablauf festlegt, immer `mcOnly: true` setzen.
