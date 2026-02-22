/* Japanisch Lernprogramm — Erstellt von Hi156 unter Verwendung von Claude (Anthropic) */

/* i18n.js — Internationalisierung: Sprach-Toggle DE/EN, UI-String Dictionary, t() Funktion.
   Geladen nach common.js, vor allen Modul-Scripts. */

/* ============ SPRACH-STATE ============ */

let currentLang = localStorage.getItem('lang') || 'de';

/* ============ UI-STRING DICTIONARY ============ */

const uiStrings = {
    // --- Geteilt (alle Seiten) ---
    'nav.back':         { de: '\u2190 Zurück zum Menü',    en: '\u2190 Back to Menu' },
    'score.correct':    { de: 'Richtig',                    en: 'Correct' },
    'score.incorrect':  { de: 'Falsch',                     en: 'Wrong' },
    'btn.check':        { de: 'Prüfen',                     en: 'Check' },
    'btn.next':         { de: 'Nächste Frage',              en: 'Next Question' },
    'btn.applyFilter':  { de: 'Filter anwenden',            en: 'Apply Filter' },
    'btn.random':       { de: 'Zufällig',                   en: 'Random' },
    'btn.spaced':       { de: 'Wiederholung',               en: 'Spaced Repetition' },
    'feedback.correct': { de: 'Richtig!',                   en: 'Correct!' },
    'feedback.wrong':   { de: 'Falsch.',                    en: 'Wrong.' },
    'feedback.correctIs': { de: 'Richtig ist:',             en: 'Correct answer:' },
    'input.answer':     { de: 'Antwort eingeben...',        en: 'Enter answer...' },
    'btn.quickOn':      { de: '⚡ Schnell',                 en: '⚡ Quick' },
    'btn.quickOff':     { de: '⚡ Normal',                  en: '⚡ Normal' },
    'vis.romaji':       { de: 'Romaji',                     en: 'Romaji' },
    'vis.translation':  { de: 'Übersetzung',                en: 'Translation' },

    // --- Sidebar (Nachschlagen) ---
    'sidebar.title':    { de: 'Nachschlagen',                en: 'Reference' },
    'sidebar.toggle':   { de: 'Nachschlagen',                en: 'Reference' },
    'sidebar.close':    { de: 'Schließen',                   en: 'Close' },

    // --- index.html ---
    'index.title':      { de: 'Japanisch Lernen',          en: 'Learn Japanese' },
    'index.subtitle':   { de: 'Wähle ein Lernmodul aus:',  en: 'Choose a learning module:' },
    'index.group.scripts':  { de: 'Schriftzeichen',        en: 'Writing Systems' },
    'index.group.grammar':  { de: 'Grammatik',             en: 'Grammar' },
    'index.group.numbers':  { de: 'Zahlen & Vokabular',   en: 'Numbers & Vocabulary' },
    'index.kana.title': { de: 'Kana-Trainer',               en: 'Kana Trainer' },
    'index.kana.desc':  { de: 'Hiragana und Katakana lesen und erkennen lernen. Mit Filtern für Basis, Dakuten und Yoon.', en: 'Learn to read and recognize Hiragana and Katakana. With filters for basic, Dakuten and Yoon.' },
    'index.training.title': { de: 'Grammatik-Trainer',     en: 'Grammar Trainer' },
    'index.training.desc':  { de: 'Grammatikübungen zu Partikeln, Verben, Adjektiven und Satzstrukturen.', en: 'Grammar exercises on particles, verbs, adjectives and sentence structures.' },
    'index.verb.title': { de: 'Verb-Trainer',              en: 'Verb Trainer' },
    'index.verb.desc':  { de: 'Sätze mit dem passenden Verb vervollständigen.', en: 'Complete sentences with the correct verb.' },
    'index.kanji.title': { de: 'Kanji-Trainer',            en: 'Kanji Trainer' },
    'index.kanji.desc': { de: 'Kanji lesen, verstehen und übersetzen. Verschiedene Fragetypen und Quizmodi.', en: 'Read, understand and translate Kanji. Multiple question types and quiz modes.' },

    'index.credits':    { de: 'Erstellt von Hi156 unter Verwendung von Claude (Anthropic)', en: 'Created by Hi156 using Claude (Anthropic)' },

    // --- kana.html ---
    'kana.title':       { de: 'Interaktiver Kana Trainer',  en: 'Interactive Kana Trainer' },
    'kana.filterHead':  { de: 'Wähle die Kana-Typen zum Üben:', en: 'Choose kana types to practice:' },
    'kana.hiraBasic':   { de: 'Hiragana (Basis)',           en: 'Hiragana (Basic)' },
    'kana.kataBasic':   { de: 'Katakana (Basis)',           en: 'Katakana (Basic)' },
    'kana.hiraDakuten': { de: 'Hiragana (Dakuten/Handakuten)', en: 'Hiragana (Dakuten/Handakuten)' },
    'kana.kataDakuten': { de: 'Katakana (Dakuten/Handakuten)', en: 'Katakana (Dakuten/Handakuten)' },
    'kana.hiraYoon':    { de: 'Hiragana (Yoon)',            en: 'Hiragana (Yoon)' },
    'kana.kataYoon':    { de: 'Katakana (Yoon)',            en: 'Katakana (Yoon)' },
    'kana.applyBtn':    { de: 'Filter anwenden & Neu starten', en: 'Apply Filter & Restart' },
    'kana.placeholder': { de: 'Romaji eingeben',            en: 'Enter romaji' },
    'kana.nextChar':    { de: 'Nächstes Zeichen',           en: 'Next Character' },
    'kana.stats':       { de: 'Aktuell {0} Zeichen ausgewählt.', en: 'Currently {0} characters selected.' },
    'kana.noSelection': { de: 'Bitte einen Kana-Typ auswählen!', en: 'Please select a kana type!' },
    'kana.noFilter':    { de: 'Bitte zuerst Filter anwenden oder nächstes Zeichen laden.', en: 'Please apply filter or load next character first.' },
    'kana.wrong':       { de: 'Falsch. Richtig ist: {0}',  en: 'Wrong. Correct answer: {0}' },

    // --- kanji.html ---
    'kanji.title':      { de: 'Kanji-Trainer',             en: 'Kanji Trainer' },
    'kanji.typeKanjiDe': { de: 'Kanji → Deutsch',          en: 'Kanji → English' },
    'kanji.typeDeKanji': { de: 'Deutsch → Kanji',          en: 'English → Kanji' },
    'kanji.typeReading': { de: 'Kanji → Lesung',           en: 'Kanji → Reading' },
    'kanji.phMeaning':  { de: 'Bedeutung auf Deutsch...',  en: 'Meaning in English...' },
    'kanji.phKanji':    { de: 'Kanji eingeben...',          en: 'Enter kanji...' },
    'kanji.phReading':  { de: 'Lesung (Romaji)...',        en: 'Reading (Romaji)...' },
    'kanji.meaning':    { de: 'Bedeutung',                  en: 'Meaning' },

    // --- verb.html ---
    'verb.title':       { de: 'Japanischer Verb-Trainer',  en: 'Japanese Verb Trainer' },
    'verb.instruction': { de: 'Vervollständige den Satz mit dem passenden Verb:', en: 'Complete the sentence with the correct verb:' },
    'verb.correctVerb': { de: 'Richtig! Das Verb ist "{0}".', en: 'Correct! The verb is "{0}".' },
    'verb.wrongSel':    { de: 'Falsch. Ausgewählt: "{0}".', en: 'Wrong. Selected: "{0}".' },
    'verb.correctAns':  { de: 'Die richtige Antwort ist: "{0}".', en: 'The correct answer is: "{0}".' },
    'verb.fullSentence': { de: 'Vollständiger Satz',       en: 'Full sentence' },
    'verb.meaningLabel': { de: 'Bedeutung',                 en: 'Meaning' },

    // --- training.html ---
    'training.title':   { de: 'Grammatik-Trainer',          en: 'Grammar Trainer' },
    'training.viewQuiz': { de: 'Üben',                      en: 'Practice' },
    'training.viewRef': { de: 'Nachschlagen',               en: 'Reference' },
    'training.correctIs': { de: 'Richtig:',                 en: 'Correct:' },

    // --- numbers.html ---
    'numbers.title':        { de: 'Zahlen & Zähler',                     en: 'Numbers & Counters' },
    'numbers.viewQuiz':     { de: 'Üben',                                en: 'Practice' },
    'numbers.viewRef':      { de: 'Nachschlagen',                        en: 'Reference' },
    'numbers.howRead':      { de: 'Wie liest man {0}?',                  en: 'How do you read {0}?' },
    'numbers.howSay':       { de: 'Wie sagt man {0} {1}?',              en: 'How do you say {0} {1}?' },
    'numbers.whatMeans':    { de: 'Was bedeutet {0}?',                   en: 'What does {0} mean?' },
    'numbers.whichCounter': { de: 'Welchen Zähler benutzt man für {0}?', en: 'Which counter is used for {0}?' },
    'numbers.combine':      { de: '{0} + {1} = ?',                      en: '{0} + {1} = ?' },
    'numbers.counterIs':    { de: 'Der Zähler für {0} ist {1}.',        en: 'The counter for {0} is {1}.' },
    'numbers.readingIs':    { de: 'Die Lesung ist: {0} ({1})',          en: 'The reading is: {0} ({1})' },
    'index.numbers.title':  { de: 'Zahlen & Zähler',                    en: 'Numbers & Counters' },
    'index.numbers.desc':   { de: 'Japanische Zahlen und Zählwörter (助数詞) lernen. Mit 10 Countern und Lautverschiebungen.', en: 'Learn Japanese numbers and counters (助数詞). With 10 counters and sound changes.' },

    // --- kanji-list.html ---
    'index.kanjiList.title': { de: 'Kanji-Liste',                      en: 'Kanji List' },
    'index.kanjiList.desc':  { de: 'Alle Kanji als Karteikarten nach Stufe sortiert. Zum Umdrehen klicken.', en: 'All Kanji as flashcards sorted by level. Click to flip.' },
    'kanjiList.title':      { de: 'Kanji-Liste',                       en: 'Kanji List' },
    'kanjiList.subtitle':   { de: 'Klicke auf eine Karte, um sie umzudrehen.', en: 'Click a card to flip it.' },
    'kanjiList.noKanji':    { de: 'Keine Kanji für die ausgewählten Stufen.', en: 'No Kanji for the selected levels.' },
    'kanjiList.cat.zahlen':          { de: 'Zahlen',                    en: 'Numbers' },
    'kanjiList.cat.wochentage':      { de: 'Wochentage',               en: 'Days of the Week' },
    'kanjiList.cat.zeit':            { de: 'Zeit',                      en: 'Time' },
    'kanjiList.cat.kompass':         { de: 'Kompass & Richtungen',      en: 'Compass & Directions' },
    'kanjiList.cat.grundbegriffe':   { de: 'Grundbegriffe',             en: 'Basic Concepts' },
    'kanjiList.cat.verben':          { de: 'Verben & Tätigkeiten',      en: 'Verbs & Actions' },
    'kanjiList.cat.adjektive':       { de: 'Adjektive',                 en: 'Adjectives' },
    'kanjiList.cat.essen':           { de: 'Essen',                     en: 'Food' },
    'kanjiList.cat.familie':         { de: 'Familie',                   en: 'Family' },
    'kanjiList.cat.schule':          { de: 'Schule & Bildung',          en: 'School & Education' },
    'kanjiList.cat.gesellschaft':    { de: 'Land & Gesellschaft',       en: 'Country & Society' },
    'kanjiList.cat.aktionen':        { de: 'Aktionen',                  en: 'Actions' },
    'kanjiList.cat.koerper':         { de: 'Körper',                    en: 'Body' },
    'kanjiList.cat.weiteres':        { de: 'Weiteres',                  en: 'Miscellaneous' },
    'kanjiList.cat.konzepte':        { de: 'Konzepte & Adjektive',      en: 'Concepts & Adjectives' },
    'kanjiList.cat.fortgeschritten': { de: 'Fortgeschrittene Konzepte', en: 'Advanced Concepts' },

    // --- kanji-vocab.html ---
    'index.kanjiVocab.title': { de: 'Kanji-Vokabular',                en: 'Kanji Vocabulary' },
    'index.kanjiVocab.desc':  { de: 'Zusammengesetzte Wörter mit Kanji aus dem Datensatz üben.', en: 'Practice compound words using Kanji from the dataset.' },
    'kanjiVocab.title':       { de: 'Kanji-Vokabular',                en: 'Kanji Vocabulary' },
    'kanjiVocab.typeWordDe':  { de: 'Wort → Deutsch',                 en: 'Word → English' },
    'kanjiVocab.typeDeWord':  { de: 'Deutsch → Wort',                 en: 'English → Word' },
    'kanjiVocab.typeWordReading': { de: 'Wort → Lesung',              en: 'Word → Reading' },
    'kanjiVocab.phMeaning':   { de: 'Bedeutung eingeben...',          en: 'Enter meaning...' },
    'kanjiVocab.phWord':      { de: 'Wort eingeben (Kanji/Kana/Romaji)...', en: 'Enter word (Kanji/Kana/Romaji)...' },
    'kanjiVocab.phReading':   { de: 'Lesung (Kana/Romaji)...',        en: 'Reading (Kana/Romaji)...' },
    'kanjiVocab.meaning':     { de: 'Bedeutung',                      en: 'Meaning' },
    'kanjiVocab.reading':     { de: 'Lesung',                         en: 'Reading' },
    'kanjiVocab.noVocab':     { de: 'Keine Vokabeln für die ausgewählten Stufen.', en: 'No vocabulary for the selected levels.' },

    // --- giving.html (Geben & Nehmen) ---
    'giving.title':           { de: 'Geben & Nehmen',       en: 'Giving & Receiving' },
    'index.giving.title':     { de: 'Geben & Nehmen',       en: 'Giving & Receiving' },
    'index.giving.desc':      { de: 'Dialoge zu あげる・もらう・くれる mit Freunden und Familie. Mit Romaji-Anzeige.', en: 'Dialogues on あげる・もらう・くれる with friends and family. Includes Romaji display.' },

    // --- simulation.html ---
    'index.simulation.title': { de: 'Einkaufs-Simulation',  en: 'Shopping Simulation' },
    'index.simulation.desc':  { de: 'Dialoge beim Einkaufen: Kleidung, Essen und Möbel. Lücken per Multiple Choice oder gemischt ausfüllen.', en: 'Shopping dialogues: clothes, food and furniture. Fill in the gaps by multiple choice or mixed mode.' },
    'index.group.simulation': { de: 'Simulation',           en: 'Simulation' },
    'sim.title':              { de: 'Einkaufs-Simulation',  en: 'Shopping Simulation' },
    'sim.inputMC':            { de: 'Multiple Choice',      en: 'Multiple Choice' },
    'sim.inputText':          { de: 'Gemischt',              en: 'Mixed' },
    'sim.speaker.staff':      { de: 'Verkäufer',            en: 'Staff' },
    'sim.speaker.customer':   { de: 'Kunde',                en: 'Customer' },
    'sim.nextBlank':          { de: 'Nächste Lücke',        en: 'Next Gap' },
    'sim.noScene':            { de: 'Bitte eine Szene auswählen.', en: 'Please select a scene.' },
    'sim.visual.you':         { de: 'Du',                   en: 'You' },

    // --- location-obj.html (Gegenstand-Position) ---
    'index.locObj.title':        { de: 'Gegenstand-Position',    en: 'Object Position' },
    'index.locObj.desc':         { de: 'Beschreibe, wo der Ball liegt, oder klicke auf die richtige Stelle im Bild.', en: 'Describe where the ball is, or click the correct location in the scene.' },
    'locObj.title':              { de: 'Gegenstand-Position',    en: 'Object Position' },
    'locObj.typeBeschreiben':    { de: 'Beschreiben',            en: 'Describe' },
    'locObj.typeZeigen':         { de: 'Zeigen',                 en: 'Point' },
    'locObj.promptBeschreiben':  { de: 'Wo ist der Ball?',       en: 'Where is the ball?' },
    'locObj.promptZeigen':       { de: 'Klicke auf die richtige Stelle:', en: 'Click the correct location:' },
    'locObj.clickInstruction':   { de: 'Klicke auf die Stelle, die die japanische Phrase beschreibt.', en: 'Click the location described by the Japanese phrase.' },
    'locObj.toggleRomaji':       { de: 'Romaji',                  en: 'Romaji' },
    'locObj.toggleTranslation':  { de: 'Übersetzung',             en: 'Translation' },

    // --- location-map.html (Stadtkarte) ---
    'index.locMap.title':        { de: 'Stadtkarte',             en: 'City Map' },
    'index.locMap.desc':         { de: 'Navigiere durch die Stadt oder beschreibe die Position von Gebäuden.', en: 'Navigate through the city or describe the position of buildings.' },
    'locMap.title':              { de: 'Stadtkarte',             en: 'City Map' },
    'locMap.typeNav':            { de: 'Navigation',             en: 'Navigation' },
    'locMap.typeDesc':           { de: 'Beschreiben',            en: 'Describe' },
    'locMap.navPrompt':          { de: 'Gehe von {0} zur {1}',  en: 'Go from {0} to {1}' },
    'locMap.stepOf':             { de: 'Schritt {0} von {1}',   en: 'Step {0} of {1}' },
    'locMap.wrongDir':           { de: 'Falsche Richtung!',      en: 'Wrong direction!' },
    'locMap.navSuccess':         { de: 'Ziel erreicht!',         en: 'Destination reached!' },
    'locMap.correctSeq':         { de: 'Richtige Reihenfolge: {0}', en: 'Correct sequence: {0}' },
    'locMap.dir.migi':           { de: 'rechts',                      en: 'right' },
    'locMap.dir.hidari':         { de: 'links',                       en: 'left' },
    'locMap.dir.massugu':        { de: 'geradeaus',                   en: 'straight' },
    'locMap.dir.modoru':         { de: 'zurück',                      en: 'back' },
    'locMap.finalize':           { de: 'Hier bin ich!',               en: "I'm here!" },
    'locMap.tooManySteps':       { de: 'Zu viele Schritte! (max. 6)', en: 'Too many steps! (max. 6)' },
    'locMap.stepLog':            { de: 'Schritte:',                   en: 'Steps:' },
    'locMap.outOfBounds':        { de: 'Karte verlassen — nicht möglich!', en: 'Out of bounds — not possible!' },
    'locMap.toggleRomaji':       { de: 'Romaji',                          en: 'Romaji' },
    'locMap.toggleTranslation':  { de: 'Übersetzung',                     en: 'Translation' },

    // --- transport.html (Verkehr & Fortbewegung) ---
    'index.transport.title': { de: 'Verkehr & Fortbewegung',  en: 'Transport & Travel' },
    'index.transport.desc':  { de: 'Reisewege Schritt für Schritt nachvollziehen: Zug, U-Bahn, Bus, Taxi, Auto, Fahrrad und zu Fuß.', en: 'Trace journeys step by step: train, subway, bus, taxi, car, bicycle and on foot.' },
    'transport.title':       { de: 'Verkehr & Fortbewegung',  en: 'Transport & Travel' },
    'transport.inputMC':     { de: 'Multiple Choice',          en: 'Multiple Choice' },
    'transport.inputText':   { de: 'Texteingabe',              en: 'Text Input' },
    'transport.toggleRomaji':       { de: 'Romaji',            en: 'Romaji' },
    'transport.toggleTranslation':  { de: 'Übersetzung',       en: 'Translation' },
    'transport.noRoute':     { de: 'Bitte eine Schwierigkeit auswählen.', en: 'Please select a difficulty.' }
};

