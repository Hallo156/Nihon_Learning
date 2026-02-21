/* Japanisch Lernprogramm — Erstellt von Hi156 unter Verwendung von Claude (Anthropic) */

/* transport.js — Verkehr & Fortbewegung: Ketten-Visualisierung, Quiz-Logik, Spaced Repetition */

/* ============ STATE ============ */

let currentMode   = 'random';   // 'random' | 'spaced'
let inputMode     = 'mc';       // 'mc' | 'text'
let currentRoute  = null;       // aktuelles Route-Objekt
let questionIndex = 0;          // welche Frage innerhalb der Route
let answered      = false;

let remaining   = [];
let incorrectPool = [];
let score;

let showRomaji      = localStorage.getItem('transport_romaji')      !== 'false';
let showTranslation = localStorage.getItem('transport_translation') !== 'false';

/* ============ DOM-REFS ============ */

const chainContainer  = document.getElementById('chainContainer');
const questionArea    = document.getElementById('questionArea');
const feedbackArea    = document.getElementById('feedbackArea');
const nextButton      = document.getElementById('nextButton');
const modeRandomBtn   = document.getElementById('modeRandom');
const modeSemiBtn     = document.getElementById('modeSemiRandom');
const inputMCBtn      = document.getElementById('inputModeMC');
const inputTextBtn    = document.getElementById('inputModeText');

/* ============ VISIBILITY TOGGLES (Romaji / Übersetzung) ============ */

function injectVisibilityToggles(container) {
    const bar = document.createElement('div');
    bar.className = 'map-vis-toggles';

    const romajiBtn = document.createElement('button');
    romajiBtn.className = 'map-vis-btn' + (showRomaji ? ' active' : '');
    romajiBtn.textContent = '👁 ' + t('transport.toggleRomaji');
    romajiBtn.addEventListener('click', () => {
        showRomaji = !showRomaji;
        localStorage.setItem('transport_romaji', showRomaji);
        romajiBtn.classList.toggle('active', showRomaji);
        refreshChainVisibility();
    });

    const transBtn = document.createElement('button');
    transBtn.className = 'map-vis-btn' + (showTranslation ? ' active' : '');
    transBtn.textContent = '👁 ' + t('transport.toggleTranslation');
    transBtn.addEventListener('click', () => {
        showTranslation = !showTranslation;
        localStorage.setItem('transport_translation', showTranslation);
        transBtn.classList.toggle('active', showTranslation);
        refreshChainVisibility();
    });

    bar.appendChild(romajiBtn);
    bar.appendChild(transBtn);
    const inputModeToggleEl = document.getElementById('inputModeToggle');
    if (inputModeToggleEl) {
        inputModeToggleEl.insertAdjacentElement('afterend', bar);
    } else {
        container.insertBefore(bar, container.firstChild);
    }
}

function refreshChainVisibility() {
    document.querySelectorAll('.chain-romaji').forEach(el => {
        el.style.display = showRomaji ? '' : 'none';
    });
    document.querySelectorAll('.chain-translation').forEach(el => {
        el.style.display = showTranslation ? '' : 'none';
    });
}

/* ============ TRANSPORT-ICON SVGs ============ */

