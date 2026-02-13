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

    // --- index.html ---
    'index.title':      { de: 'Japanisch Lernen',          en: 'Learn Japanese' },
    'index.subtitle':   { de: 'Wähle ein Lernmodul aus:',  en: 'Choose a learning module:' },
    'index.kana.title': { de: 'Kana Trainer',               en: 'Kana Trainer' },
    'index.kana.desc':  { de: 'Hiragana und Katakana lesen und erkennen lernen. Mit Filtern für Basis, Dakuten und Yoon.', en: 'Learn to read and recognize Hiragana and Katakana. With filters for basic, Dakuten and Yoon.' },
    'index.training.title': { de: 'Vokabular & Grammatik', en: 'Vocabulary & Grammar' },
    'index.training.desc':  { de: 'Vokabeln, Kanji und Grammatikübungen zu Verben, Adjektiven und Satzstrukturen.', en: 'Vocabulary, Kanji and grammar exercises on verbs, adjectives and sentence structures.' },
    'index.verb.title': { de: 'Verb-Trainer',              en: 'Verb Trainer' },
    'index.verb.desc':  { de: 'Sätze mit dem passenden Verb vervollständigen. Mit Zufalls- und Wiederholungsmodus.', en: 'Complete sentences with the correct verb. With random and spaced repetition modes.' },
    'index.kanji.title': { de: 'Kanji-Trainer',            en: 'Kanji Trainer' },
    'index.kanji.desc': { de: 'Kanji lesen, verstehen und übersetzen. Mit Stufenfilter (A1–B2) und Wiederholungsmodus.', en: 'Read, understand and translate Kanji. With level filter (A1–B2) and spaced repetition mode.' },

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
    'training.title':   { de: 'Vokabular & Grammatik',     en: 'Vocabulary & Grammar' },
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
    'index.numbers.desc':   { de: 'Japanische Zahlen und Zählwörter (助数詞) lernen. Mit 10 Countern und Lautverschiebungen.', en: 'Learn Japanese numbers and counters (助数詞). With 10 counters and sound changes.' }
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
    });
} else {
    injectLangToggle();
    applyLanguageToHTML();
}