/* ============ UEBERSETZUNGSFUNKTION ============ */

function t(key, ...args) {
    const entry = uiStrings[key];
    if (!entry) return key;
    let str = entry[currentLang] || entry['de'];
    args.forEach((arg, i) => {
        str = str.replace('{' + i + '}', arg);
    });
    return str;
}

/* ============ HTML STATISCHEN TEXT SWAPPEN ============ */

function applyLanguageToHTML() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
    });
    document.documentElement.lang = currentLang;
    const titleEl = document.querySelector('title[data-i18n]');
    if (titleEl) document.title = t(titleEl.getAttribute('data-i18n'));

    const toggleBtn = document.getElementById('langToggle');
    if (toggleBtn) toggleBtn.textContent = currentLang === 'de' ? 'EN' : 'DE';
}

/* ============ SPRACH-TOGGLE ============ */

function toggleLanguage() {
    currentLang = currentLang === 'de' ? 'en' : 'de';
    localStorage.setItem('lang', currentLang);
    applyLanguageToHTML();
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: currentLang } }));
}

/* ============ TOGGLE-BUTTON EINFUEGEN ============ */

function injectLangToggle() {
    const btn = document.createElement('button');
    btn.id = 'langToggle';
    btn.className = 'lang-toggle';
    btn.textContent = currentLang === 'de' ? 'EN' : 'DE';
    btn.addEventListener('click', toggleLanguage);
    document.body.appendChild(btn);
}

