/* kanji.js — Kanji-Trainer: 3 Quiz-Typen, Stufenfilter, Spaced Repetition.
   Braucht: common.js, i18n.js, kanji-data.js */

/* ============ HELFER: Sprach-abhängige Felder ============ */

function getMeaning(k) {
    return currentLang === 'en' && k.meaning_en ? k.meaning_en : k.meaning_de;
}

/* ============ STATE ============ */

let currentQuizType = 'kanji-de';   // 'kanji-de' | 'de-kanji' | 'kanji-reading'
let currentMode = 'random';         // 'random' | 'semi-random'
let filteredKanji = [];             // aktive Kanji nach Stufenfilter
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

const typeKanjiDeBtn = document.getElementById('typeKanjiDe');
const typeDeKanjiBtn = document.getElementById('typeDeKanji');
const typeKanjiReadingBtn = document.getElementById('typeKanjiReading');
const modeRandomBtn = document.getElementById('modeRandom');
const modeSemiBtn = document.getElementById('modeSemiRandom');
const applyFilterBtn = document.getElementById('applyFilter');

/* ============ STUFENFILTER ============ */

function getSelectedLevels() {
    const levels = [];
    if (document.getElementById('levelA1').checked) levels.push('A1');
    if (document.getElementById('levelA2').checked) levels.push('A2');
    if (document.getElementById('levelB1').checked) levels.push('B1');
    if (document.getElementById('levelB2').checked) levels.push('B2');
    return levels;
}

function applyLevelFilter() {
    const levels = getSelectedLevels();
    filteredKanji = kanjiData.filter(k => levels.includes(k.level));
    if (filteredKanji.length === 0) {
        document.getElementById('levelA1').checked = true;
        filteredKanji = kanjiData.filter(k => k.level === 'A1');
    }
    resetQuiz();
}

/* ============ FRAGEN-AUSWAHL (wie verb.js) ============ */

function selectNextQuestion() {
    if (currentMode === 'random') {
        return filteredKanji[Math.floor(Math.random() * filteredKanji.length)];
    }
    if (remainingQuestions.length === 0 && incorrectQuestions.length === 0) {
        remainingQuestions = [...filteredKanji];
        shuffleArray(remainingQuestions);
    }
    if (incorrectQuestions.length > 0 && Math.random() < 0.3) {
        return incorrectQuestions.shift();
    }
    return remainingQuestions.shift();
}

/* ============ FRAGE LADEN ============ */

function loadQuestion() {
    if (filteredKanji.length === 0) return;
    currentQuestion = selectNextQuestion();
    answered = false;
    clearFeedback('feedbackArea');
    nextButton.style.display = 'none';
    textInput.value = '';
    textInput.disabled = false;
    checkButton.disabled = false;

    if (currentQuizType === 'kanji-de') {
        loadKanjiToDeutsch();
    } else if (currentQuizType === 'de-kanji') {
        loadDeutschToKanji();
    } else {
        loadKanjiToReading();
    }

    textInput.focus();
}

/* --- Kanji → Deutsch/English: Kanji anzeigen, 4 MC + Texteingabe --- */
function loadKanjiToDeutsch() {
    displayArea.className = 'kanji-display';
    displayArea.textContent = currentQuestion.kanji;

    textInput.placeholder = t('kanji.phMeaning');

    const choices = buildMeaningChoices();
    renderChoiceButtons(choices, 'meaning');
}

/* --- Deutsch/English → Kanji: Bedeutung anzeigen, 4 MC + Texteingabe --- */
function loadDeutschToKanji() {
    displayArea.className = 'meaning-display';
    displayArea.textContent = getMeaning(currentQuestion)[0];

    textInput.placeholder = t('kanji.phKanji');

    const choices = buildKanjiChoices();
    renderChoiceButtons(choices, 'kanji');
}

/* --- Kanji → Lesung: Kanji anzeigen, nur Texteingabe --- */
function loadKanjiToReading() {
    displayArea.className = 'kanji-display';
    displayArea.textContent = currentQuestion.kanji;

    textInput.placeholder = t('kanji.phReading');

    choicesArea.innerHTML = '';
}

/* ============ MULTIPLE-CHOICE GENERIERUNG ============ */

