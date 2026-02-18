/* Japanisch Lernprogramm — Erstellt von Hi156 unter Verwendung von Claude (Anthropic) */

/* kanji-vocab.js — Kanji-Vokabular-Quiz: 3 Typen, dynamischer Stufenfilter, Spaced Repetition.
   Braucht: common.js, i18n.js, kanji-data.js, kanji-vocab-data.js */

/* ============ HELFER: Sprach-abhängige Felder ============ */

function getMeaning(v) {
    return currentLang === 'en' && v.meaning_en ? v.meaning_en : v.meaning_de;
}

/* ============ DYNAMISCHER LEVEL-RECHNER ============ */

/* Erstellt beim Start eine Lookup-Map: Kanji-Zeichen → Level (aus kanji-data.js) */
const LEVEL_ORDER = { 'A1': 1, 'A2': 2, 'B1': 3, 'B2': 4 };
const kanjiLevelMap = {};
for (const entry of kanjiData) {
    kanjiLevelMap[entry.kanji] = entry.level;
}

/* Berechnet den Level eines Vokabels dynamisch:
   Höchster Level aller Zeichen im Wort, die in kanji-data.js vorhanden sind. */
function computeVocabLevel(word) {
    let maxLevel = null;
    for (const char of word) {
        const lvl = kanjiLevelMap[char];
        if (lvl && (!maxLevel || LEVEL_ORDER[lvl] > LEVEL_ORDER[maxLevel])) {
            maxLevel = lvl;
        }
    }
    return maxLevel || 'A1';
}

/* ============ STATE ============ */

let currentQuizType = 'word-de';    // 'word-de' | 'de-word' | 'word-reading'
let currentMode = 'random';         // 'random' | 'semi-random'
let filteredVocab = [];             // aktive Vokabeln nach Stufenfilter
let remainingQuestions = [];        // Semi-Random: noch nicht gezeigt
let incorrectQuestions = [];        // Semi-Random: falsch beantwortet (30% Wiederholung)
let currentQuestion = null;
let answered = false;

/* ============ DOM ============ */

const displayArea = document.getElementById('displayArea');
const choicesArea = document.getElementById('choicesArea');
const textInput = document.getElementById('textInput');
const checkButton = document.getElementById('checkButton');
const feedbackArea = document.getElementById('feedbackArea');
const nextButton = document.getElementById('nextButton');
const score = new ScoreTracker('correctCount', 'incorrectCount');

const typeWordDeBtn = document.getElementById('typeWordDe');
const typeDeWordBtn = document.getElementById('typeDeWord');
const typeWordReadingBtn = document.getElementById('typeWordReading');
const modeRandomBtn = document.getElementById('modeRandom');
const modeSemiBtn = document.getElementById('modeSemiRandom');

/* ============ STUFENFILTER ============ */

function applyLevelFilter() {
    const levels = getActiveLevels();
    filteredVocab = kanjiVocabData.filter(v => levels.includes(computeVocabLevel(v.word)));
    if (filteredVocab.length === 0) {
        filteredVocab = kanjiVocabData.filter(v => computeVocabLevel(v.word) === 'A1');
    }
    resetQuiz();
}

/* ============ FRAGEN-AUSWAHL (70/30 Spaced Repetition wie kanji.js) ============ */

function selectNextQuestion() {
    if (currentMode === 'random') {
        return filteredVocab[Math.floor(Math.random() * filteredVocab.length)];
    }
    if (remainingQuestions.length === 0 && incorrectQuestions.length === 0) {
        remainingQuestions = [...filteredVocab];
        shuffleArray(remainingQuestions);
    }
    if (incorrectQuestions.length > 0 && Math.random() < 0.3) {
        return incorrectQuestions.shift();
    }
    return remainingQuestions.shift();
}

/* ============ FRAGE LADEN ============ */

function loadQuestion() {
    if (filteredVocab.length === 0) return;
    currentQuestion = selectNextQuestion();
    answered = false;
    clearFeedback('feedbackArea');
    nextButton.style.display = 'none';
    textInput.value = '';
    textInput.disabled = false;
    checkButton.disabled = false;

    if (currentQuizType === 'word-de') {
        loadWordToDeutsch();
    } else if (currentQuizType === 'de-word') {
        loadDeutschToWord();
    } else {
        loadWordToReading();
    }

    textInput.focus();
}

