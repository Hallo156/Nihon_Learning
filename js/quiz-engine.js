/* Japanisch Lernprogramm — Erstellt von Hi156 unter Verwendung von Claude (Anthropic) */

/* quiz-engine.js — Gemeinsame Quiz-Logik: QuizEngine-Klasse, getLangField(), buildVisibilityToggles().
   Wird nach common.js und i18n.js geladen, vor Daten- und Modul-Scripts.
   Reihenfolge: common.js → i18n.js → quiz-engine.js → [data.js] → [modul.js] */

/* ============ SPRACH-HELFER ============ */

/**
 * Gibt das sprach-abhaengige Feld eines Datenobjekts zurueck.
 * Konvention: EN-Key = deKey + '_en' (z.B. 'prompt' → 'prompt_en').
 * @param {Object} obj  - Datenobjekt (z.B. eine Frage, ein Segment)
 * @param {string} deKey - Schluessel fuer das deutsche Feld
 * @param {string} [enKey] - Optionaler expliziter EN-Schluessel (sonst deKey + '_en')
 * @returns {*} EN-Wert wenn currentLang==='en' und vorhanden, sonst DE-Wert
 */
function getLangField(obj, deKey, enKey) {
    if (currentLang === 'en') {
        const k = enKey || (deKey + '_en');
        const val = obj[k];
        if (val !== undefined && val !== null) return val;
    }
    return obj[deKey];
}

/* ============ SICHTBARKEITS-TOGGLES ============ */

/**
 * Erzeugt eine Toggle-Leiste (Romaji / Uebersetzung / ...) und fuegt sie ins DOM ein.
 *
 * @param {Object} config
 * @param {HTMLElement} config.container      - Parent-Element in das die Leiste eingefuegt wird
 * @param {HTMLElement} [config.insertBefore] - Vor diesem Element einfuegen (sonst prepend)
 * @param {HTMLElement} [config.insertAfter]  - Nach diesem Element einfuegen (hat Vorrang vor insertBefore)
 * @param {HTMLElement} config.target         - Element auf dem CSS-Klassen getoggelt werden
 * @param {Array} config.toggles             - Array von Toggle-Definitionen:
 *   { key: localStorage-Key, i18nKey: i18n-Schluessel, cssClass: CSS-Klasse fuer hide,
 *     defaultOn: true/false, onToggle: optionale Callback-Funktion }
 * @returns {Object} State-Objekt mit { [key]: boolean } fuer jeden Toggle
 */
function buildVisibilityToggles(config) {
    const state = {};
    const buttons = [];

    const bar = document.createElement('div');
    bar.className = 'map-vis-toggles';

    config.toggles.forEach(toggle => {
        const isOn = localStorage.getItem(toggle.key) !== 'false'
            && (localStorage.getItem(toggle.key) !== null || toggle.defaultOn !== false);
        state[toggle.key] = isOn;

        const btn = document.createElement('button');
        btn.className = 'map-vis-btn' + (isOn ? ' active' : '');
        btn.textContent = '\u{1F441} ' + t(toggle.i18nKey);

        btn.addEventListener('click', () => {
            state[toggle.key] = !state[toggle.key];
            localStorage.setItem(toggle.key, state[toggle.key]);
            btn.classList.toggle('active', state[toggle.key]);
            if (config.target) {
                config.target.classList.toggle(toggle.cssClass, !state[toggle.key]);
            }
            if (toggle.onToggle) toggle.onToggle(state[toggle.key]);
        });

        // Initial: CSS-Klasse setzen wenn ausgeschaltet
        if (!isOn && config.target) {
            config.target.classList.add(toggle.cssClass);
        }

        bar.appendChild(btn);
        buttons.push({ btn, toggle });
    });

    // Sprachewechsel: Button-Text aktualisieren
    document.addEventListener('langchange', () => {
        buttons.forEach(({ btn, toggle }) => {
            btn.textContent = '\u{1F441} ' + t(toggle.i18nKey);
        });
    });

    // Ins DOM einfuegen
    if (config.insertAfter) {
        config.insertAfter.insertAdjacentElement('afterend', bar);
    } else if (config.insertBefore) {
        config.container.insertBefore(bar, config.insertBefore);
    } else {
        config.container.prepend(bar);
    }

    return state;
}

/* ============ QUIZ-ENGINE KLASSE ============ */