function getTransportSVG(iconId, color) {
    const c = color || '#666';
    const svgs = {

        /* Strichmännchen geht */
        walk: `<svg viewBox="0 0 40 58" width="30" height="44">
                 <circle cx="20" cy="7" r="5.5" fill="${c}"/>
                 <line x1="20" y1="13" x2="20" y2="33" stroke="${c}" stroke-width="3.5" stroke-linecap="round"/>
                 <line x1="20" y1="21" x2="9"  y2="30" stroke="${c}" stroke-width="3"   stroke-linecap="round"/>
                 <line x1="20" y1="21" x2="31" y2="30" stroke="${c}" stroke-width="3"   stroke-linecap="round"/>
                 <line x1="20" y1="33" x2="11" y2="51" stroke="${c}" stroke-width="3"   stroke-linecap="round"/>
                 <line x1="20" y1="33" x2="29" y2="51" stroke="${c}" stroke-width="3"   stroke-linecap="round"/>
               </svg>`,

        /* Lokomotive — rot mit schwarzem Kessel und Horn */
        train: `<svg viewBox="0 0 68 52" width="46" height="36">
                  <!-- Schienen -->
                  <line x1="2"  y1="46" x2="66" y2="46" stroke="#777" stroke-width="3" stroke-linecap="round"/>
                  <line x1="8"  y1="43" x2="8"  y2="49" stroke="#777" stroke-width="2"/>
                  <line x1="20" y1="43" x2="20" y2="49" stroke="#777" stroke-width="2"/>
                  <line x1="32" y1="43" x2="32" y2="49" stroke="#777" stroke-width="2"/>
                  <line x1="44" y1="43" x2="44" y2="49" stroke="#777" stroke-width="2"/>
                  <line x1="56" y1="43" x2="56" y2="49" stroke="#777" stroke-width="2"/>
                  <!-- Kessel (runder Körper) -->
                  <rect x="4" y="18" width="44" height="22" rx="4" fill="#c0392b"/>
                  <!-- Führerhaus -->
                  <rect x="46" y="12" width="18" height="28" rx="3" fill="#c0392b"/>
                  <!-- Führerhaus-Fenster -->
                  <rect x="49" y="15" width="12" height="10" rx="2" fill="white" opacity="0.9"/>
                  <!-- Kesselbänder -->
                  <line x1="18" y1="18" x2="18" y2="40" stroke="#922b21" stroke-width="2"/>
                  <line x1="30" y1="18" x2="30" y2="40" stroke="#922b21" stroke-width="2"/>
                  <!-- Schornstein -->
                  <rect x="10" y="8"  width="9" height="12" rx="2" fill="#222"/>
                  <rect x="7"  y="6"  width="15" height="5" rx="2" fill="#333"/>
                  <!-- Rauch-Puffs -->
                  <circle cx="14" cy="3" r="3" fill="#aaa" opacity="0.6"/>
                  <circle cx="20" cy="1" r="2" fill="#aaa" opacity="0.4"/>
                  <!-- Puffer vorne -->
                  <rect x="1"  y="28" width="5" height="8" rx="1" fill="#555"/>
                  <!-- Räder -->
                  <circle cx="14" cy="41" r="6" fill="#222" stroke="#555" stroke-width="1.5"/>
                  <circle cx="14" cy="41" r="2" fill="#888"/>
                  <circle cx="30" cy="41" r="6" fill="#222" stroke="#555" stroke-width="1.5"/>
                  <circle cx="30" cy="41" r="2" fill="#888"/>
                  <circle cx="55" cy="41" r="5" fill="#222" stroke="#555" stroke-width="1.5"/>
                  <circle cx="55" cy="41" r="2" fill="#888"/>
                </svg>`,

        /* U-Bahn — silbergrau, eckig, breite Nase */
        subway: `<svg viewBox="0 0 72 46" width="48" height="32">
                   <!-- Schienen -->
                   <line x1="2"  y1="42" x2="70" y2="42" stroke="#999" stroke-width="3" stroke-linecap="round"/>
                   <line x1="10" y1="39" x2="10" y2="45" stroke="#999" stroke-width="1.5"/>
                   <line x1="24" y1="39" x2="24" y2="45" stroke="#999" stroke-width="1.5"/>
                   <line x1="38" y1="39" x2="38" y2="45" stroke="#999" stroke-width="1.5"/>
                   <line x1="52" y1="39" x2="52" y2="45" stroke="#999" stroke-width="1.5"/>
                   <line x1="62" y1="39" x2="62" y2="45" stroke="#999" stroke-width="1.5"/>
                   <!-- Karosserie (silber) -->
                   <rect x="2" y="8" width="66" height="30" rx="3" fill="#b0b8c1"/>
                   <!-- Blaue Streifen -->
                   <rect x="2" y="8"  width="66" height="5"  rx="2" fill="#5b8dd9"/>
                   <rect x="2" y="33" width="66" height="5"  rx="0" fill="#5b8dd9"/>
                   <!-- Fenster-Reihe -->
                   <rect x="7"  y="14" width="11" height="8" rx="1" fill="#d0e8f8" opacity="0.95"/>
                   <rect x="22" y="14" width="11" height="8" rx="1" fill="#d0e8f8" opacity="0.95"/>
                   <rect x="37" y="14" width="11" height="8" rx="1" fill="#d0e8f8" opacity="0.95"/>
                   <rect x="52" y="14" width="11" height="8" rx="1" fill="#d0e8f8" opacity="0.95"/>
                   <!-- Türnaht -->
                   <line x1="19" y1="8" x2="19" y2="38" stroke="#8a9ab0" stroke-width="1"/>
                   <line x1="35" y1="8" x2="35" y2="38" stroke="#8a9ab0" stroke-width="1"/>
                   <line x1="50" y1="8" x2="50" y2="38" stroke="#8a9ab0" stroke-width="1"/>
                   <!-- Räder -->
                   <circle cx="14" cy="40" r="4" fill="#555"/>
                   <circle cx="30" cy="40" r="4" fill="#555"/>
                   <circle cx="44" cy="40" r="4" fill="#555"/>
                   <circle cx="60" cy="40" r="4" fill="#555"/>
                   <!-- Stromabnehmer -->
                   <line x1="36" y1="8"  x2="36" y2="2"  stroke="#777" stroke-width="1.5"/>
                   <line x1="28" y1="2"  x2="44" y2="2"  stroke="#777" stroke-width="2" stroke-linecap="round"/>
                 </svg>`,

        /* Bus — langer gelber Linienbus */
        bus: `<svg viewBox="0 0 80 50" width="52" height="34">
                <!-- Karosserie (lang, gelb) -->
                <rect x="2" y="10" width="74" height="30" rx="4" fill="#f5c800"/>
                <!-- Dach-Streifen -->
                <rect x="2" y="10" width="74" height="5" rx="3" fill="#e6b800"/>
                <!-- Unterer Abschluss -->
                <rect x="2" y="36" width="74" height="4" rx="0" fill="#c9a000"/>
                <!-- Frontscheibe -->
                <rect x="3"  y="13" width="12" height="12" rx="2" fill="#aee4f5" opacity="0.9"/>
                <!-- Seitenfenster -->
                <rect x="20" y="13" width="10" height="10" rx="1" fill="#aee4f5" opacity="0.85"/>
                <rect x="34" y="13" width="10" height="10" rx="1" fill="#aee4f5" opacity="0.85"/>
                <rect x="48" y="13" width="10" height="10" rx="1" fill="#aee4f5" opacity="0.85"/>
                <rect x="62" y="13" width="10" height="10" rx="1" fill="#aee4f5" opacity="0.85"/>
                <!-- Türlinie -->
                <line x1="17" y1="23" x2="17" y2="40" stroke="#c9a000" stroke-width="1.5"/>
                <!-- Linie-Schild vorne -->
                <rect x="5" y="27" width="10" height="7" rx="1" fill="white" opacity="0.8"/>
                <!-- Blinker -->
                <rect x="74" y="12" width="4" height="6" rx="1" fill="#ff9800" opacity="0.9"/>
                <!-- Räder -->
                <circle cx="16" cy="44" r="7" fill="#333"/>
                <circle cx="16" cy="44" r="3" fill="#888"/>
                <circle cx="62" cy="44" r="7" fill="#333"/>
                <circle cx="62" cy="44" r="3" fill="#888"/>
              </svg>`,

        /* Taxi — gelbes Auto mit TAXI-Schild */
        taxi: `<svg viewBox="0 0 58 46" width="40" height="32">
                 <rect x="6" y="16" width="46" height="20" rx="4" fill="${c}"/>
                 <polygon points="12,16 16,5 42,5 46,16" fill="${c}"/>
                 <!-- TAXI-Schild -->
                 <rect x="18" y="2" width="22" height="7" rx="2" fill="#111"/>
                 <text x="29" y="8" text-anchor="middle" font-size="5" fill="white" font-weight="bold" font-family="sans-serif">TAXI</text>
                 <!-- Fenster -->
                 <rect x="13" y="19" width="12" height="9" rx="2" fill="white" opacity="0.9"/>
                 <rect x="33" y="19" width="12" height="9" rx="2" fill="white" opacity="0.9"/>
                 <!-- Türnaht -->
                 <line x1="28" y1="16" x2="28" y2="36" stroke="#c9a000" stroke-width="1.5"/>
                 <!-- Räder -->
                 <circle cx="15" cy="40" r="7" fill="#222"/>
                 <circle cx="15" cy="40" r="3" fill="#999"/>
                 <circle cx="43" cy="40" r="7" fill="#222"/>
                 <circle cx="43" cy="40" r="3" fill="#999"/>
               </svg>`,

        /* Auto — normaler PKW */
        car: `<svg viewBox="0 0 58 44" width="40" height="30">
                <rect x="4" y="18" width="50" height="18" rx="4" fill="${c}"/>
                <polygon points="10,18 15,6 43,6 48,18" fill="${c}"/>
                <!-- Fenster -->
                <rect x="12" y="20" width="14" height="10" rx="2" fill="white" opacity="0.9"/>
                <rect x="32" y="20" width="14" height="10" rx="2" fill="white" opacity="0.9"/>
                <!-- Türnaht -->
                <line x1="28" y1="18" x2="28" y2="36" stroke="#0000001a" stroke-width="1.5"/>
                <!-- Lichter -->
                <rect x="4"  y="22" width="5" height="6" rx="1" fill="#fffde0" opacity="0.9"/>
                <rect x="49" y="22" width="5" height="6" rx="1" fill="#ff5252" opacity="0.8"/>
                <!-- Räder -->
                <circle cx="15" cy="39" r="7" fill="#222"/>
                <circle cx="15" cy="39" r="3" fill="#999"/>
                <circle cx="43" cy="39" r="7" fill="#222"/>
                <circle cx="43" cy="39" r="3" fill="#999"/>
              </svg>`,

        /* Flugzeug — Seitenansicht, fliegt nach rechts */
        plane: `<svg viewBox="0 0 72 48" width="48" height="32">
                  <!-- Rumpf -->
                  <ellipse cx="36" cy="26" rx="32" ry="9" fill="${c}"/>
                  <!-- Nase (vorne rechts spitz) -->
                  <ellipse cx="62" cy="26" rx="10" ry="6" fill="${c}"/>
                  <!-- Cockpit-Fenster -->
                  <ellipse cx="62" cy="24" rx="5" ry="4" fill="#aee4f5" opacity="0.9"/>
                  <!-- Tragflügel (oben) -->
                  <polygon points="28,26 44,26 36,6 22,8" fill="${c}" opacity="0.95"/>
                  <!-- Leitwerk hinten oben -->
                  <polygon points="6,26 18,26 12,12 4,14" fill="${c}" opacity="0.9"/>
                  <!-- Leitwerk unten (kleines Seitenruder) -->
                  <polygon points="6,26 16,26 10,38" fill="${c}" opacity="0.7"/>
                  <!-- Fensterreihe Rumpf -->
                  <circle cx="36" cy="23" r="2.5" fill="white" opacity="0.8"/>
                  <circle cx="44" cy="23" r="2.5" fill="white" opacity="0.8"/>
                  <circle cx="52" cy="23" r="2.5" fill="white" opacity="0.8"/>
                  <!-- Triebwerk -->
                  <ellipse cx="35" cy="33" rx="7" ry="3.5" fill="#555"/>
                  <ellipse cx="35" cy="33" rx="5" ry="2.5" fill="#333"/>
                </svg>`,

        /* Fahrrad */
        bike: `<svg viewBox="0 0 56 42" width="38" height="28">
                 <circle cx="12" cy="30" r="11" fill="none" stroke="${c}" stroke-width="3.5"/>
                 <circle cx="44" cy="30" r="11" fill="none" stroke="${c}" stroke-width="3.5"/>
                 <polyline points="12,30 22,10 34,10 44,30" fill="none" stroke="${c}" stroke-width="3" stroke-linejoin="round"/>
                 <line x1="22" y1="10" x2="28" y2="30" stroke="${c}" stroke-width="2.5"/>
                 <circle cx="22" cy="9"  r="3" fill="${c}"/>
                 <rect x="18" y="6" width="10" height="3" rx="1.5" fill="${c}"/>
               </svg>`
    };
    return svgs[iconId] || `<svg viewBox="0 0 40 40" width="30" height="30"><circle cx="20" cy="20" r="15" fill="${c}"/></svg>`;
}

