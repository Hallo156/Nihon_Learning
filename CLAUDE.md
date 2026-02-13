# Japanisch Lernprogramm

Erstellt von **Hi156** unter Verwendung von **Claude** (Anthropic).

Interaktive Web-App zum Japanisch lernen. Deutsche und englische UI, Vanilla JS, kein Build-System. Gehostet auf GitHub — laeuft auch lokal via `file://` ohne Server.

## Dateistruktur

```
index.html                 Hauptmenue (5 Karten → Module)
css/
  common.css               Shared: Body, Container, Feedback, Buttons, Score, Nav-Back, Lang-Toggle
  index.css                Karten-Grid fuers Hauptmenue
  kana.css                 Kana-Display (100px), Filter-Panel, Input-Bereich
  kanji.css                Kanji-Display (120px), Quiz-Type-Toggle, Level-Filter, Choices/Input
  numbers.css              Zahlen-Display (64px), Counter-Tabellen, View/Mode-Toggle, MC-Buttons
  training.css             View-Toggle, Segment-Filter, Quiz-Display, MC-Buttons, Referenz-Panel
  verb.css                 Fragen-Bereich, Choice-Buttons, Mode-Toggle
js/
  common.js                Shared: shuffleArray(), ScoreTracker, showFeedback(), clearFeedback(), Quick Answer
  i18n.js                  Internationalisierung: Sprach-Toggle DE/EN, UI-String Dictionary, t() Funktion
  kana.js                  Kana-Daten (6 Kategorien, ~230 Zeichen) + Quiz-Logik + Romaji-Varianten
  kanji-data.js            Kanji-Daten nach Stufen: A1 (30), A2 (40), B1 (15), B2 (15) = 100 Kanji
  kanji.js                 Kanji-Quiz: 3 Typen, Stufenfilter, Spaced Repetition (70/30)
  numbers-data.js          Zahlen-Daten: Grundzahlen (1-10000), 10 Counter-Tabellen, Referenz-HTML
  numbers.js               Zahlen-Quiz: 4 Fragetypen, dynamische Generierung, Segment-Filter, Spaced Repetition
  training-data.js         Trainingsdaten: 10 Segmente, ~70 Fragen (MC/Fill/Translate), Referenz-Inhalte
  training.js              Dynamischer Quiz-Motor: Segment-Filter, Spaced Repetition (70/30), Ansicht-Toggle
  verb.js                  15 Verb-Daten + Quiz-Logik + Toggle Random/Semi-Random (Spaced Repetition 70/30)
pages/
  kana.html                Kana-Trainer (Checkbox-Filter, Romaji-Eingabe, Score)
  kanji.html               Kanji-Trainer (3 Quiz-Typen, Stufenfilter, MC + Texteingabe, Score)
  numbers.html             Zahlen & Zaehler Trainer (4 Quiz-Typen, 13 Segmente, Nachschlagen)
  training.html            Vokabular & Grammatik Trainer (dynamisches Quiz + Nachschlagen-Ansicht)
  verb.html                Verb-Trainer (Satzluecken, Multiple-Choice, Mode-Toggle)
```

## Architektur-Regeln

- **Alle JS-Dateien erwarten common.js als erstes Script.** Reihenfolge: `<script src="../js/common.js">` → `<script src="../js/i18n.js">` → ggf. Daten-Script → `<script src="../js/[modul].js">`
- **kanji.js braucht kanji-data.js.** Reihenfolge: common.js → i18n.js → kanji-data.js → kanji.js
- **training.js braucht training-data.js.** Reihenfolge: common.js → i18n.js → training-data.js → training.js
- **numbers.js braucht numbers-data.js.** Reihenfolge: common.js → i18n.js → numbers-data.js → numbers.js
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

## Zeilengrenze

Dateien sollen **maximal 1000 Zeilen** haben. Falls eine Datei die Grenze ueberschreitet:
1. Logisch zusammenhaengende Abschnitte in eigene Datei auslagern (z.B. Daten vs. Logik)
2. Neue Datei im gleichen Ordner anlegen
3. **Diese CLAUDE.md sofort aktualisieren** (Dateistruktur + Beschreibung)

Aktueller Stand (alle unter 1000 Zeilen):
- `common.js`: ~88 Zeilen
- `i18n.js`: ~152 Zeilen
- `verb.js`: ~149 Zeilen
- `kana.js`: ~192 Zeilen
- `kanji-data.js`: ~153 Zeilen (reine Daten, ausgelagert wegen Groesse)
- `kanji.js`: ~303 Zeilen
- `numbers-data.js`: ~305 Zeilen (reine Daten: Grundzahlen, Counter-Tabellen, Referenz — bilingual)
- `numbers.js`: ~295 Zeilen
- `training-data.js`: ~527 Zeilen (reine Daten: Segmente, Fragen, Referenz — bilingual)
- `training.js`: ~279 Zeilen
- `training.html`: ~73 Zeilen (dynamisches Skelett)
- `numbers.html`: ~73 Zeilen (dynamisches Skelett)