/**
 * QuizEngine — Gemeinsamer Quiz-Lifecycle fuer Standard-Quiz-Module.
 *
 * Config-Objekt:
 *   DOM-IDs (optional — Features werden uebersprungen wenn Element fehlt):
 *     feedbackId, nextButtonId, choicesAreaId, textInputId, checkButtonId,
 *     displayAreaId, inputAreaId, modeRandomId, modeSemiId
 *   Score-IDs: correctSpanId, incorrectSpanId
 *   Quick-Answer: quickAnswerTarget (CSS-Selector)
 *
 *   Pflicht-Callbacks:
 *     getPool()                      → Array der aktuellen Fragen
 *     renderQuestion(item, engine)   → Frage ins DOM rendern
 *     buildFeedback(item, isCorrect) → HTML-String fuer Feedback
 *
 *   Optionale Callbacks:
 *     checkText(input, item) → boolean (Texteingabe-Validierung)
 *     onCorrect(item)        → nach richtiger Antwort
 *     onIncorrect(item)      → nach falscher Antwort
 *     onReset()              → bei Quiz-Reset
 *     onLangChange()         → bei Sprachwechsel (vor loadQuestion)
 */
class QuizEngine {
    constructor(config) {
        this.config = config;

        /* --- State --- */
        this.currentMode = 'random';
        this.remainingQuestions = [];
        this.incorrectQuestions = [];
        this.currentQuestion = null;
        this.answered = false;

        /* --- DOM-Referenzen (null-safe) --- */
        this.feedbackEl = this._el(config.feedbackId);
        this.nextButton = this._el(config.nextButtonId);
        this.choicesArea = this._el(config.choicesAreaId);
        this.textInput = this._el(config.textInputId);
        this.checkButton = this._el(config.checkButtonId);
        this.displayArea = this._el(config.displayAreaId);
        this.inputArea = this._el(config.inputAreaId);

        /* --- Score --- */
        this.score = new ScoreTracker(
            config.correctSpanId || 'correctCount',
            config.incorrectSpanId || 'incorrectCount'
        );

        /* --- Events binden --- */
        this._bindEvents(config);

        /* --- Quick Answer --- */
        if (config.quickAnswerTarget) {
            const target = document.querySelector(config.quickAnswerTarget);
            if (target) injectQuickAnswerButton(target.parentElement || target);
        }
    }

    /* --- Interner Helfer: getElementById mit null-Safety --- */
    _el(id) {
        return id ? document.getElementById(id) : null;
    }

    /* ============ SPACED REPETITION (70/30) ============ */

    selectNextQuestion() {
        const pool = this.config.getPool();
        if (!pool || pool.length === 0) return null;

        if (this.currentMode === 'random') {
            return pool[Math.floor(Math.random() * pool.length)];
        }

        // Semi-Random: Pools auffuellen wenn beide leer
        if (this.remainingQuestions.length === 0
            && this.incorrectQuestions.length === 0) {
            this.remainingQuestions = [...pool];
            shuffleArray(this.remainingQuestions);
        }

        // 30% Chance aus der Falsch-Queue
        if (this.incorrectQuestions.length > 0 && Math.random() < 0.3) {
            return this.incorrectQuestions.shift();
        }

        // Aus Remaining-Queue
        if (this.remainingQuestions.length > 0) {
            return this.remainingQuestions.shift();
        }

        // Fallback: nur noch Falsche uebrig
        return this.incorrectQuestions.shift();
    }

    /* ============ FRAGE LADEN ============ */

    loadQuestion() {
        const pool = this.config.getPool();
        if (!pool || pool.length === 0) return;

        this.currentQuestion = this.selectNextQuestion();
        this.answered = false;

        /* DOM zuruecksetzen */
        if (this.feedbackEl) clearFeedback(this.config.feedbackId);
        if (this.nextButton) this.nextButton.style.display = 'none';
        if (this.choicesArea) this.choicesArea.innerHTML = '';
        if (this.textInput) {
            this.textInput.value = '';
            this.textInput.disabled = false;
        }
        if (this.checkButton) this.checkButton.disabled = false;

        /* Modul-spezifisches Rendering */
        this.config.renderQuestion(this.currentQuestion, this);

        /* Textfeld fokussieren wenn sichtbar */
        if (this.textInput && this.inputArea
            && this.inputArea.style.display !== 'none') {
            this.textInput.focus();
        }
    }

    /* ============ MC-BUTTONS RENDERN ============ */

    /**
     * Erzeugt Standard-MC-Buttons im choicesArea.
     * @param {string[]} choices - Antwortmoeglichkeiten
     * @param {Function} onSelect - Callback(selectedText) bei Klick
     */
    renderChoiceButtons(choices, onSelect) {
        if (!this.choicesArea) return;
        this.choicesArea.innerHTML = '';
        choices.forEach(text => {
            const btn = document.createElement('button');
            btn.classList.add('choice-button');
            btn.textContent = text;
            btn.addEventListener('click', () => {
                if (this.answered) return;
                onSelect(text);
            });
            this.choicesArea.appendChild(btn);
        });
    }

