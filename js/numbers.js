/* Japanisch Lernprogramm — Erstellt von Hi156 unter Verwendung von Claude (Anthropic) */

/* numbers.js — Zahlen & Zaehlwoerter Quiz-Motor.
   Braucht: common.js, i18n.js, numbers-data.js */

/* ============ HELFER: Sprach-abhaengige Felder ============ */

function getSegmentLabel(seg) { return currentLang === 'en' && seg.label_en ? seg.label_en : seg.label; }
function getRefTitle(ref) { return currentLang === 'en' && ref.title_en ? ref.title_en : ref.title; }
function getRefHtml(ref) { return currentLang === 'en' && ref.html_en ? ref.html_en : ref.html; }
function getCounterDesc(c) { return currentLang === 'en' ? c.description_en : c.description; }
function getItemName(ex) { return currentLang === 'en' ? ex.item_en : ex.item_de; }

/* ============ DOM-REFERENZEN ============ */

const displayArea = document.getElementById('displayArea');
const choicesArea = document.getElementById('choicesArea');
const inputArea = document.getElementById('inputArea');
const textInput = document.getElementById('textInput');
const checkButton = document.getElementById('checkButton');
const feedbackArea = document.getElementById('feedbackArea');
const nextButton = document.getElementById('nextButton');
const segmentFiltersDiv = document.getElementById('segmentFilters');
const applyFilterBtn = document.getElementById('applyFilter');
const modeRandomBtn = document.getElementById('modeRandom');
const modeSemiBtn = document.getElementById('modeSemiRandom');
const viewQuizBtn = document.getElementById('viewQuiz');
const viewRefBtn = document.getElementById('viewReference');
const quizView = document.getElementById('quizView');
const referenceView = document.getElementById('referenceView');
const referenceContent = document.getElementById('referenceContent');

/* ============ STATE ============ */

let currentMode = 'random';
let filteredSegments = [];
let generatedPool = [];
let remainingQuestions = [];
let incorrectQuestions = [];
let currentQuestion = null;
let answered = false;
let score = null;

/* ============ FILTER: Checkboxen dynamisch erzeugen ============ */

function buildFilterCheckboxes() {
    segmentFiltersDiv.innerHTML = '';
    numbersSegments.forEach(seg => {
        const label = document.createElement('label');
        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.id = 'seg_' + seg.id;
        cb.dataset.segment = seg.id;
        cb.checked = seg.checked;
        label.appendChild(cb);
        label.appendChild(document.createTextNode(' ' + getSegmentLabel(seg)));
        segmentFiltersDiv.appendChild(label);
    });
}

function getSelectedSegments() {
    const segments = [];
    segmentFiltersDiv.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => {
        segments.push(cb.dataset.segment);
    });
    return segments;
}

function applySegmentFilter() {
    filteredSegments = getSelectedSegments();
    if (filteredSegments.length === 0) {
        document.getElementById('seg_basic_1_10').checked = true;
        filteredSegments = ['basic_1_10'];
    }
    generateQuestionPool();
    resetQuiz();
}

/* ============ FRAGEN-GENERIERUNG ============ */

function generateQuestionPool() {
    generatedPool = [];

    filteredSegments.forEach(segId => {
        if (segId.startsWith('basic_')) {
            generateBasicQuestions(segId);
        } else if (segId.startsWith('counter_')) {
            const counterKey = segId.replace('counter_', '');
            generateCounterQuestions(segId, counterKey);
        }
    });
}

function generateBasicQuestions(segId) {
    const numbers = basicNumbers[segId];
    if (!numbers) return;

    numbers.forEach(num => {
        /* Typ reading: Kanji -> Lesung */
        generatedPool.push({
            segment: segId,
            type: 'text',
            promptKey: 'numbers.howRead',
            promptArgs: [num.kanji],
            display: num.kanji,
            correct: buildCorrectAnswers(num),
            explanation: num.reading + ' (' + num.romaji + ')'
        });

        /* Typ meaning: Lesung -> Zahl (MC) */
        generatedPool.push({
            segment: segId,
            type: 'mc',
            promptKey: 'numbers.whatMeans',
            promptArgs: [num.reading],
            display: num.reading,
            correct: [String(num.n)],
            choices: generateNumberChoices(num.n, numbers),
            explanation: num.reading + ' = ' + num.n
        });
    });
}

