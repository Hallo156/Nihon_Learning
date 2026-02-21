/* Japanisch Lernprogramm — Erstellt von Hi156 unter Verwendung von Claude (Anthropic) */

/* numbers.js — Zahlen & Zaehlwoerter Quiz-Motor.
   Braucht: common.js, i18n.js, quiz-engine.js, numbers-data.js */

/* ============ HELFER: Sprach-abhaengige Felder ============ */

function getSegmentLabel(seg) { return getLangField(seg, 'label', 'label_en'); }
function getRefTitle(ref) { return getLangField(ref, 'title', 'title_en'); }
function getRefHtml(ref) { return getLangField(ref, 'html', 'html_en'); }
function getCounterDesc(c) { return currentLang === 'en' ? c.description_en : c.description; }
function getItemName(ex) { return currentLang === 'en' ? ex.item_en : ex.item_de; }

/* ============ DOM-REFERENZEN (modul-spezifisch) ============ */

const segmentFiltersDiv = document.getElementById('segmentFilters');
const viewQuizBtn = document.getElementById('viewQuiz');
const viewRefBtn = document.getElementById('viewReference');
const quizView = document.getElementById('quizView');
const referenceView = document.getElementById('referenceView');
const referenceContent = document.getElementById('referenceContent');

/* ============ STATE ============ */

let filteredSegments = [];
let generatedPool = [];

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
    engine.resetQuiz();
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
        generatedPool.push({
            segment: segId, type: 'text',
            promptKey: 'numbers.howRead', promptArgs: [num.kanji],
            display: num.kanji,
            correct: buildCorrectAnswers(num),
            explanation: num.reading + ' (' + num.romaji + ')'
        });

        generatedPool.push({
            segment: segId, type: 'mc',
            promptKey: 'numbers.whatMeans', promptArgs: [num.reading],
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
        generatedPool.push({
            segment: segId, type: 'text',
            promptKey: 'numbers.howSay', promptArgs: [String(item.n), counter.kanji],
            display: item.n + counter.kanji,
            correct: buildCounterCorrect(item),
            explanation: item.reading + ' (' + item.romaji + ')'
        });

        generatedPool.push({
            segment: segId, type: 'mc',
            promptKey: 'numbers.whatMeans', promptArgs: [item.reading],
            display: item.reading,
            correct: [item.n + counter.kanji],
            choices: generateCounterMcChoices(item.n, counter.kanji),
            explanation: item.reading + ' = ' + item.n + counter.kanji
        });

        generatedPool.push({
            segment: segId, type: 'text',
            promptKey: 'numbers.combine', promptArgs: [String(item.n), counter.kanji],
            display: item.n + ' + ' + counter.kanji,
            correct: buildCounterCorrect(item),
            explanation: item.reading + ' (' + item.romaji + ')'
        });
    });

    const relevantExamples = counterExamples.filter(ex => ex.counter === counterKey);
    relevantExamples.forEach(ex => {
        generatedPool.push({
            segment: segId, type: 'mc_counter',
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

/* ============ QUIZ-ENGINE ============ */

const engine = new QuizEngine({
    feedbackId: 'feedbackArea',
    nextButtonId: 'nextButton',
    choicesAreaId: 'choicesArea',
    textInputId: 'textInput',
    checkButtonId: 'checkButton',
    displayAreaId: 'displayArea',
    inputAreaId: 'inputArea',
    modeRandomId: 'modeRandom',
    modeSemiId: 'modeSemiRandom',
    correctSpanId: 'correctCount',
    incorrectSpanId: 'incorrectCount',
    quickAnswerTarget: '.score',

    getPool: () => generatedPool,

    renderQuestion: (q, eng) => {
        const seg = numbersSegments.find(s => s.id === q.segment);
        const segLabel = seg ? getSegmentLabel(seg) : '';
        const promptArgs = q.promptArgs_fn ? q.promptArgs_fn() : q.promptArgs;

        let html = '<div class="segment-badge">' + segLabel + '</div>';
        html += '<p class="prompt-text">' + t(q.promptKey, ...promptArgs) + '</p>';
        if (q.display) {
            html += '<div class="number-display">' + q.display + '</div>';
        }
        eng.displayArea.innerHTML = html;

        if (q.type === 'mc' || q.type === 'mc_counter') {
            eng.inputArea.style.display = 'none';
            eng.renderChoiceButtons(q.choices, selected => {
                eng.handleMCAnswer(selected, q.correct);
            });
        } else {
            eng.inputArea.style.display = '';
        }
    },

    checkText: (input, q) => {
        return q.correct.some(c => c === input || c.toLowerCase() === input.toLowerCase());
    },

    buildFeedback: (q, isCorrect) => {
        const explanation = q.explanation_fn ? q.explanation_fn() : q.explanation;
        let html = '';
        if (isCorrect) {
            html += '<strong>' + t('feedback.correct') + '</strong>';
        } else {
            html += '<strong>' + t('feedback.wrong') + '</strong> ' + t('feedback.correctIs') + ' ' + q.correct[0];
        }
        if (explanation) {
            html += '<br><span class="explanation">' + explanation + '</span>';
        }
        return html;
    },

    onLangChange: () => {
        buildFilterCheckboxes();
        if (referenceView.style.display !== 'none') {
            buildReferenceContent();
        }
    }
});

/* ============ ANSICHT-WECHSEL (Quiz / Nachschlagen) ============ */

function switchView(view) {
    viewQuizBtn.classList.toggle('active', view === 'quiz');
    viewRefBtn.classList.toggle('active', view === 'reference');
    quizView.style.display = view === 'quiz' ? '' : 'none';
    referenceView.style.display = view === 'reference' ? '' : 'none';
    if (view === 'reference') buildReferenceContent();
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

/* ============ EVENT LISTENERS (modul-spezifisch) ============ */

document.getElementById('applyFilter').addEventListener('click', applySegmentFilter);
viewQuizBtn.addEventListener('click', () => switchView('quiz'));
viewRefBtn.addEventListener('click', () => switchView('reference'));

/* ============ INITIALISIERUNG ============ */

buildFilterCheckboxes();
applySegmentFilter();
