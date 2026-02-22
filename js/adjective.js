/* Japanisch Lernprogramm — Erstellt von Hi156 unter Verwendung von Claude (Anthropic) */

/* adjective.js — Adjektiv-Trainer: Bedeutungs- + Zeitform-Quiz (25 Adjektive, 4 Formen je).
   Zeigt vollständigen JP-Satz; Nutzer wählt Bedeutung + Zeitform aus 4 Choices.
   Filter für Gegenwart / Vergangenheit / Verneinung (Geg.+Vgh.).
   Braucht: common.js, i18n.js, quiz-engine.js, adjective-data.js */

/* ============ FILTER-STATE ============ */

let activeAdjFormFilters = { present: true, past: true, negation: true };

function buildAdjPool() {
    const keys = [];
    if (activeAdjFormFilters.present)  keys.push('present');
    if (activeAdjFormFilters.past)     keys.push('past');
    if (activeAdjFormFilters.negation) { keys.push('neg_present'); keys.push('neg_past'); }
    const items = [];
    adjectivesData.forEach(a => {
        keys.forEach(fk => {
            const f = a.forms[fk];
            items.push({ base: a, formKey: fk, sentence_jp: f.jp, sentence_de: f.de, sentence_en: f.en,
                         adj_jp: f.adj_jp, adj_romaji: f.adj_romaji });
        });
    });
    return items;
}

function getAdjFormLabel(formKey) {
    switch (formKey) {
        case 'present':     return t('form.present');
        case 'past':        return t('form.past');
        case 'neg_present': return t('form.negPresent');
        case 'neg_past':    return t('form.negPast');
        default:            return formKey;
    }
}

function getAdjMeaning(a)       { return currentLang === 'en' ? a.meaning_en : a.meaning_de; }
function getAdjItemSentence(item) { return currentLang === 'en' ? item.sentence_en : item.sentence_de; }

/* ============ DOM ============ */

const questionArea = document.getElementById('questionArea');
let adjRomajiEl = null;

/* ============ SICHTBARKEITS-TOGGLE ============ */

const adjContainer = document.querySelector('.adj-trainer');

const visState = buildVisibilityToggles({
    container: adjContainer,
    insertAfter: document.querySelector('.adj-trainer .mode-toggle'),
    target: adjContainer,
    toggles: [
        { key: 'adj_romaji', i18nKey: 'vis.romaji', cssClass: 'hide-romaji', defaultOn: true }
    ]
});

adjRomajiEl = document.createElement('div');
adjRomajiEl.className = 'adj-romaji-hint';
questionArea.insertAdjacentElement('afterend', adjRomajiEl);

/* ============ QUIZ-ENGINE ============ */

const engine = new QuizEngine({
    feedbackId:      'feedbackArea',
    nextButtonId:    'nextButton',
    choicesAreaId:   'choicesArea',
    modeRandomId:    'modeRandom',
    modeSemiId:      'modeSemiRandom',
    correctSpanId:   'correctCount',
    incorrectSpanId: 'incorrectCount',
    quickAnswerTarget: '.score',

    getPool: () => buildAdjPool(),

    renderQuestion: (item, eng) => {
        questionArea.textContent = item.sentence_jp;
        if (adjRomajiEl) adjRomajiEl.textContent = '(' + item.adj_jp + ' = ' + item.adj_romaji + ')';

        /* Distractors: 3 items from active pool, distinct (base+form) from current */
        const pool = buildAdjPool();
        const others = pool.filter(x => !(x.base.adj === item.base.adj && x.formKey === item.formKey));
        shuffleArray(others);

        /* Try to include: 1 same-adj-diff-form, 1 diff-adj-same-form, 1 random */
        const distractors = [];
        const sameAdjDiff = others.find(x => x.base.adj === item.base.adj);
        if (sameAdjDiff) distractors.push(sameAdjDiff);
        const diffAdjSame = others.find(x => x.base.adj !== item.base.adj && x.formKey === item.formKey && !distractors.includes(x));
        if (diffAdjSame) distractors.push(diffAdjSame);
        for (const x of others) {
            if (distractors.length >= 3) break;
            if (!distractors.includes(x)) distractors.push(x);
        }

        const choices = [item, ...distractors.slice(0, 3)];
        shuffleArray(choices);

        eng.choicesArea.innerHTML = '';
        choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.classList.add('choice-button');
            btn.innerHTML = '<span class="choice-meaning">' + getAdjMeaning(choice.base) + '</span>' +
                            '<span class="choice-form">' + getAdjFormLabel(choice.formKey) + '</span>';
            btn.addEventListener('click', () => {
                if (eng.answered) return;
                eng.choicesArea.querySelectorAll('.choice-button').forEach(b => { b.disabled = true; });
                eng.finishAnswer(choice.base.adj === item.base.adj && choice.formKey === item.formKey);
            });
            eng.choicesArea.appendChild(btn);
        });
    },

    buildFeedback: (item, isCorrect) => {
        const meaning = getAdjMeaning(item.base);
        const formLabel = getAdjFormLabel(item.formKey);
        const typeLabel = item.base.type === 'i' ? t('adj.typeI') : t('adj.typeNa');
        const choiceLabel = meaning + ' – ' + formLabel;
        let html = '';
        if (isCorrect) {
            html += `<strong>${t('adj.correctMeaning', choiceLabel)}</strong><br>`;
        } else {
            html += `<strong>${t('adj.wrong')}</strong><br>`;
            html += `${t('adj.correctAns', choiceLabel)}<br>`;
        }
        html += `${t('adj.fullSentence')}: <strong>${item.sentence_jp}</strong><br>`;
        html += `<em>${getAdjItemSentence(item)}</em><br>`;
        html += `<span class="romaji">(${item.adj_jp} &mdash; ${item.adj_romaji} &mdash; <span class="adj-type-inline ${item.base.type}">${typeLabel}</span>)</span>`;
        return html;
    }
});

/* ============ FORM-FILTER ============ */

document.getElementById('applyFormFilter').addEventListener('click', () => {
    activeAdjFormFilters.present  = document.getElementById('filterPresent').checked;
    activeAdjFormFilters.past     = document.getElementById('filterPast').checked;
    activeAdjFormFilters.negation = document.getElementById('filterNeg').checked;
    if (!activeAdjFormFilters.present && !activeAdjFormFilters.past && !activeAdjFormFilters.negation) {
        document.getElementById('filterPresent').checked = true;
        activeAdjFormFilters.present = true;
    }
    engine.resetQuiz();
});

/* ============ NACHSCHLAG-SIDEBAR ============ */

buildReferenceSidebar({
    storageKey: 'sidebar_adjective',
    buildContent: function (container) {
        ['zeitformen', 'i_adj', 'na_adj'].forEach(function (key) {
            const ref = adjReference[key];
            const details = document.createElement('details');
            details.className = 'ref-block';
            details.innerHTML = '<summary>' + getLangField(ref, 'title', 'title_en') + '</summary>' +
                '<div class="ref-body">' + getLangField(ref, 'html', 'html_en') + '</div>';
            container.appendChild(details);
        });
    }
});

/* ============ INIT ============ */

engine.loadQuestion();