function generateCounterQuestions(segId, counterKey) {
    const counter = counterData[counterKey];
    if (!counter) return;

    counter.items.forEach(item => {
        /* Typ reading: "Wie sagt man N [Counter-Objekt]?" */
        generatedPool.push({
            segment: segId,
            type: 'text',
            promptKey: 'numbers.howSay',
            promptArgs: [String(item.n), counter.kanji],
            display: item.n + counter.kanji,
            correct: buildCounterCorrect(item),
            explanation: item.reading + ' (' + item.romaji + ')'
        });

        /* Typ meaning: Lesung -> N+Counter (MC) */
        generatedPool.push({
            segment: segId,
            type: 'mc',
            promptKey: 'numbers.whatMeans',
            promptArgs: [item.reading],
            display: item.reading,
            correct: [item.n + counter.kanji],
            choices: generateCounterMcChoices(item.n, counter.kanji),
            explanation: item.reading + ' = ' + item.n + counter.kanji
        });

        /* Typ combine: N + Counter-Kanji = ? */
        generatedPool.push({
            segment: segId,
            type: 'text',
            promptKey: 'numbers.combine',
            promptArgs: [String(item.n), counter.kanji],
            display: item.n + ' + ' + counter.kanji,
            correct: buildCounterCorrect(item),
            explanation: item.reading + ' (' + item.romaji + ')'
        });
    });

    /* counter_choice Fragen: Welchen Zaehler fuer X? */
    const relevantExamples = counterExamples.filter(ex => ex.counter === counterKey);
    relevantExamples.forEach(ex => {
        generatedPool.push({
            segment: segId,
            type: 'mc_counter',
            promptKey: 'numbers.whichCounter',
            promptArgs_fn: () => [getItemName(ex)],
            correct: [counter.kanji],
            choices: generateCounterKanjiChoices(counter.kanji),
            explanation_fn: () => t('numbers.counterIs', getItemName(ex), counter.kanji)
        });
    });
}

/* ============ ANTWORT-HELFER ============ */

function buildCorrectAnswers(num) {
    const answers = [num.reading, num.romaji];
    if (num.alt_reading) answers.push(num.alt_reading);
    if (num.alt_romaji) answers.push(num.alt_romaji);
    return answers;
}

function buildCounterCorrect(item) {
    const answers = [item.reading, item.romaji];
    if (item.alt_romaji) answers.push(item.alt_romaji);
    return answers;
}

function generateNumberChoices(correctN, numbers) {
    const choices = [String(correctN)];
    const available = numbers.filter(n => n.n !== correctN);
    shuffleArray(available);
    for (let i = 0; i < Math.min(3, available.length); i++) {
        choices.push(String(available[i].n));
    }
    shuffleArray(choices);
    return choices;
}

function generateCounterMcChoices(correctN, counterKanji) {
    const allCounterKanji = Object.values(counterData).map(c => c.kanji);
    const choices = [correctN + counterKanji];
    const otherCounters = allCounterKanji.filter(k => k !== counterKanji);
    shuffleArray(otherCounters);
    for (let i = 0; i < Math.min(3, otherCounters.length); i++) {
        choices.push(correctN + otherCounters[i]);
    }
    shuffleArray(choices);
    return choices;
}

function generateCounterKanjiChoices(correctKanji) {
    const allKanji = Object.values(counterData).map(c => c.kanji);
    const choices = [correctKanji];
    const others = allKanji.filter(k => k !== correctKanji);
    shuffleArray(others);
    for (let i = 0; i < Math.min(3, others.length); i++) {
        choices.push(others[i]);
    }
    shuffleArray(choices);
    return choices;
}

/* ============ SPACED REPETITION (70/30) ============ */

function selectNextQuestion() {
    if (currentMode === 'random') {
        return generatedPool[Math.floor(Math.random() * generatedPool.length)];
    }
    if (remainingQuestions.length === 0 && incorrectQuestions.length === 0) {
        remainingQuestions = [...generatedPool];
        shuffleArray(remainingQuestions);
    }
    if (incorrectQuestions.length > 0 && Math.random() < 0.3) {
        return incorrectQuestions.shift();
    }
    if (remainingQuestions.length > 0) {
        return remainingQuestions.shift();
    }
    return incorrectQuestions.shift();
}

/* ============ FRAGE LADEN ============ */

function loadQuestion() {
    if (generatedPool.length === 0) return;

    currentQuestion = selectNextQuestion();
    answered = false;
    clearFeedback('feedbackArea');
    nextButton.style.display = 'none';
    choicesArea.innerHTML = '';
    textInput.value = '';
    textInput.disabled = false;
    checkButton.disabled = false;

    const seg = numbersSegments.find(s => s.id === currentQuestion.segment);
    const segLabel = seg ? getSegmentLabel(seg) : '';

    /* Prompt-Argumente: statisch oder via Funktion */
    const promptArgs = currentQuestion.promptArgs_fn
        ? currentQuestion.promptArgs_fn()
        : currentQuestion.promptArgs;

    let html = '<div class="segment-badge">' + segLabel + '</div>';
    html += '<p class="prompt-text">' + t(currentQuestion.promptKey, ...promptArgs) + '</p>';

    if (currentQuestion.display) {
        html += '<div class="number-display">' + currentQuestion.display + '</div>';
    }

    displayArea.innerHTML = html;

    if (currentQuestion.type === 'mc' || currentQuestion.type === 'mc_counter') {
        inputArea.style.display = 'none';
        renderChoiceButtons(currentQuestion.choices);
    } else {
        inputArea.style.display = '';
        textInput.focus();
    }
}