/* ============ KETTEN-RENDERING ============ */

function buildChain(route, activeQuestionIdx) {
    const activeQ = route.questions[activeQuestionIdx];
    const activeStepIdx = activeQ ? activeQ.stepIndex : -1;

    // Alle Transport-Indizes die noch offene Fragen sind (ab der aktuellen)
    const futureQuestionSteps = new Set(
        route.questions.slice(activeQuestionIdx + 1).map(q => q.stepIndex)
    );

    let html = '<div class="chain">';

    route.nodes.forEach((node, i) => {
        if (node.type === 'place') {
            const place = getPlace(node.id);
            if (!place) return;
            html += `<div class="chain-node chain-place">
                <div class="chain-place-icon">${place.icon}</div>
                <div class="chain-place-jp">${place.kanji || place.jp}</div>
                <div class="chain-romaji chain-place-romaji">${place.romaji}</div>
                <div class="chain-translation chain-place-trans">${currentLang === 'en' ? place.en : place.de}</div>
            </div>`;
        } else {
            // transport node
            const mode = getMode(node.id);
            if (!mode) return;
            const isActiveGap  = (i === activeStepIdx);
            const isFutureGap  = futureQuestionSteps.has(i);

            if (isActiveGap || isFutureGap) {
                // Aktuelle oder zukünftige Lücke: ??? anzeigen
                // Zukünftige Lücken haben weniger Pulsieren (ruhiger)
                const gapClass = isFutureGap && !isActiveGap ? 'chain-gap-icon chain-gap-future' : 'chain-gap-icon';
                html += `<div class="chain-link chain-link-gap${isFutureGap && !isActiveGap ? ' chain-link-gap-future' : ''}">
                    <div class="chain-link-icon-wrap">
                        <div class="${gapClass}">?</div>
                    </div>
                    <div class="chain-link-line chain-link-line-gap"></div>
                    <div class="chain-link-label chain-link-label-gap">???</div>
                </div>`;
            } else {
                // Bereits beantworteter oder bekannter Schritt (vor der aktuellen Frage)
                html += `<div class="chain-link chain-link-known" style="--link-color:${mode.color}">
                    <div class="chain-link-icon-wrap">
                        <div class="chain-link-icon">${getTransportSVG(mode.icon, mode.color)}</div>
                    </div>
                    <div class="chain-link-line" style="background:${mode.color}"></div>
                    <div class="chain-link-label">
                        <span class="chain-link-jp">${mode.kanji || mode.jp}</span>
                        <span class="chain-romaji chain-link-romaji">${mode.romaji}</span>
                        <span class="chain-translation chain-link-trans">${currentLang === 'en' ? mode.en : mode.de}</span>
                    </div>
                </div>`;
            }
        }
    });

    html += '</div>';
    return html;
}