## Module im Detail

### Kana-Trainer (`kana.js` + `kana.html`)
- 6 Checkbox-Filter: hiraganaBasic, katakanaBasic, hiraganaDakuten, katakanaDakuten, hiraganaYoon, katakanaYoon
- Romaji-Varianten akzeptiert: Hepburn (shi) + Kunrei-shiki (si) + Yoon-Varianten (sha/sya)
- Bei Richtig: 800ms Delay, dann auto-naechstes Zeichen
- Enter-Taste = Pruefen

### Verb-Trainer (`verb.js` + `verb.html`)
- 15 Verben im ます-Form, je mit Lueckensatz + Uebersetzung (DE + EN)
- Toggle-Button oben: "Zufaellig" (rein random) / "Wiederholung" (Spaced Repetition)
- Semi-Random Algorithmus: 70% neue Fragen, 30% falsch beantwortete
- Moduswechsel resettet Score + Queues

### Kanji-Trainer (`kanji-data.js` + `kanji.js` + `kanji.html`)
- 100 Kanji in 4 Stufen: A1 (30), A2 (40), B1 (15 Starter), B2 (15 Starter)
- Datenstruktur: `{ kanji, meaning_de[], meaning_en[], on, kun, romaji, romaji_variants[], level }`
- 3 Quiz-Typen per Toggle: Kanji→Deutsch/English (MC+Text), Deutsch/English→Kanji (MC+Text), Kanji→Lesung (nur Text)
- Stufenfilter: 4 Checkboxen (A1 default an), "Filter anwenden" resettet Quiz
- Modi: "Zufaellig" / "Wiederholung" (gleicher 70/30 Algorithmus wie verb.js)
- Texteingabe: Enter = Pruefen, akzeptiert meaning_de + meaning_en-Varianten bzw. Romaji-Varianten
- Feedback zeigt: Kanji, Level-Badge, Bedeutungen, On/Kun-yomi, Romaji

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

### Vokabular & Grammatik (`training-data.js` + `training.js` + `training.html`)
- 10 Themen-Segmente: Partikel, Existenzsatz, Positionen, Geben/Nehmen, Einkaufen, Verb-Vgh., い-Adj-Vgh., な-Adj-Vgh., Negation, Kanji-Vokabular
- Checkbox-Filter fuer Segmentauswahl (Partikel default an), "Filter anwenden" resettet Quiz
- ~70 Fragen in 3 Typen: MC (Multiple Choice), Fill (Lueckentext), Translate (Uebersetzung)
- Datenstruktur: `{ segment, type, prompt, prompt_en?, prompt_jp?, correct[], choices?, choices_en?, correct_en?, explanation, explanation_en? }`
- Modi: "Zufaellig" / "Wiederholung" (gleicher 70/30 Algorithmus wie kanji.js/verb.js)
- Ansicht-Toggle: "Ueben" (Quiz) / "Nachschlagen" (Grammatik-Referenz als klappbare details/summary)
- Texteingabe: Enter = Pruefen, Feedback mit Erklaerung nach Antwort
- Loesungen erst nach Beantwortung sichtbar

## CSS-Design-System

- Hintergrund: `#f0f2f5`, Container: weiss mit Shadow
- Primaerfarbe: `#007bff` (Buttons, Links, Headings)
- Feedback: Gruen `#e8f5e9`/`#2e7d32` (richtig), Rot `#ffebee`/`#c62828` (falsch)
- Alle Module nutzen `.feedback.correct` / `.feedback.incorrect` aus common.css
- Sprach-Toggle: `.lang-toggle` (fixiert, rechts oben, blaue Pill-Form)
- Quick Answer Toggle: `.quick-answer-toggle` (Pill-Form, grau=aus, orange=an)

## Quick Answer (Schnell-Modus)

- **Zuschaltbar** per Toggle-Button auf jeder Quiz-Seite (⚡ Schnell / ⚡ Normal)
- **localStorage:** Einstellung unter Key `'quickAnswer'` gespeichert (default: `false`)
- **Bei richtig + aktiv:** 400ms gruener Feedback-Flash, dann automatisch naechste Frage. Texteingabe sofort fokussiert.
- **Bei falsch:** Normales Verhalten (Feedback lesen, "Naechste Frage" klicken)
- **Zentrale Logik** in `common.js`: `quickAnswerEnabled`, `isQuickAnswer()`, `toggleQuickAnswer()`, `injectQuickAnswerButton(container)`
- **quickanswerchange Event:** `CustomEvent('quickanswerchange')` wird bei Toggle ausgeloest. Button-Text aktualisiert sich automatisch.
- **Alle 5 Module** nutzen Quick Answer: kana.js (verkuerzt 800→400ms), kanji.js, verb.js, training.js, numbers.js