/* ============ INIT ============ */

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        injectLangToggle();
        applyLanguageToHTML();
        injectLevelToggle();
    });
} else {
    injectLangToggle();
    applyLanguageToHTML();
    injectLevelToggle();
}

/* ============ GLOBALER LEVEL-FILTER ============ */

const AVAILABLE_LEVELS = ['A1', 'A2', 'B1', 'B2'];
let activeLevels = JSON.parse(localStorage.getItem('levels') || '["A1"]');

function getActiveLevels() { return activeLevels; }

function toggleLevel(level) {
    if (activeLevels.includes(level)) {
        if (activeLevels.length === 1) return; // mindestens 1 aktiv
        activeLevels = activeLevels.filter(l => l !== level);
    } else {
        activeLevels = [...activeLevels, level];
    }
    localStorage.setItem('levels', JSON.stringify(activeLevels));
    updateLevelToggleUI();
    document.dispatchEvent(new CustomEvent('levelchange', { detail: { levels: activeLevels } }));
}

function updateLevelToggleUI() {
    AVAILABLE_LEVELS.forEach(level => {
        const btn = document.getElementById('levelToggle_' + level);
        if (btn) btn.classList.toggle('active', activeLevels.includes(level));
    });
}

function injectLevelToggle() {
    const wrapper = document.createElement('div');
    wrapper.id = 'levelToggleBar';
    wrapper.className = 'level-toggle-bar';
    AVAILABLE_LEVELS.forEach(level => {
        const btn = document.createElement('button');
        btn.id = 'levelToggle_' + level;
        btn.className = 'level-toggle-btn' + (activeLevels.includes(level) ? ' active' : '');
        btn.textContent = level;
        btn.addEventListener('click', () => toggleLevel(level));
        wrapper.appendChild(btn);
    });
    document.body.appendChild(wrapper);
}
