/* Japanisch Lernprogramm — Erstellt von Hi156 unter Verwendung von Claude (Anthropic) */

/* training.js — Dynamischer Quiz-Motor fuer Vokabular & Grammatik.
   Braucht: common.js, i18n.js, training-data.js */

/* ============ HELFER: Sprach-abhängige Felder ============ */

function getPrompt(q) { return currentLang === 'en' && q.prompt_en ? q.prompt_en : q.prompt; }
function getExplanation(q) { return currentLang === 'en' && q.explanation_en ? q.explanation_en : q.explanation; }
function getChoices(q) { return currentLang === 'en' && q.choices_en ? q.choices_en : q.choices; }
function getCorrect(q) { return currentLang === 'en' && q.correct_en ? q.correct_en : q.correct; }
function getSegmentLabel(seg) { return currentLang === 'en' && seg.label_en ? seg.label_en : seg.label; }
function getRefTitle(ref) { return currentLang === 'en' && ref.title_en ? ref.title_en : ref.title; }
function getRefHtml(ref) { return currentLang === 'en' && ref.html_en ? ref.html_en : ref.html; }

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
let filteredQuestions = [];
let remainingQuestions = [];
let incorrectQuestions = [];
let currentQuestion = null;
let answered = false;
let score = null;

/* ============ FILTER: Checkboxen dynamisch erzeugen ============ */

function buildFilterCheckboxes() {
    segmentFiltersDiv.innerHTML = '';
    trainingSegments.forEach(seg => {
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
    const segments = getSelectedSegments();
    filteredQuestions = trainingQuestions.filter(q => segments.includes(q.segment));

    if (filteredQuestions.length === 0) {
        document.getElementById('seg_particles').checked = true;
        filteredQuestions = trainingQuestions.filter(q => q.segment === 'particles');
    }
    resetQuiz();
}

/* ============ SPACED REPETITION (70/30) ============ */

function selectNextQuestion() {
    if (currentMode === 'random') {
        return filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
    }
    if (remainingQuestions.length === 0 && incorrectQuestions.length === 0) {
        remainingQuestions = [...filteredQuestions];
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
    currentQuestion = selectNextQuestion();
    answered = false;
    clearFeedback('feedbackArea');
    nextButton.style.display = 'none';
    choicesArea.innerHTML = '';
    textInput.value = '';
    textInput.disabled = false;
    checkButton.disabled = false;

    const seg = trainingSegments.find(s => s.id === currentQuestion.segment);
    const segLabel = seg ? getSegmentLabel(seg) : '';
    let html = '<div class="segment-badge">' + segLabel + '</div>';
    html += '<p class="prompt-text">' + getPrompt(currentQuestion) + '</p>';

    if (currentQuestion.prompt_jp) {
        const jpText = currentQuestion.prompt_jp.replace(/（___）/g, '<span class="blank-highlight">______</span>');
        html += '<p class="prompt-jp">' + jpText + '</p>';
    }

    displayArea.innerHTML = html;

    if (currentQuestion.type === 'mc') {
        inputArea.style.display = 'none';
        renderChoiceButtons(getChoices(currentQuestion));
    } else {
        inputArea.style.display = '';
        textInput.focus();
    }
}

/* ============ MULTIPLE CHOICE ============ */

function renderChoiceButtons(choices) {
    choicesArea.innerHTML = '';
    const shuffled = [...choices];
    shuffleArray(shuffled);
    shuffled.forEach(text => {
        const btn = document.createElement('button');
        btn.classList.add('choice-button');
        btn.textContent = text;
        btn.addEventListener('click', () => handleChoiceClick(text));
        choicesArea.appendChild(btn);
    });
}

function handleChoiceClick(selected) {
    if (answered) return;
    const correctArr = getCorrect(currentQuestion);
    const isCorrect = correctArr.some(
        c => c.toLowerCase() === selected.toLowerCase()
    );
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

    let html = '';
    if (isCorrect) {
        html += '<strong>' + t('feedback.correct') + '</strong>';
        score.addCorrect();
    } else {
        html += '<strong>' + t('feedback.wrong') + '</strong> ' + t('training.correctIs') + ' ' + currentQuestion.correct[0];
        score.addIncorrect();
        if (currentMode === 'semi-random') {
            incorrectQuestions.push(currentQuestion);
        }
    }

    const explanation = getExplanation(currentQuestion);
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
    remainingQuestions = [...filteredQuestions];
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
    trainingSegments.forEach(seg => {
        const ref = trainingReference[seg.id];
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