function renderChain() {
    if (!currentRoute) { chainContainer.innerHTML = ''; return; }
    chainContainer.innerHTML = buildChain(currentRoute, questionIndex);
    refreshChainVisibility();
}

/* ============ FRAGE RENDERN ============ */

function renderQuestion() {
    clearFeedback('feedbackArea');
    answered = false;
    nextButton.style.display = 'none';
    questionArea.innerHTML = '';

    if (!currentRoute) { questionArea.innerHTML = `<p>${t('transport.noRoute')}</p>`; return; }
    const q = currentRoute.questions[questionIndex];
    if (!q) return;

    // Icon für die Frage: bei normalen Mode-Fragen = correctMode,
    // bei Verb-Fragen (norimasu/orimasu) = das Fahrzeug am stepIndex der Kette
    let questionIconMode = getMode(q.correctId);
    if (!questionIconMode && currentRoute && q.stepIndex !== undefined) {
        const chainNode = currentRoute.nodes[q.stepIndex];
        if (chainNode && chainNode.type === 'transport') {
            questionIconMode = getMode(chainNode.id);
        }
    }
    if (questionIconMode) {
        const iconWrap = document.createElement('div');
        iconWrap.className = 'transport-question-icon';
        iconWrap.innerHTML = getTransportSVG(questionIconMode.icon, questionIconMode.color);
        questionArea.appendChild(iconWrap);
    }

    // Textliche Frage (ohne Nennung des Transportmittels)
    const promptEl = document.createElement('p');
    promptEl.className = 'transport-prompt';
    let promptText = currentLang === 'en' ? q.prompt_en : q.prompt_de;
    // Ersetze {0}, {1} durch Ortsnamen
    q.promptArgs.forEach((placeId, idx) => {
        const pl = getPlace(placeId);
        if (pl) promptText = promptText.replace('{' + idx + '}', pl.kanji || pl.jp);
    });
    promptEl.innerHTML = promptText;
    questionArea.appendChild(promptEl);

    if (inputMode === 'mc') {
        renderMCChoices(q);
    } else {
        renderTextInput(q);
    }
}