    /* ============ MC-ANTWORT PRUEFEN ============ */

    /**
     * Prueft eine MC-Antwort, faerbt Buttons ein und ruft finishAnswer auf.
     * @param {string} selected - Gewaehlter Text
     * @param {string[]} correctArr - Array korrekter Antworten
     */
    handleMCAnswer(selected, correctArr) {
        if (this.answered) return;

        const isCorrect = correctArr.some(
            c => c.toLowerCase() === selected.toLowerCase()
        );

        /* Buttons einfaerben */
        if (this.choicesArea) {
            this.choicesArea.querySelectorAll('.choice-button').forEach(btn => {
                btn.disabled = true;
                if (correctArr.some(c => c.toLowerCase() === btn.textContent.toLowerCase())) {
                    btn.classList.add('correct-choice');
                }
                if (btn.textContent === selected && !isCorrect) {
                    btn.classList.add('wrong-choice');
                }
            });
        }

        this.finishAnswer(isCorrect);
    }

    /* ============ TEXTEINGABE PRUEFEN ============ */

    handleTextSubmit() {
        if (this.answered) return;
        if (!this.textInput) return;
        const input = this.textInput.value.trim();
        if (!input) return;

        let isCorrect = false;
        if (this.config.checkText) {
            isCorrect = this.config.checkText(input, this.currentQuestion);
        }

        this.finishAnswer(isCorrect);
    }

    /* ============ ANTWORT AUSWERTEN ============ */

    finishAnswer(isCorrect) {
        this.answered = true;
        if (this.textInput) this.textInput.disabled = true;
        if (this.checkButton) this.checkButton.disabled = true;

        /* Alle MC-Buttons deaktivieren */
        if (this.choicesArea) {
            this.choicesArea.querySelectorAll('.choice-button')
                .forEach(btn => { btn.disabled = true; });
        }

        /* Score */
        if (isCorrect) {
            this.score.addCorrect();
            if (this.config.onCorrect) this.config.onCorrect(this.currentQuestion);
        } else {
            this.score.addIncorrect();
            if (this.currentMode === 'semi-random') {
                this.incorrectQuestions.push(this.currentQuestion);
            }
            if (this.config.onIncorrect) this.config.onIncorrect(this.currentQuestion);
        }

        /* Feedback */
        const feedbackHTML = this.config.buildFeedback(this.currentQuestion, isCorrect);
        if (this.feedbackEl) {
            this.feedbackEl.innerHTML = feedbackHTML;
            this.feedbackEl.className = 'feedback ' + (isCorrect ? 'correct' : 'incorrect');
        }

        /* Quick Answer oder Next-Button */
        if (isCorrect && isQuickAnswer()) {
            setTimeout(() => this.loadQuestion(), 400);
        } else if (this.nextButton) {
            this.nextButton.style.display = 'block';
        }
    }

    /* ============ QUIZ RESET ============ */

    resetQuiz() {
        this.score.reset();
        const pool = this.config.getPool();
        this.remainingQuestions = pool ? [...pool] : [];
        shuffleArray(this.remainingQuestions);
        this.incorrectQuestions = [];
        if (this.config.onReset) this.config.onReset();
        this.loadQuestion();
    }

    /* ============ MODUS-WECHSEL ============ */

    switchMode(mode) {
        this.currentMode = mode;
        const randomBtn = this._el(this.config.modeRandomId);
        const semiBtn = this._el(this.config.modeSemiId);
        if (randomBtn) randomBtn.classList.toggle('active', mode === 'random');
        if (semiBtn) semiBtn.classList.toggle('active', mode === 'semi-random');
        this.resetQuiz();
    }

    /* ============ EVENT-BINDING ============ */

    _bindEvents(config) {
        /* Next-Button */
        if (this.nextButton) {
            this.nextButton.addEventListener('click', () => this.loadQuestion());
        }

        /* Texteingabe: Enter + Check-Button */
        if (this.textInput) {
            this.textInput.addEventListener('keydown', e => {
                if (e.key === 'Enter') this.handleTextSubmit();
            });
        }
        if (this.checkButton) {
            this.checkButton.addEventListener('click', () => this.handleTextSubmit());
        }

        /* Mode-Toggle */
        const randomBtn = this._el(config.modeRandomId);
        const semiBtn = this._el(config.modeSemiId);
        if (randomBtn) {
            randomBtn.addEventListener('click', () => this.switchMode('random'));
        }
        if (semiBtn) {
            semiBtn.addEventListener('click', () => this.switchMode('semi-random'));
        }

        /* Sprachwechsel */
        document.addEventListener('langchange', () => {
            if (config.onLangChange) config.onLangChange();
            if (this.currentQuestion) this.loadQuestion();
        });
    }
}
