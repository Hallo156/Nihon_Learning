/* Japanisch Lernprogramm — Erstellt von Hi156 unter Verwendung von Claude (Anthropic) */

/* adjective.js — Adjektiv-Trainer: Bedeutungs-Quiz (25 Adjektive, Satz → Bedeutung wählen).
   Zeigt vollständigen JP-Satz mit hervorgehobenem Adjektiv; Nutzer wählt korrekte Bedeutung.
   Zwei Modi per Toggle: "Zufällig" und "Wiederholung" (Spaced Repetition 70/30).
   Braucht: common.js, i18n.js, quiz-engine.js, adjective-data.js */

/* ============ HELFER: Sprach-abhängige Felder ============ */

function getAdjMeaning(a) {
    return currentLang === 'en' ? a.meaning_en : a.meaning_de;
}
function getAdjSentenceFilled(a) {
    return currentLang === 'en' ? a.sentence_en_filled : a.sentence_de_filled;
}

/* ============ DOM ============ */

const questionArea = document.getElementById('questionArea');
let adjRomajiEl = null;

/* ============ SICHTBARKEITS-TOGGLE (nur Romaji) ============ */

const adjContainer = document.querySelector('.adj-trainer');

const visState = buildVisibilityToggles({
    container: adjContainer,
    insertAfter: document.querySelector('.adj-trainer .mode-toggle'),
    target: adjContainer,
    toggles: [
        { key: 'adj_romaji', i18nKey: 'vis.romaji', cssClass: 'hide-romaji', defaultOn: true }
    ]
});

/* Romaji-Hint-Element unterhalb des Satzes */
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

    getPool: () => adjectivesData,

    renderQuestion: (a, eng) => {
        /* Vollständiger Satz — kein Highlight, Nutzer liest den ganzen Satz */
        questionArea.textContent = a.sentence_jp_filled;

        /* Romaji-Hint: (adjektiv = romaji) */
        if (adjRomajiEl) adjRomajiEl.textContent = '(' + a.adj + ' = ' + a.romaji + ')';

        /* 3 Bedeutungs-Choices in aktiver Sprache */
        let choices = [a];
        while (choices.length < 3) {
            const rand = adjectivesData[Math.floor(Math.random() * adjectivesData.length)];
            if (!choices.some(c => c.adj === rand.adj)) choices.push(rand);
        }
        shuffleArray(choices);

        eng.choicesArea.innerHTML = '';
        choices.forEach(adjObj => {
            const btn = document.createElement('button');
            btn.classList.add('choice-button');
            btn.textContent = getAdjMeaning(adjObj);
            btn.addEventListener('click', () => {
                if (eng.answered) return;
                eng.choicesArea.querySelectorAll('.choice-button').forEach(b => { b.disabled = true; });
                eng.finishAnswer(adjObj.adj === a.adj);
            });
            eng.choicesArea.appendChild(btn);
        });
    },

    buildFeedback: (a, isCorrect) => {
        const typeLabel = a.type === 'i' ? t('adj.typeI') : t('adj.typeNa');
        let html = '';
        if (isCorrect) {
            html += `<strong>${t('adj.correctMeaning', getAdjMeaning(a))}</strong><br>`;
        } else {
            html += `<strong>${t('adj.wrong')}</strong><br>`;
            html += `${t('adj.correctAns', getAdjMeaning(a))}<br>`;
        }
        html += `${t('adj.fullSentence')}: <strong>${a.sentence_jp_filled}</strong><br>`;
        html += `<em>${getAdjSentenceFilled(a)}</em><br>`;
        html += `<span class="romaji">(${a.adj} &mdash; ${a.romaji} &mdash; <span class="adj-type-inline ${a.type}">${typeLabel}</span>)</span>`;
        return html;
    }
});

/* ============ NACHSCHLAG-SIDEBAR ============ */

buildReferenceSidebar({
    storageKey: 'sidebar_adjective',
    buildContent: function (container) {
        ['i_adj', 'na_adj', 'grammar'].forEach(function (key) {
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