function renderMCChoices(q) {
    const area = document.createElement('div');
    area.className = 'choices-area transport-sentence-area';
    area.dataset.correctId = q.correctId;

    // Satz-Optionen (sentenceOptions) bevorzugen, sonst Fallback auf choices[]
    if (q.sentenceOptions && q.sentenceOptions.length > 0) {
        const opts = [...q.sentenceOptions];
        shuffleArray(opts);

        opts.forEach(opt => {
            const mode = getMode(opt.modeId);
            const color = mode ? mode.color : '#007bff';
            const btn = document.createElement('button');
            btn.className = 'choice-button transport-sentence-choice';
            btn.dataset.modeId = opt.modeId;
            btn.style.setProperty('--choice-color', color);
            btn.innerHTML = `<span class="tsc-jp">${opt.jp}</span>
                             <span class="tsc-romaji chain-romaji">${opt.romaji}</span>
                             <span class="tsc-trans chain-translation">${currentLang === 'en' ? opt.en : opt.de}</span>`;
            btn.addEventListener('click', () => handleChoice(opt.modeId, q, area));
            area.appendChild(btn);
        });
    } else {
        // Fallback: einfache Vokabel-Buttons (für Routen ohne sentenceOptions)
        const choices = [...q.choices];
        shuffleArray(choices);
        choices.forEach(modeId => {
            const mode = getMode(modeId);
            if (!mode) return;
            const btn = document.createElement('button');
            btn.className = 'choice-button transport-choice';
            btn.dataset.modeId = modeId;
            btn.innerHTML = `<span class="tc-label">
                               <span class="tc-jp">${mode.kanji || mode.jp}</span>
                               <span class="tc-romaji chain-romaji">${mode.romaji}</span>
                               <span class="tc-trans chain-translation">${currentLang === 'en' ? mode.en : mode.de}</span>
                             </span>`;
            btn.style.setProperty('--choice-color', mode.color);
            btn.addEventListener('click', () => handleChoice(modeId, q, area));
            area.appendChild(btn);
        });
    }

    questionArea.appendChild(area);
    refreshChainVisibility();
}

