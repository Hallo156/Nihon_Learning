/* common.js — Shared: shuffleArray, ScoreTracker, showFeedback/clearFeedback
   Wird von ALLEN Modulen als erstes <script> geladen. */

/* --- Array-Helfer --- */

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/* --- Score-Tracking (nutzt <span id="correctCount"> / <span id="incorrectCount">) --- */

class ScoreTracker {
    constructor(correctSpanId, incorrectSpanId) {
        this.correct = 0;
        this.incorrect = 0;
        this.correctSpan = document.getElementById(correctSpanId);
        this.incorrectSpan = document.getElementById(incorrectSpanId);
    }

    addCorrect() {
        this.correct++;
        this.correctSpan.textContent = this.correct;
    }

    addIncorrect() {
        this.incorrect++;
        this.incorrectSpan.textContent = this.incorrect;
    }

    reset() {
        this.correct = 0;
        this.incorrect = 0;
        this.correctSpan.textContent = 0;
        this.incorrectSpan.textContent = 0;
    }
}

/* --- Feedback-Anzeige (setzt .feedback.correct / .feedback.incorrect) --- */

function showFeedback(elementId, message, isCorrect, isHTML) {
    const el = document.getElementById(elementId);
    if (isHTML) {
        el.innerHTML = message;
    } else {
        el.textContent = message;
    }
    el.className = 'feedback ' + (isCorrect ? 'correct' : 'incorrect');
}

function clearFeedback(elementId) {
    const el = document.getElementById(elementId);
    el.innerHTML = '';
    el.className = 'feedback';
}

/* --- Quick Answer (Auto-Weiter bei richtiger Antwort) --- */

let quickAnswerEnabled = localStorage.getItem('quickAnswer') === 'true';

function toggleQuickAnswer() {
    quickAnswerEnabled = !quickAnswerEnabled;
    localStorage.setItem('quickAnswer', String(quickAnswerEnabled));
    document.dispatchEvent(new CustomEvent('quickanswerchange'));
}

function isQuickAnswer() {
    return quickAnswerEnabled;
}

function injectQuickAnswerButton(container) {
    const btn = document.createElement('button');
    btn.id = 'quickAnswerToggle';
    btn.className = 'quick-answer-toggle' + (quickAnswerEnabled ? ' active' : '');
    btn.textContent = quickAnswerEnabled ? t('btn.quickOn') : t('btn.quickOff');
    btn.addEventListener('click', toggleQuickAnswer);
    container.appendChild(btn);

    document.addEventListener('quickanswerchange', () => {
        btn.className = 'quick-answer-toggle' + (quickAnswerEnabled ? ' active' : '');
        btn.textContent = quickAnswerEnabled ? t('btn.quickOn') : t('btn.quickOff');
    });
    document.addEventListener('langchange', () => {
        btn.textContent = quickAnswerEnabled ? t('btn.quickOn') : t('btn.quickOff');
    });
}