/* --- Wort → Deutsch/English: Wort anzeigen, 4 MC + Texteingabe --- */
function loadWordToDeutsch() {
    displayArea.className = 'word-display';
    displayArea.textContent = currentQuestion.word;

    textInput.placeholder = t('kanjiVocab.phMeaning');

    const choices = buildMeaningChoices();
    renderChoiceButtons(choices, 'meaning');
}

/* --- Deutsch/English → Wort: Bedeutung anzeigen, 4 MC + Texteingabe --- */
function loadDeutschToWord() {
    displayArea.className = 'meaning-display';
    displayArea.textContent = getMeaning(currentQuestion)[0];

    textInput.placeholder = t('kanjiVocab.phWord');

    const choices = buildWordChoices();
    renderChoiceButtons(choices, 'word');
}

/* --- Wort → Lesung: Wort anzeigen, nur Texteingabe --- */
function loadWordToReading() {
    displayArea.className = 'word-display';
    displayArea.textContent = currentQuestion.word;

    textInput.placeholder = t('kanjiVocab.phReading');

    choicesArea.innerHTML = '';
}

/* ============ MULTIPLE-CHOICE GENERIERUNG ============ */

function buildMeaningChoices() {
    const correct = getMeaning(currentQuestion)[0];
    let choices = [correct];
    const pool = filteredVocab.filter(v => v.word !== currentQuestion.word);
    shuffleArray(pool);
    for (const v of pool) {
        if (choices.length >= 4) break;
        const m = getMeaning(v)[0];
        if (!choices.includes(m)) {
            choices.push(m);
        }
    }
    shuffleArray(choices);
    return choices;
}

function buildWordChoices() {
    const correct = currentQuestion.word;
    let choices = [correct];
    const pool = filteredVocab.filter(v => v.word !== currentQuestion.word);
    shuffleArray(pool);
    for (const v of pool) {
        if (choices.length >= 4) break;
        if (!choices.includes(v.word)) {
            choices.push(v.word);
        }
    }
    shuffleArray(choices);
    return choices;
}

function renderChoiceButtons(choices, type) {
    choicesArea.innerHTML = '';
    choices.forEach(text => {
        const btn = document.createElement('button');
        btn.classList.add('choice-button');
        btn.textContent = text;
        btn.addEventListener('click', () => handleChoiceClick(text, type));
        choicesArea.appendChild(btn);
    });
}

/* ============ ANTWORT PRUEFEN ============ */

function handleChoiceClick(selected, type) {
    if (answered) return;
    let isCorrect = false;

    if (type === 'meaning') {
        isCorrect = getMeaning(currentQuestion).some(m => m.toLowerCase() === selected.toLowerCase());
    } else {
        isCorrect = selected === currentQuestion.word;
    }

    finishAnswer(isCorrect);
}

function checkTextInput() {
    if (answered) return;
    const input = textInput.value.trim();
    if (!input) return;

    let isCorrect = false;

    if (currentQuizType === 'word-de') {
        // Akzeptiere alle meaning_de UND meaning_en Varianten (case-insensitive)
        const allMeanings = [...currentQuestion.meaning_de, ...(currentQuestion.meaning_en || [])];
        isCorrect = allMeanings.some(m => m.toLowerCase() === input.toLowerCase());
    } else if (currentQuizType === 'de-word') {
        // Akzeptiere Kanji-Wort exakt, Hiragana-Lesung, Romaji + Varianten
        const allAnswers = [
            currentQuestion.word,
            currentQuestion.reading,
            currentQuestion.romaji,
            ...currentQuestion.romaji_variants
        ];
        isCorrect = allAnswers.some(a => a.toLowerCase() === input.toLowerCase());
    } else {
        // word-reading: Hiragana oder Romaji + Varianten
        const allReadings = [currentQuestion.reading, currentQuestion.romaji, ...currentQuestion.romaji_variants];
        isCorrect = allReadings.some(r => r.toLowerCase() === input.toLowerCase());
    }

    finishAnswer(isCorrect);
}