function renderTextInput(q) {
    const div = document.createElement('div');
    div.className = 'input-area';

    const inp = document.createElement('input');
    inp.type = 'text';
    inp.id   = 'transportInput';
    inp.placeholder = t('input.answer');
    inp.setAttribute('data-i18n-placeholder', 'input.answer');

    const checkBtn = document.createElement('button');
    checkBtn.textContent = t('btn.check');
    checkBtn.setAttribute('data-i18n', 'btn.check');
    checkBtn.addEventListener('click', () => checkText(inp.value, q));
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') checkText(inp.value, q); });

    div.appendChild(inp);
    div.appendChild(checkBtn);
    questionArea.appendChild(div);
    setTimeout(() => inp.focus(), 50);
}

/* ============ ANTWORT-HANDLER ============ */

function handleChoice(modeId, q, choicesEl) {
    if (answered) return;
    answered = true;

    const correct = (modeId === q.correctId);
    choicesEl.querySelectorAll('.transport-choice, .transport-sentence-choice').forEach(btn => {
        btn.disabled = true;
        const btnId = btn.dataset.modeId;
        if (btnId === q.correctId) btn.classList.add('correct-choice');
        else if (btnId === modeId && !correct) btn.classList.add('wrong-choice');
    });

    finishAnswer(correct, q);
}

