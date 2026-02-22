/* Japanisch Lernprogramm — Erstellt von Hi156 unter Verwendung von Claude (Anthropic) */

/* training.js — Dynamischer Quiz-Motor fuer Vokabular & Grammatik.
   Braucht: common.js, i18n.js, quiz-engine.js, training-data.js */

/* ============ HELFER: Sprach-abhängige Felder ============ */

function getPrompt(q) { return getLangField(q, 'prompt', 'prompt_en'); }
function getExplanation(q) { return getLangField(q, 'explanation', 'explanation_en'); }
function getChoices(q) { return getLangField(q, 'choices', 'choices_en'); }
function getCorrect(q) { return getLangField(q, 'correct', 'correct_en'); }
function getSegmentLabel(seg) { return getLangField(seg, 'label', 'label_en'); }
function getRefTitle(ref) { return getLangField(ref, 'title', 'title_en'); }
function getRefHtml(ref) { return getLangField(ref, 'html', 'html_en'); }

/* ============ DOM-REFERENZEN (modul-spezifisch) ============ */

const segmentFiltersDiv = document.getElementById('segmentFilters');

/* ============ SICHTBARKEITS-TOGGLE ============ */

const trainingContainer = document.querySelector('.training-trainer');

const visState = buildVisibilityToggles({
    container: document.querySelector('#quizView'),
    insertAfter: document.querySelector('#quizView .segment-filters'),
    target: trainingContainer,
    toggles: [
        { key: 'training_translation', i18nKey: 'vis.translation', cssClass: 'hide-translation', defaultOn: true }
    ]
});

/* ============ STATE ============ */

let filteredQuestions = [];

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
        document.getElementById('seg_existence').checked = true;
        filteredQuestions = trainingQuestions.filter(q => q.segment === 'existence');
    }
    engine.resetQuiz();
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

    getPool: () => filteredQuestions,

    renderQuestion: (q, eng) => {
        const seg = trainingSegments.find(s => s.id === q.segment);
        const segLabel = seg ? getSegmentLabel(seg) : '';
        let html = '<div class="segment-badge">' + segLabel + '</div>';
        html += '<p class="prompt-text">' + getPrompt(q) + '</p>';

        if (q.prompt_jp) {
            const jpText = q.prompt_jp.replace(/（___）/g, '<span class="blank-highlight">______</span>');
            html += '<p class="prompt-jp">' + jpText + '</p>';
        }

        eng.displayArea.innerHTML = html;

        if (q.type === 'mc') {
            eng.inputArea.style.display = 'none';
            const shuffled = [...getChoices(q)];
            shuffleArray(shuffled);
            eng.renderChoiceButtons(shuffled, selected => {
                eng.handleMCAnswer(selected, getCorrect(q));
            });
        } else {
            eng.inputArea.style.display = '';
        }
    },

    checkText: (input, q) => {
        return q.correct.some(
            c => c === input || c.toLowerCase() === input.toLowerCase()
        );
    },

    buildFeedback: (q, isCorrect) => {
        let html = '';
        if (isCorrect) {
            html += '<strong>' + t('feedback.correct') + '</strong>';
        } else {
            html += '<strong>' + t('feedback.wrong') + '</strong> ' + t('training.correctIs') + ' ' + q.correct[0];
        }
        const explanation = getExplanation(q);
        if (explanation) {
            html += '<br><span class="explanation">' + explanation + '</span>';
        }
        return html;
    },

    onLangChange: () => {
        buildFilterCheckboxes();
    }
});

/* ============ NACHSCHLAG-SIDEBAR ============ */

buildReferenceSidebar({
    storageKey: 'sidebar_training',
    buildContent: function (container) {
        trainingSegments.forEach(function (seg) {
            var ref = trainingReference[seg.id];
            if (!ref) return;
            var details = document.createElement('details');
            details.className = 'ref-block';
            details.innerHTML = '<summary>' + getRefTitle(ref) + '</summary>' +
                '<div class="ref-body">' + getRefHtml(ref) + '</div>';
            container.appendChild(details);
        });
    }
});

/* ============ EVENT LISTENERS (modul-spezifisch) ============ */

document.getElementById('applyFilter').addEventListener('click', applySegmentFilter);

/* ============ INITIALISIERUNG ============ */

buildFilterCheckboxes();
injectSelectAllButton(document.querySelector('.segment-filters'));
applySegmentFilter();