function finishAnswer(isCorrect) {
    answered = true;
    textInput.disabled = true;
    checkButton.disabled = true;

    choicesArea.querySelectorAll('.choice-button').forEach(btn => btn.disabled = true);

    const level = computeVocabLevel(currentQuestion.word);
    let html = '';

    if (isCorrect) {
        feedbackArea.className = 'feedback correct';
        html += '<strong>' + t('feedback.correct') + '</strong><br>';
        score.addCorrect();
    } else {
        feedbackArea.className = 'feedback incorrect';
        html += '<strong>' + t('feedback.wrong') + '</strong> ';
        if (currentQuizType === 'word-de') {
            html += t('feedback.correctIs') + ' "' + getMeaning(currentQuestion)[0] + '"<br>';
        } else if (currentQuizType === 'de-word') {
            html += t('feedback.correctIs') + ' ' + currentQuestion.word + ' (' + currentQuestion.reading + ')<br>';
        } else {
            html += t('feedback.correctIs') + ' "' + currentQuestion.reading + '" (' + currentQuestion.romaji + ')<br>';
        }
        score.addIncorrect();
        if (currentMode === 'semi-random') {
            incorrectQuestions.push(currentQuestion);
        }
    }

    // Detailliertes Feedback
    html += '<span class="kanji-info">';
    html += '語彙: ' + currentQuestion.word + ' <span class="level-badge">' + level + '</span><br>';
    html += t('kanjiVocab.reading') + ': ' + currentQuestion.reading + ' (' + currentQuestion.romaji + ')<br>';
    html += t('kanjiVocab.meaning') + ': ';
    html += currentQuestion.meaning_de.join(', ');
    if (currentQuestion.meaning_en && currentQuestion.meaning_en.length > 0) {
        html += ' / ' + currentQuestion.meaning_en.join(', ');
    }
    html += '</span>';

    feedbackArea.innerHTML = html;

    if (isCorrect && isQuickAnswer()) {
        setTimeout(loadQuestion, 400);
    } else {
        nextButton.style.display = 'block';
    }
}

/* ============ QUIZ RESET ============ */

function resetQuiz() {
    score.reset();
    remainingQuestions = [...filteredVocab];
    shuffleArray(remainingQuestions);
    incorrectQuestions = [];
    loadQuestion();
}

/* ============ QUIZ-TYP WECHSEL ============ */

function switchQuizType(type) {
    currentQuizType = type;
    typeWordDeBtn.classList.toggle('active', type === 'word-de');
    typeDeWordBtn.classList.toggle('active', type === 'de-word');
    typeWordReadingBtn.classList.toggle('active', type === 'word-reading');
    resetQuiz();
}

/* ============ MODUS-WECHSEL ============ */

function switchMode(mode) {
    currentMode = mode;
    modeRandomBtn.classList.toggle('active', mode === 'random');
    modeSemiBtn.classList.toggle('active', mode === 'semi-random');
    resetQuiz();
}

/* ============ LANGCHANGE ============ */

document.addEventListener('langchange', () => {
    if (currentQuestion) loadQuestion();
});

/* ============ EVENT LISTENER ============ */

nextButton.addEventListener('click', loadQuestion);
checkButton.addEventListener('click', checkTextInput);
textInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') checkTextInput();
});

typeWordDeBtn.addEventListener('click', () => switchQuizType('word-de'));
typeDeWordBtn.addEventListener('click', () => switchQuizType('de-word'));
typeWordReadingBtn.addEventListener('click', () => switchQuizType('word-reading'));

modeRandomBtn.addEventListener('click', () => switchMode('random'));
modeSemiBtn.addEventListener('click', () => switchMode('semi-random'));

document.addEventListener('levelchange', applyLevelFilter);

/* ============ INIT ============ */

/* Quick Answer Button injizieren */
const scoreEl = document.querySelector('.score');
if (scoreEl) injectQuickAnswerButton(scoreEl.parentElement);

applyLevelFilter();