function checkText(val, q) {
    if (answered) return;
    answered = true;

    // Normalisierung: Groß/Klein, mehrfache Leerzeichen, japanische Leerzeichen und Satzpunkte
    function normalize(s) {
        return s.trim().toLowerCase()
            .replace(/\u3000/g, ' ')   // Volles Leerzeichen → halbes
            .replace(/\s+/g, ' ')      // Mehrere Leerzeichen → eines
            .replace(/。$/g, '')       // Satzpunkt am Ende entfernen
            .replace(/\.$/g, '')       // Punkt am Ende entfernen
            .trim();
    }

    const input = normalize(val);

    // 1) Klassische correct[]-Einträge (kurze Kana/Romaji-Wörter)
    let isCorrect = q.correct.some(c => normalize(c) === input);

    // 2) Vollständige Satz-Eingabe akzeptieren: JP-Kana oder Romaji der richtigen sentenceOption
    if (!isCorrect && q.sentenceOptions) {
        const correctOpt = q.sentenceOptions.find(o => o.modeId === q.correctId);
        if (correctOpt) {
            isCorrect = normalize(correctOpt.romaji) === input ||
                        normalize(correctOpt.jp)     === input;
        }
    }

    finishAnswer(isCorrect, q);
}

function getCorrectLabel(q) {
    // Versuche Transport-Mode zu holen (normale Fragen)
    const mode = getMode(q.correctId);
    if (mode) return mode.kanji || mode.jp;
    // Fallback für Verb-Fragen (norimasu/orimasu): JP aus sentenceOptions holen
    if (q.sentenceOptions) {
        const opt = q.sentenceOptions.find(o => o.modeId === q.correctId);
        if (opt) return opt.jp;
    }
    // Letzter Fallback: correctId selbst
    return q.correct[0] || '?';
}

function finishAnswer(correct, q) {
    if (correct) {
        score.addCorrect();
        const explanation = currentLang === 'en' ? q.explanation_en : q.explanation_de;
        showFeedback('feedbackArea', `${t('feedback.correct')} ${explanation}`, true);
        if (isQuickAnswer()) {
            setTimeout(advanceQuestion, 400);
        } else {
            nextButton.style.display = 'block';
        }
    } else {
        score.addIncorrect();
        if (currentMode === 'spaced') incorrectPool.push(currentRoute);
        const explanation = currentLang === 'en' ? q.explanation_en : q.explanation_de;
        const correctLabel = getCorrectLabel(q);
        showFeedback('feedbackArea', `${t('feedback.wrong')} ${t('feedback.correctIs')} ${correctLabel} — ${explanation}`, false);
        nextButton.style.display = 'block';
    }
    // Kette neu rendern mit aufgedecktem Transportmittel
    renderChainRevealed(q);
}