/* ============ MULTIPLE CHOICE ============ */

function renderChoiceButtons(choices) {
    choicesArea.innerHTML = '';
    choices.forEach(text => {
        const btn = document.createElement('button');
        btn.classList.add('choice-button');
        btn.textContent = text;
        btn.addEventListener('click', () => handleChoiceClick(text));
        choicesArea.appendChild(btn);
    });
}

function handleChoiceClick(selected) {
    if (answered) return;
    const correctArr = currentQuestion.correct;
    const isCorrect = correctArr.some(c => c.toLowerCase() === selected.toLowerCase());

    choicesArea.querySelectorAll('.choice-button').forEach(btn => {
        btn.disabled = true;
        if (correctArr.some(c => c.toLowerCase() === btn.textContent.toLowerCase())) {
            btn.classList.add('correct-choice');
        }
        if (btn.textContent === selected && !isCorrect) {
            btn.classList.add('wrong-choice');
        }
    });
    finishAnswer(isCorrect);
}

/* ============ TEXTEINGABE PRUEFEN ============ */

function checkTextInput() {
    if (answered) return;
    const input = textInput.value.trim();
    if (!input) return;

    const isCorrect = currentQuestion.correct.some(
        c => c === input || c.toLowerCase() === input.toLowerCase()
    );
    finishAnswer(isCorrect);
}

/* ============ ANTWORT AUSWERTEN ============ */

function finishAnswer(isCorrect) {
    answered = true;
    textInput.disabled = true;
    checkButton.disabled = true;

    const explanation = currentQuestion.explanation_fn
        ? currentQuestion.explanation_fn()
        : currentQuestion.explanation;

    let html = '';
    if (isCorrect) {
        html += '<strong>' + t('feedback.correct') + '</strong>';
        score.addCorrect();
    } else {
        html += '<strong>' + t('feedback.wrong') + '</strong> ' + t('feedback.correctIs') + ' ' + currentQuestion.correct[0];
        score.addIncorrect();
        if (currentMode === 'semi-random') {
            incorrectQuestions.push(currentQuestion);
        }
    }

    if (explanation) {
        html += '<br><span class="explanation">' + explanation + '</span>';
    }

    feedbackArea.innerHTML = html;
    feedbackArea.className = 'feedback ' + (isCorrect ? 'correct' : 'incorrect');

    if (isCorrect && isQuickAnswer()) {
        setTimeout(loadQuestion, 400);
    } else {
        nextButton.style.display = 'block';
    }
}

/* ============ RESET ============ */

function resetQuiz() {
    score.reset();
    remainingQuestions = [...generatedPool];
    shuffleArray(remainingQuestions);
    incorrectQuestions = [];
    loadQuestion();
}

/* ============ MODUS-WECHSEL ============ */

function switchMode(mode) {
    currentMode = mode;
    modeRandomBtn.classList.toggle('active', mode === 'random');
    modeSemiBtn.classList.toggle('active', mode === 'semi-random');
    resetQuiz();
}

/* ============ ANSICHT-WECHSEL (Quiz / Nachschlagen) ============ */

function switchView(view) {
    viewQuizBtn.classList.toggle('active', view === 'quiz');
    viewRefBtn.classList.toggle('active', view === 'reference');
    quizView.style.display = view === 'quiz' ? '' : 'none';
    referenceView.style.display = view === 'reference' ? '' : 'none';

    if (view === 'reference') {
        buildReferenceContent();
    }
}

function buildReferenceContent() {
    let html = '';
    numbersSegments.forEach(seg => {
        const ref = numbersReference[seg.id];
        if (!ref) return;
        html += '<details class="ref-block">';
        html += '<summary>' + getRefTitle(ref) + '</summary>';
        html += '<div class="ref-body">' + getRefHtml(ref) + '</div>';
        html += '</details>';
    });
    referenceContent.innerHTML = html;
}

/* ============ LANGCHANGE ============ */

document.addEventListener('langchange', () => {
    buildFilterCheckboxes();
    if (referenceView.style.display !== 'none') {
        buildReferenceContent();
    }
    if (currentQuestion) loadQuestion();
});

/* ============ EVENT LISTENERS ============ */

nextButton.addEventListener('click', loadQuestion);
checkButton.addEventListener('click', checkTextInput);
textInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') checkTextInput();
});
modeRandomBtn.addEventListener('click', () => switchMode('random'));
modeSemiBtn.addEventListener('click', () => switchMode('semi-random'));
applyFilterBtn.addEventListener('click', applySegmentFilter);
viewQuizBtn.addEventListener('click', () => switchView('quiz'));
viewRefBtn.addEventListener('click', () => switchView('reference'));

/* ============ INITIALISIERUNG ============ */

buildFilterCheckboxes();
score = new ScoreTracker('correctCount', 'incorrectCount');

/* Quick Answer Button injizieren */
const scoreEl = document.querySelector('.score');
if (scoreEl) injectQuickAnswerButton(scoreEl.parentElement);

applySegmentFilter();
