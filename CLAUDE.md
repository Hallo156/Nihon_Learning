# Japanisch Lernprogramm

Erstellt von **Hi156** unter Verwendung von **Claude** (Anthropic).

Interaktive Web-App zum Japanisch lernen. Deutsche und englische UI, Vanilla JS, kein Build-System. Gehostet auf GitHub — laeuft auch lokal via `file://` ohne Server.

## Dateistruktur

```
index.html                 Hauptmenue (7 Karten → Module)
css/
  common.css               Shared: Body, Container, Feedback, Buttons, Score, Nav-Back, Lang-Toggle,
                           next-btn, mode-toggle, view-toggle, choices-area/choice-button,
                           input-area, level-filters, segment-filters, ref-block/ref-body, ref-table
  index.css                Karten-Grid + Gruppen-Ueberschriften fuers Hauptmenue
  kana.css                 Kana-Display (100px), Filter-Panel (kana-spezifisch)
  kanji.css                Kanji-Display (120px), Meaning-Display, Quiz-Type-Toggle, Feedback-Extras
  kanji-list.css           Flip-Card Styles, Level-Gruppen, Responsive Grid
  numbers.css              Zahlen-Display (64px), Frage-Anzeige (numbers-spezifisch), Feedback
  training.css             Frage-Anzeige (training-spezifisch), Feedback, Container-Override (900px)
  verb.css                 Fragen-Bereich, Verb-Trainer-Ausnahme (Buttons vertikal), Feedback
  kanji-vocab.css          Wort-Display (64px), Override fuer Kanji-Vokabular-Modul
js/
  common.js                Shared: shuffleArray(), ScoreTracker, showFeedback(), clearFeedback(), Quick Answer
  i18n.js                  Internationalisierung: Sprach-Toggle DE/EN, UI-String Dictionary, t() Funktion
  kana.js                  Kana-Daten (6 Kategorien, ~230 Zeichen) + Quiz-Logik + Romaji-Varianten
  kanji-data.js            Kanji-Daten nach Stufen: A1 (73), A2 (35) = 108 Kanji
  kanji.js                 Kanji-Quiz: 3 Typen, Stufenfilter, Spaced Repetition (70/30)
  kanji-list.js            Kanji-Karteikarten: Flip-Cards nach Level gruppiert
  numbers-data.js          Zahlen-Daten: Grundzahlen (1-10000), 10 Counter-Tabellen, Referenz-HTML
  numbers.js               Zahlen-Quiz: 4 Fragetypen, dynamische Generierung, Segment-Filter, Spaced Repetition
  training-data.js         Trainingsdaten: 10 Segmente, ~70 Fragen (MC/Fill/Translate), Referenz-Inhalte
  training.js              Dynamischer Quiz-Motor: Segment-Filter, Spaced Repetition (70/30), Ansicht-Toggle
  verb.js                  15 Verb-Daten + Quiz-Logik + Toggle Random/Semi-Random (Spaced Repetition 70/30)
  kanji-vocab-data.js      Kanji-Vokabular-Daten: ~55 Verbindungen mit reading, romaji, meanings (bilingual, kein level-Feld)
  kanji-vocab.js           Kanji-Vokabular-Quiz: 3 Typen, dynamischer Stufenfilter via computeVocabLevel(), Spaced Repetition
pages/
  kana.html                Kana-Trainer (Checkbox-Filter, Romaji-Eingabe, Score)
  kanji.html               Kanji-Trainer (3 Quiz-Typen, Stufenfilter, MC + Texteingabe, Score)
  kanji-list.html          Kanji-Karteikarten (Flip-Cards nach Level, alle Stufen)
  numbers.html             Zahlen & Zaehler Trainer (4 Quiz-Typen, 13 Segmente, Nachschlagen)
  training.html            Grammatik-Trainer (dynamisches Quiz + Nachschlagen-Ansicht)
  verb.html                Verb-Trainer (Satzluecken, Multiple-Choice, Mode-Toggle)
  kanji-vocab.html         Kanji-Vokabular-Trainer (3 Quiz-Typen, dynamischer Stufenfilter, MC + Texteingabe, Score)
```

## Architektur-Regeln