function renderChainRevealed(q) {
    if (!currentRoute) return;
    const activeStepIdx = q.stepIndex;
    // Bei Verb-Fragen (norimasu/orimasu): das Fahrzeug aus dem Ketten-Node nehmen
    let mode = getMode(q.correctId);
    if (!mode) {
        const chainNode = currentRoute.nodes[q.stepIndex];
        if (chainNode && chainNode.type === 'transport') mode = getMode(chainNode.id);
    }
    if (!mode) return;

    // Lücke durch das richtige Transportmittel ersetzen (aufgedeckt)
    const gapEl = chainContainer.querySelector('.chain-link-gap');
    if (gapEl) {
        gapEl.className = 'chain-link chain-link-revealed';
        gapEl.style.setProperty('--link-color', mode.color);
        gapEl.innerHTML = `
            <div class="chain-link-icon-wrap">
                <div class="chain-link-icon">${getTransportSVG(mode.icon, mode.color)}</div>
            </div>
            <div class="chain-link-line" style="background:${mode.color}"></div>
            <div class="chain-link-label">
                <span class="chain-link-jp">${mode.kanji || mode.jp}</span>
                <span class="chain-romaji chain-link-romaji">${mode.romaji}</span>
                <span class="chain-translation chain-link-trans">${currentLang === 'en' ? mode.en : mode.de}</span>
            </div>`;
        refreshChainVisibility();
    }
}

/* ============ FORTSCHRITT ============ */

function advanceQuestion() {
    clearFeedback('feedbackArea');
    nextButton.style.display = 'none';

    questionIndex++;
    if (questionIndex < currentRoute.questions.length) {
        renderChain();
        renderQuestion();
    } else {
        loadNextRoute();
    }
}

/* ============ ROUTE-MANAGEMENT ============ */

function buildPool() {
    remaining = [...transportRoutes];
    shuffleArray(remaining);
    incorrectPool = [];
}

function pickNextRoute() {
    if (currentMode === 'spaced' && Math.random() < 0.3 && incorrectPool.length > 0) {
        const idx = Math.floor(Math.random() * incorrectPool.length);
        const r = incorrectPool[idx];
        incorrectPool.splice(idx, 1);
        return r;
    }
    if (remaining.length === 0) {
        remaining = [...transportRoutes];
        shuffleArray(remaining);
    }
    return remaining.pop();
}

function loadNextRoute() {
    currentRoute  = pickNextRoute();
    questionIndex = 0;
    answered      = false;
    clearFeedback('feedbackArea');
    nextButton.style.display = 'none';
    renderChain();
    renderQuestion();
}

function resetQuiz() {
    score.reset();
    buildPool();
    loadNextRoute();
}

/* ============ EVENTS ============ */

nextButton.addEventListener('click', advanceQuestion);

modeRandomBtn.addEventListener('click', () => {
    currentMode = 'random';
    modeRandomBtn.classList.add('active');
    modeSemiBtn.classList.remove('active');
    resetQuiz();
});

modeSemiBtn.addEventListener('click', () => {
    currentMode = 'spaced';
    modeSemiBtn.classList.add('active');
    modeRandomBtn.classList.remove('active');
    resetQuiz();
});

inputMCBtn.addEventListener('click', () => {
    inputMode = 'mc';
    inputMCBtn.classList.add('active');
    inputTextBtn.classList.remove('active');
    if (currentRoute) renderQuestion();
});

inputTextBtn.addEventListener('click', () => {
    inputMode = 'text';
    inputTextBtn.classList.add('active');
    inputMCBtn.classList.remove('active');
    if (currentRoute) renderQuestion();
});

document.addEventListener('langchange', () => {
    if (currentRoute) {
        renderChain();
        renderQuestion();
    }
});

/* ============ INIT ============ */

score = new ScoreTracker('correctCount', 'incorrectCount');
injectQuickAnswerButton(document.querySelector('.transport-trainer'));
injectVisibilityToggles(document.querySelector('.transport-trainer'));
buildPool();
loadNextRoute();