function buildMeaningChoices() {
    const correct = getMeaning(currentQuestion)[0];
    let choices = [correct];
    const pool = filteredKanji.filter(k => k.kanji !== currentQuestion.kanji);
    shuffleArray(pool);
    for (const k of pool) {
        if (choices.length >= 4) break;
        const m = getMeaning(k)[0];
        if (!choices.includes(m)) {
            choices.push(m);
        }
    }
    shuffleArray(choices);
    return choices;
}

function buildKanjiChoices() {
    const correct = currentQuestion.kanji;
    let choices = [correct];
    const pool = filteredKanji.filter(k => k.kanji !== currentQuestion.kanji);
    shuffleArray(pool);
    for (const k of pool) {
        if (choices.length >= 4) break;
        if (!choices.includes(k.kanji)) {
            choices.push(k.kanji);
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
        isCorrect = selected === currentQuestion.kanji;
    }

    finishAnswer(isCorrect);
}

function checkTextInput() {
    if (answered) return;
    const input = textInput.value.trim();
    if (!input) return;

    let isCorrect = false;

    if (currentQuizType === 'kanji-de') {
        // Akzeptiere alle meaning_de UND meaning_en Varianten (case-insensitive)
        const allMeanings = [...currentQuestion.meaning_de, ...(currentQuestion.meaning_en || [])];
        isCorrect = allMeanings.some(m => m.toLowerCase() === input.toLowerCase());
    } else if (currentQuizType === 'de-kanji') {
        isCorrect = input === currentQuestion.kanji;
    } else {
        const allReadings = [currentQuestion.romaji, ...currentQuestion.romaji_variants];
        isCorrect = allReadings.some(r => r.toLowerCase() === input.toLowerCase());
    }

    finishAnswer(isCorrect);
}

function finishAnswer(isCorrect) {
    answered = true;
    textInput.disabled = true;
    checkButton.disabled = true;

    choicesArea.querySelectorAll('.choice-button').forEach(btn => btn.disabled = true);

    let html = '';
    if (isCorrect) {
        feedbackArea.className = 'feedback correct';
        html += '<strong>' + t('feedback.correct') + '</strong><br>';
        score.addCorrect();
    } else {
        feedbackArea.className = 'feedback incorrect';
        html += '<strong>' + t('feedback.wrong') + '</strong> ';
        if (currentQuizType === 'kanji-de') {
            html += t('feedback.correctIs') + ' "' + getMeaning(currentQuestion)[0] + '"<br>';
        } else if (currentQuizType === 'de-kanji') {
            html += t('feedback.correctIs') + ' ' + currentQuestion.kanji + '<br>';
        } else {
            html += t('feedback.correctIs') + ' "' + currentQuestion.romaji + '"<br>';
        }
        score.addIncorrect();
        if (currentMode === 'semi-random') {
            incorrectQuestions.push(currentQuestion);
        }
    }

    // Detailliertes Feedback
    html += '<span class="kanji-info">';
    html += '漢字: ' + currentQuestion.kanji + ' <span class="level-badge">' + currentQuestion.level + '</span><br>';
    html += t('kanji.meaning') + ': ' + getMeaning(currentQuestion).join(', ') + '<br>';
    html += "On'yomi: " + currentQuestion.on + " | Kun'yomi: " + currentQuestion.kun + ' | Romaji: ' + currentQuestion.romaji;
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
    remainingQuestions = [...filteredKanji];
    shuffleArray(remainingQuestions);
    incorrectQuestions = [];
    loadQuestion();
}

/* ============ QUIZ-TYP WECHSEL ============ */

function switchQuizType(type) {
    currentQuizType = type;
    typeKanjiDeBtn.classList.toggle('active', type === 'kanji-de');
    typeDeKanjiBtn.classList.toggle('active', type === 'de-kanji');
    typeKanjiReadingBtn.classList.toggle('active', type === 'kanji-reading');
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

typeKanjiDeBtn.addEventListener('click', () => switchQuizType('kanji-de'));
typeDeKanjiBtn.addEventListener('click', () => switchQuizType('de-kanji'));
typeKanjiReadingBtn.addEventListener('click', () => switchQuizType('kanji-reading'));

modeRandomBtn.addEventListener('click', () => switchMode('random'));
modeSemiBtn.addEventListener('click', () => switchMode('semi-random'));

applyFilterBtn.addEventListener('click', applyLevelFilter);

/* ============ INIT ============ */

/* Quick Answer Button injizieren */
const scoreEl = document.querySelector('.score');
if (scoreEl) injectQuickAnswerButton(scoreEl.parentElement);

applyLevelFilter();