- **Alle JS-Dateien erwarten common.js als erstes Script.** Reihenfolge: `<script src="../js/common.js">` → `<script src="../js/i18n.js">` → ggf. Daten-Script → `<script src="../js/[modul].js">`
- **kanji.js braucht kanji-data.js.** Reihenfolge: common.js → i18n.js → kanji-data.js → kanji.js
- **kanji-list.js braucht kanji-data.js.** Reihenfolge: common.js → i18n.js → kanji-data.js → kanji-list.js
- **training.js braucht training-data.js.** Reihenfolge: common.js → i18n.js → training-data.js → training.js
- **numbers.js braucht numbers-data.js.** Reihenfolge: common.js → i18n.js → numbers-data.js → numbers.js
- **kanji-vocab.js braucht kanji-data.js UND kanji-vocab-data.js.** Reihenfolge: common.js → i18n.js → kanji-data.js → kanji-vocab-data.js → kanji-vocab.js
- **Pfade:** HTML in `pages/` nutzt `../css/` und `../js/`. `index.html` im Root nutzt `css/` und `js/`.
- **Kein Framework, keine Dependencies.** Alles laeuft ohne Server direkt im Browser (file://) und via GitHub Pages.
- **Antworten immer in Romaji oder Kana akzeptieren.** Jedes `correct[]`-Array muss sowohl Kana- als auch Romaji-Varianten enthalten (z.B. `['に', 'ni']`). Texteingabe-Pruefung case-insensitive fuer Romaji.
- **Das Tool soll immer in Deutsch und Englisch verstaendlich sein.** Alle UI-Texte muessen ueber i18n.js (`t()`-Funktion und `data-i18n`-Attribute) in beiden Sprachen verfuegbar sein. Daten-Dateien (kanji-data.js, training-data.js, verb.js) muessen bilinguale Felder (`meaning_en`, `prompt_en`, `explanation_en`, etc.) enthalten.

## Internationalisierung (i18n)

- **Zentrales Dictionary:** `i18n.js` enthaelt `uiStrings` mit ~75 Eintraegen fuer alle geteilten UI-Texte.
- **t(key, ...args):** Uebersetzungsfunktion mit `{0}`-Platzhalter-Unterstuetzung. Liefert DE oder EN je nach `currentLang`.
- **data-i18n Attribute:** Statische HTML-Texte werden per `data-i18n="key"` und `data-i18n-placeholder="key"` markiert und beim Sprachwechsel automatisch aktualisiert.
- **langchange Event:** `CustomEvent('langchange')` wird bei Toggle ausgeloest. Modul-Scripts hoeren darauf und laden Fragen/Feedback neu.
- **Toggle-Button:** Wird per JS in `i18n.js` injiziert (`.lang-toggle`, feste Position rechts oben). Zeigt "EN" wenn aktuell DE, und "DE" wenn aktuell EN.
- **localStorage:** Sprachpraeferenz wird unter Key `'lang'` gespeichert (default: `'de'`).
- **Bilinguale Datenfelder:** Daten-Dateien haben `_en`-Varianten (z.B. `meaning_en[]`, `prompt_en`, `explanation_en`, `label_en`, `title_en`, `html_en`). Helfer-Funktionen in Modul-Scripts (z.B. `getMeaning()`, `getPrompt()`) waehlen je nach `currentLang`.
- **Globaler Level-Filter:** `getActiveLevels()` in `i18n.js` liefert aktuell aktive Levels (localStorage-Key `'levels'`, default `['A1']`). `CustomEvent('levelchange')` wird bei Toggle ausgeloest. Kanji-Trainer, Kanji-Liste und Kanji-Vokabular hoeren darauf. Toggle-Bar wird per JS injiziert (`.level-toggle-bar`, fixiert rechts oben unter dem Sprach-Toggle).

## Zeilengrenze

Dateien sollen **maximal 1000 Zeilen** haben. Falls eine Datei die Grenze ueberschreitet:
1. Logisch zusammenhaengende Abschnitte in eigene Datei auslagern (z.B. Daten vs. Logik)
2. Neue Datei im gleichen Ordner anlegen
3. **Diese CLAUDE.md sofort aktualisieren** (Dateistruktur + Beschreibung)

Aktueller Stand (alle unter 1000 Zeilen):
- `common.js`: ~88 Zeilen
- `i18n.js`: ~179 Zeilen
- `verb.js`: ~149 Zeilen
- `kana.js`: ~199 Zeilen
- `kanji-data.js`: ~175 Zeilen (reine Daten: A1=73, A2=35 — B1/B2 zu A2, mehrere zu A1 umgestuft, 円 neu hinzugefügt)
- `kanji.js`: ~316 Zeilen
- `kanji-list.js`: ~133 Zeilen
- `numbers-data.js`: ~305 Zeilen (reine Daten: Grundzahlen, Counter-Tabellen, Referenz — bilingual)
- `numbers.js`: ~295 Zeilen
- `training-data.js`: ~490 Zeilen (reine Daten: 9 Segmente Grammatik, Fragen, Referenz — bilingual; kanji_vocab-Segment entfernt)
- `training.js`: ~279 Zeilen
- `kanji-vocab-data.js`: ~128 Zeilen (reine Daten: ~55 Vokabeln, bilingual, kein level-Feld)
- `kanji-vocab.js`: ~270 Zeilen
- `training.html`: ~73 Zeilen (dynamisches Skelett)
- `numbers.html`: ~73 Zeilen (dynamisches Skelett)
- `kanji-list.html`: ~36 Zeilen (Karteikarten-Skelett)
- `kanji-vocab.html`: ~70 Zeilen (Vokabular-Trainer-Skelett)
- `common.css`: ~310 Zeilen (inkl. alle Shared Quiz-Elemente)
- `kana.css`: ~55 Zeilen (nur Kana-spezifisch)
- `verb.css`: ~45 Zeilen (nur Verb-spezifisch, inkl. vertikale Buttons-Ausnahme)
- `kanji.css`: ~95 Zeilen (nur Kanji-spezifisch)
- `kanji-list.css`: ~175 Zeilen (Flip-Card Styles)
- `training.css`: ~70 Zeilen (nur Training-spezifisch)
- `numbers.css`: ~57 Zeilen (nur Numbers-spezifisch)
- `kanji-vocab.css`: ~30 Zeilen (Wort-Display Override)

## Module im Detail

### Kana-Trainer (`kana.js` + `kana.html`)
- 6 Checkbox-Filter: hiraganaBasic, katakanaBasic, hiraganaDakuten, katakanaDakuten, hiraganaYoon, katakanaYoon
- Romaji-Varianten akzeptiert: Hepburn (shi) + Kunrei-shiki (si) + Yoon-Varianten (sha/sya)
- Bei Richtig: 800ms Delay, dann auto-naechstes Zeichen
- Enter-Taste = Pruefen
- **IDs (vereinheitlicht):** Texteingabe `#textInput` (war `romajiInput`), Filter-Button `#applyFilter` (war `applyFiltersButton`)

### Verb-Trainer (`verb.js` + `verb.html`)
- 15 Verben im ます-Form, je mit Lueckensatz + Uebersetzung (DE + EN)
- Toggle-Button oben: "Zufaellig" (rein random) / "Wiederholung" (Spaced Repetition)
- Semi-Random Algorithmus: 70% neue Fragen, 30% falsch beantwortete
- Moduswechsel resettet Score + Queues

### Kanji-Trainer (`kanji-data.js` + `kanji.js` + `kanji.html`)
- 108 Kanji in 2 Stufen: A1 (73), A2 (35)
- Datenstruktur: `{ kanji, meaning_de[], meaning_en[], on, kun, romaji, romaji_variants[], level }`
- 3 Quiz-Typen per Toggle: Kanji→Deutsch/English (MC+Text), Deutsch/English→Kanji (MC+Text), Kanji→Lesung (nur Text)
- Stufenfilter: **global** via Level-Toggle-Bar (rechts oben), kein lokaler Filter mehr
- Modi: "Zufaellig" / "Wiederholung" (gleicher 70/30 Algorithmus wie verb.js)
- Texteingabe: Enter = Pruefen, akzeptiert meaning_de + meaning_en-Varianten bzw. Romaji-Varianten
- Feedback zeigt: Kanji, Level-Badge, Bedeutungen, On/Kun-yomi, Romaji

### Kanji-Liste (`kanji-data.js` + `kanji-list.js` + `kanji-list.html`)
- Flip-Cards: Vorderseite zeigt Kanji, Rueckseite zeigt Bedeutung + On/Kun-Lesung + Romaji
- Gruppierung nach Level: A1, A2, B1, B2 mit Ueberschriften und Kanji-Anzahl
- Level-Filter: **global** via Level-Toggle-Bar, reagiert auf `levelchange`-Event
- Click zum Umdrehen (CSS 3D Transform, perspective)
- Responsive Grid: auto-fill minmax(100px, 1fr)
- i18n: Sprach-Toggle aktualisiert Bedeutungen + Level-Labels

### Zahlen & Zaehler (`numbers-data.js` + `numbers.js` + `numbers.html`)
- 13 Segmente: 3 Grundzahlen-Bereiche (1-10, 11-100, 100-10000) + 10 Counter (つ, 人, 本, 枚, 匹, 台, 冊, 杯, 個, 回)
- Checkbox-Filter fuer Segmentauswahl (Zahlen 1-10 default an), "Filter anwenden" resettet Quiz
- 4 Fragetypen, dynamisch generiert aus Daten-Tabellen:
  - `reading`: Kanji/Zahl → Lesung (Texteingabe, Kana oder Romaji)
  - `meaning`: Lesung → Zahl+Counter (MC)
  - `counter_choice`: Welcher Zaehler fuer X? (MC)
  - `combine`: N + Counter-Kanji = ? (Texteingabe)
- Datenstruktur Counter: `{ kanji, description, description_en, use_de, use_en, items[{n, reading, romaji}], examples[] }`
- Alle Lautverschiebungen (rendaku/Gemination) korrekt: z.B. さんぼん (3本), いっぴき (1匹)
- Modi: "Zufaellig" / "Wiederholung" (gleicher 70/30 Algorithmus)
- Ansicht-Toggle: "Ueben" (Quiz) / "Nachschlagen" (Counter-Tabellen als klappbare details/summary)
- Texteingabe: Enter = Pruefen, akzeptiert Kana + Romaji

### Grammatik-Trainer (`training-data.js` + `training.js` + `training.html`)
- 9 Themen-Segmente (Grammatik): Partikel, Existenzsatz, Positionen, Geben/Nehmen, Einkaufen, Verb-Vgh., い-Adj-Vgh., な-Adj-Vgh., Negation
- Checkbox-Filter fuer Segmentauswahl (Partikel default an), "Filter anwenden" resettet Quiz
- ~70 Fragen in 3 Typen: MC (Multiple Choice), Fill (Lueckentext), Translate (Uebersetzung)
- Datenstruktur: `{ segment, type, prompt, prompt_en?, prompt_jp?, correct[], choices?, choices_en?, correct_en?, explanation, explanation_en? }`
- Modi: "Zufaellig" / "Wiederholung" (gleicher 70/30 Algorithmus wie kanji.js/verb.js)
- Ansicht-Toggle: "Ueben" (Quiz) / "Nachschlagen" (Grammatik-Referenz als klappbare details/summary)
- Texteingabe: Enter = Pruefen, Feedback mit Erklaerung nach Antwort
- Loesungen erst nach Beantwortung sichtbar

### Kanji-Vokabular (`kanji-vocab-data.js` + `kanji-vocab.js` + `kanji-vocab.html`)
- ~55 zusammengesetzte Woerter (Kanji+Kanji, Kanji+Kana) relevant fuer A1/A2
- Datenstruktur: `{ word, reading, romaji, romaji_variants[], meaning_de[], meaning_en[] }` — **kein `level`-Feld**
- **Dynamischer Stufenfilter:** `computeVocabLevel(word)` berechnet Level zur Laufzeit aus `kanji-data.js`. Hoechster Level aller Kanji-Zeichen des Worts. Aendert sich automatisch wenn Kanji in `kanji-data.js` umgestuft werden.
- 3 Quiz-Typen per Toggle: Wort→Deutsch/English (MC+Text), Deutsch/English→Wort (MC+Text), Wort→Lesung (nur Text)
- Stufenfilter: **global** via Level-Toggle-Bar, reagiert auf `levelchange`-Event
- Modi: "Zufaellig" / "Wiederholung" (gleicher 70/30 Algorithmus)
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
- **Shared Quiz-Elemente** in `common.css`: `.next-btn` (gruen), `.mode-toggle` (Pill, max 350px), `.view-toggle` (Pill), `.choices-area` + `.choice-button` (18px, horizontal wrap, inkl. `:disabled`/`.correct-choice`/`.wrong-choice`), `.input-area` (max 300px), `.level-filters`, `.segment-filters`, `.ref-block`/`.ref-body`, `.ref-table`
- **Globaler Level-Toggle** in `common.css`: `.level-toggle-bar` (fixiert, rechts oben unter Sprach-Toggle), `.level-toggle-btn` / `.level-toggle-btn.active`
- **Ausnahme Verb-Trainer:** `.verb-trainer .choices-area` erzwingt vertikales Layout (Saetze als Antworten koennen lang sein)
- **Body-Klassen** auf allen Modul-Seiten: `.kana`, `.verb`, `.kanji`, `.kanji-vocab`, `.kanji-list`, `.training`, `.numbers` — als CSS-Scope-Anker fuer modul-spezifische Overrides

## Quick Answer (Schnell-Modus)

- **Zuschaltbar** per Toggle-Button auf jeder Quiz-Seite (⚡ Schnell / ⚡ Normal)
- **localStorage:** Einstellung unter Key `'quickAnswer'` gespeichert (default: `false`)
- **Bei richtig + aktiv:** 400ms gruener Feedback-Flash, dann automatisch naechste Frage. Texteingabe sofort fokussiert.
- **Bei falsch:** Normales Verhalten (Feedback lesen, "Naechste Frage" klicken)
- **Zentrale Logik** in `common.js`: `quickAnswerEnabled`, `isQuickAnswer()`, `toggleQuickAnswer()`, `injectQuickAnswerButton(container)`
- **quickanswerchange Event:** `CustomEvent('quickanswerchange')` wird bei Toggle ausgeloest. Button-Text aktualisiert sich automatisch.
- **Alle 6 Module** nutzen Quick Answer: kana.js (verkuerzt 800→400ms), kanji.js, verb.js, training.js, numbers.js, kanji-vocab.js
