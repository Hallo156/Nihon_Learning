/* Japanisch Lernprogramm — Erstellt von Hi156 unter Verwendung von Claude (Anthropic) */

/* training-data.js — Daten fuer Vokabular & Grammatik Trainer.
   Reine Datendatei, keine Logik. Wird vor training.js geladen.
   Braucht: nichts (eigenstaendig) */

/* ============ SEGMENT-DEFINITIONEN ============ */

const trainingSegments = [
    { id: 'particles',   label: 'Partikel (に/を)',               label_en: 'Particles (に/を)',               checked: true },
    { id: 'existence',   label: 'Existenzsatz (あります/います)',    label_en: 'Existence (あります/います)',       checked: false },
    { id: 'positions',   label: 'Positionen (まえ/うしろ/なか…)',   label_en: 'Positions (まえ/うしろ/なか…)',    checked: false },
    { id: 'giving',      label: 'Geben & Nehmen',                  label_en: 'Giving & Receiving',              checked: false },
    { id: 'shopping',    label: 'Einkaufen (これ/それ/あれ)',       label_en: 'Shopping (これ/それ/あれ)',        checked: false },
    { id: 'verb_past',   label: 'Vergangenheit: Verben',           label_en: 'Past Tense: Verbs',               checked: false },
    { id: 'i_adj_past',  label: 'Vergangenheit: い-Adjektive',     label_en: 'Past Tense: い-Adjectives',       checked: false },
    { id: 'na_adj_past', label: 'Vergangenheit: な-Adjektive',     label_en: 'Past Tense: な-Adjectives',       checked: false },
    { id: 'negation',    label: 'Negation (どこにも/なにも)',       label_en: 'Negation (どこにも/なにも)',       checked: false },
    { id: 'kanji_vocab', label: 'Kanji-Vokabular',                 label_en: 'Kanji Vocabulary',                checked: false }
];

/* ============ FRAGEN-POOL ============
   Einheitliche Struktur:
   { segment, type ('mc'|'fill'|'translate'), prompt, prompt_en?, prompt_jp?, correct[], choices?, choices_en?, explanation, explanation_en? }
*/

const trainingQuestions = [

    // ──────── PARTIKEL に/を ────────
    { segment: 'particles', type: 'fill',
      prompt: 'Ergänze den richtigen Partikel (に oder を):', prompt_en: 'Fill in the correct particle (に or を):',
      prompt_jp: 'タクシー（___）のります。',
      correct: ['に', 'ni'], explanation: 'のります (einsteigen) → に', explanation_en: 'のります (to get on) → に' },
    { segment: 'particles', type: 'fill',
      prompt: 'Ergänze den richtigen Partikel (に oder を):', prompt_en: 'Fill in the correct particle (に or を):',
      prompt_jp: '飛行機（___）おります。',
      correct: ['を', 'wo', 'o'], explanation: 'おります (aussteigen) → を', explanation_en: 'おります (to get off) → を' },
    { segment: 'particles', type: 'fill',
      prompt: 'Ergänze den richtigen Partikel (に oder を):', prompt_en: 'Fill in the correct particle (に or を):',
      prompt_jp: '自転車（___）のります。',
      correct: ['に', 'ni'], explanation: 'のります (aufsteigen) → に', explanation_en: 'のります (to ride) → に' },
    { segment: 'particles', type: 'fill',
      prompt: 'Ergänze den richtigen Partikel (に oder を):', prompt_en: 'Fill in the correct particle (に or を):',
      prompt_jp: 'バス（___）おります。',
      correct: ['を', 'wo', 'o'], explanation: 'おります (aussteigen) → を', explanation_en: 'おります (to get off) → を' },
    { segment: 'particles', type: 'fill',
      prompt: 'Ergänze den richtigen Partikel (に oder を):', prompt_en: 'Fill in the correct particle (に or を):',
      prompt_jp: '電車（___）のります。',
      correct: ['に', 'ni'], explanation: 'のります (einsteigen) → に', explanation_en: 'のります (to get on) → に' },
    { segment: 'particles', type: 'fill',
      prompt: 'Ergänze den richtigen Partikel (に oder を):', prompt_en: 'Fill in the correct particle (に or を):',
      prompt_jp: '船（___）おります。',
      correct: ['を', 'wo', 'o'], explanation: 'おります (aussteigen) → を', explanation_en: 'おります (to get off) → を' },
    { segment: 'particles', type: 'mc',
      prompt: 'Welchen Partikel braucht のります?', prompt_en: 'Which particle does のります need?',
      correct: ['に'], choices: ['に', 'を', 'で', 'へ'],
      explanation: '～にのります — に markiert das Transportmittel beim Einsteigen.', explanation_en: '～にのります — に marks the means of transport when getting on.' },
    { segment: 'particles', type: 'mc',
      prompt: 'Welchen Partikel braucht おります?', prompt_en: 'Which particle does おります need?',
      correct: ['を'], choices: ['に', 'を', 'で', 'へ'],
      explanation: '～をおります — を markiert das Transportmittel beim Aussteigen.', explanation_en: '～をおります — を marks the means of transport when getting off.' },

    // ──────── EXISTENZSATZ あります/います ────────
    { segment: 'existence', type: 'fill',
      prompt: 'あります oder います? (unbelebt = あります, belebt = います)', prompt_en: 'あります or います? (inanimate = あります, animate = います)',
      prompt_jp: '本はテーブルの上に（___）。',
      correct: ['あります', 'arimasu'], explanation: '本 (Buch) ist unbelebt → あります', explanation_en: '本 (book) is inanimate → あります' },
    { segment: 'existence', type: 'fill',
      prompt: 'あります oder います?', prompt_en: 'あります or います?',
      prompt_jp: '猫は椅子の下に（___）。',
      correct: ['います', 'imasu'], explanation: '猫 (Katze) ist belebt → います', explanation_en: '猫 (cat) is animate → います' },
    { segment: 'existence', type: 'fill',
      prompt: 'あります oder います?', prompt_en: 'あります or います?',
      prompt_jp: '犬は公園に（___）。',
      correct: ['います', 'imasu'], explanation: '犬 (Hund) ist belebt → います', explanation_en: '犬 (dog) is animate → います' },
    { segment: 'existence', type: 'fill',
      prompt: 'あります oder います?', prompt_en: 'あります or います?',
      prompt_jp: '花は庭に（___）。',
      correct: ['あります', 'arimasu'], explanation: '花 (Blume) ist eine Pflanze → あります', explanation_en: '花 (flower) is a plant → あります' },
    { segment: 'existence', type: 'fill',
      prompt: 'あります oder います?', prompt_en: 'あります or います?',
      prompt_jp: '先生は教室に（___）。',
      correct: ['います', 'imasu'], explanation: '先生 (Lehrer) ist belebt → います', explanation_en: '先生 (teacher) is animate → います' },
    { segment: 'existence', type: 'fill',
      prompt: 'あります oder います?', prompt_en: 'あります or います?',
      prompt_jp: '車は駐車場に（___）。',
      correct: ['あります', 'arimasu'], explanation: '車 (Auto) ist unbelebt → あります', explanation_en: '車 (car) is inanimate → あります' },
    { segment: 'existence', type: 'mc',
      prompt: 'Welches Verb benutzt man für belebte Objekte (Menschen, Tiere)?', prompt_en: 'Which verb is used for animate objects (people, animals)?',
      correct: ['います'], choices: ['います', 'あります', 'きます', 'いきます'],
      explanation: 'います für belebte Objekte, あります für unbelebte.', explanation_en: 'います for animate objects, あります for inanimate.' },

    // ──────── POSITIONEN ────────
    { segment: 'positions', type: 'fill',
      prompt: 'Ergänze die Position auf Japanisch: **hinter**', prompt_en: 'Fill in the position in Japanese: **behind**',
      prompt_jp: '本は椅子の（___）にあります。',
      correct: ['うしろ', 'ushiro'], explanation: 'うしろ = hinter', explanation_en: 'うしろ = behind' },
    { segment: 'positions', type: 'fill',
      prompt: 'Ergänze die Position auf Japanisch: **in / innerhalb**', prompt_en: 'Fill in the position in Japanese: **in / inside**',
      prompt_jp: 'りんごは箱の（___）にあります。',
      correct: ['なか', 'naka'], explanation: 'なか = in, innerhalb', explanation_en: 'なか = in, inside' },
    { segment: 'positions', type: 'fill',
      prompt: 'Ergänze die Position auf Japanisch: **vor**', prompt_en: 'Fill in the position in Japanese: **in front of**',
      prompt_jp: '猫はドアの（___）にいます。',
      correct: ['まえ', 'mae'], explanation: 'まえ = vor', explanation_en: 'まえ = in front of' },
    { segment: 'positions', type: 'fill',
      prompt: 'Ergänze die Position auf Japanisch: **neben** (direkt angrenzend)', prompt_en: 'Fill in the position in Japanese: **next to** (directly adjacent)',
      prompt_jp: '銀行は郵便局の（___）にあります。',
      correct: ['となり', 'tonari'], explanation: 'となり = neben (direkt angrenzend)', explanation_en: 'となり = next to (directly adjacent)' },
    { segment: 'positions', type: 'fill',
      prompt: 'Ergänze die Position auf Japanisch: **neben** (allgemein)', prompt_en: 'Fill in the position in Japanese: **beside** (general)',
      prompt_jp: '車は家の（___）にあります。',
      correct: ['よこ', 'yoko'], explanation: 'よこ = neben (allgemein, nicht direkt angrenzend)', explanation_en: 'よこ = beside (general, not directly adjacent)' },
    { segment: 'positions', type: 'fill',
      prompt: 'Ergänze die Position auf Japanisch: **auf / oben**', prompt_en: 'Fill in the position in Japanese: **on top / above**',
      prompt_jp: '本はテーブルの（___）にあります。',
      correct: ['うえ', 'ue'], explanation: 'うえ = auf, oben', explanation_en: 'うえ = on, above' },
    { segment: 'positions', type: 'fill',
      prompt: 'Ergänze die Position auf Japanisch: **unter**', prompt_en: 'Fill in the position in Japanese: **under**',
      prompt_jp: '猫はベッドの（___）にいます。',
      correct: ['した', 'shita'], explanation: 'した = unter', explanation_en: 'した = under' },
    { segment: 'positions', type: 'mc',
      prompt: 'Was bedeutet うしろ?', prompt_en: 'What does うしろ mean?',
      correct: ['hinter'], choices: ['hinter', 'vor', 'neben', 'in'],
      choices_en: ['behind', 'in front of', 'next to', 'in'], correct_en: ['behind'],
      explanation: 'うしろ (ushiro) = hinter', explanation_en: 'うしろ (ushiro) = behind' },

    // ──────── GEBEN & NEHMEN ────────
    { segment: 'giving', type: 'fill',
      prompt: 'あげます (geben) oder もらいます (bekommen)?', prompt_en: 'あげます (to give) or もらいます (to receive)?',
      prompt_jp: '私は友達にプレゼントを（___）。',
      correct: ['あげます', 'agemasu'], explanation: '私は…に…をあげます = Ich gebe (meinem Freund ein Geschenk).', explanation_en: '私は…に…をあげます = I give (my friend a present).' },
    { segment: 'giving', type: 'fill',
      prompt: 'あげます (geben) oder もらいました (bekommen, Vgh.)?', prompt_en: 'あげます (to give) or もらいました (received, past)?',
      prompt_jp: '私は友達に本を（___）。',
      correct: ['もらいました', 'moraimashita'], explanation: '私は…に…をもらいました = Ich habe (von meinem Freund ein Buch) bekommen.', explanation_en: '私は…に…をもらいました = I received (a book from my friend).' },
    { segment: 'giving', type: 'fill',
      prompt: 'あげます oder もらいます?', prompt_en: 'あげます or もらいます?',
      prompt_jp: '先生は学生にペンを（___）。',
      correct: ['あげます', 'agemasu'], explanation: '先生は学生にペンをあげます = Der Lehrer gibt dem Schüler einen Stift.', explanation_en: '先生は学生にペンをあげます = The teacher gives the student a pen.' },
    { segment: 'giving', type: 'fill',
      prompt: 'あげます oder もらいました?', prompt_en: 'あげます or もらいました?',
      prompt_jp: '学生は先生にペンを（___）。',
      correct: ['もらいました', 'moraimashita'], explanation: '学生は先生にペンをもらいました = Der Schüler hat vom Lehrer einen Stift bekommen.', explanation_en: '学生は先生にペンをもらいました = The student received a pen from the teacher.' },
    { segment: 'giving', type: 'mc',
      prompt: 'Was bedeutet あげます?', prompt_en: 'What does あげます mean?',
      correct: ['geben'], choices: ['geben', 'bekommen', 'kaufen', 'bringen'],
      choices_en: ['to give', 'to receive', 'to buy', 'to bring'], correct_en: ['to give'],
      explanation: 'あげます (agemasu) = geben', explanation_en: 'あげます (agemasu) = to give' },
    { segment: 'giving', type: 'mc',
      prompt: 'Was bedeutet もらいます?', prompt_en: 'What does もらいます mean?',
      correct: ['bekommen'], choices: ['geben', 'bekommen', 'kaufen', 'bringen'],
      choices_en: ['to give', 'to receive', 'to buy', 'to bring'], correct_en: ['to receive'],
      explanation: 'もらいます (moraimasu) = bekommen', explanation_en: 'もらいます (moraimasu) = to receive' },

    // ──────── EINKAUFEN これ/それ/あれ ────────
    { segment: 'shopping', type: 'fill',
      prompt: 'Ergänze: ___ (nah beim Sprecher) はいくらですか。', prompt_en: 'Fill in: ___ (near the speaker) はいくらですか。',
      prompt_jp: '（___）はいくらですか。',
      correct: ['これ', 'kore'], explanation: 'これ = dies (nah beim Sprecher)', explanation_en: 'これ = this (near the speaker)' },
    { segment: 'shopping', type: 'fill',
      prompt: 'Ergänze: ___ (nah beim Angesprochenen) をください。', prompt_en: 'Fill in: ___ (near the listener) をください。',
      prompt_jp: '（___）をください。',
      correct: ['それ', 'sore'], explanation: 'それ = das (nah beim Angesprochenen)', explanation_en: 'それ = that (near the listener)' },
    { segment: 'shopping', type: 'fill',
      prompt: 'Ergänze: ___ (weit weg von beiden) は何ですか。', prompt_en: 'Fill in: ___ (far from both) は何ですか。',
      prompt_jp: '（___）は何ですか。',
      correct: ['あれ', 'are'], explanation: 'あれ = jenes (weit weg von beiden)', explanation_en: 'あれ = that over there (far from both)' },
    { segment: 'shopping', type: 'mc',
      prompt: 'Welches Wort bezieht sich auf etwas nahe beim Sprecher?', prompt_en: 'Which word refers to something near the speaker?',
      correct: ['これ'], choices: ['これ', 'それ', 'あれ', 'どれ'],
      explanation: 'これ (kore) = dieses (nah beim Sprecher)', explanation_en: 'これ (kore) = this (near the speaker)' },
    { segment: 'shopping', type: 'mc',
      prompt: 'Wie fragt man „Wie viel kostet das?"', prompt_en: 'How do you ask "How much does it cost?"',
      correct: ['いくらですか'], choices: ['いくらですか', 'なんですか', 'どこですか', 'だれですか'],
      explanation: '～はいくらですか = Wie viel kostet ~?', explanation_en: '～はいくらですか = How much is ~?' },
    { segment: 'shopping', type: 'mc',
      prompt: 'Wie sagt man „Bitte geben Sie mir das"?', prompt_en: 'How do you say "Please give me that"?',
      correct: ['～をください'], choices: ['～をください', '～をあげます', '～をかいます', '～をみます'],
      explanation: '～をください (~ o kudasai) = Bitte geben Sie mir ~.', explanation_en: '～をください (~ o kudasai) = Please give me ~.' },

    // ──────── VERGANGENHEIT: VERBEN ────────
    { segment: 'verb_past', type: 'fill',
      prompt: 'Bilde die Vergangenheit (affirmativ) von 読みます (lesen):', prompt_en: 'Form the past tense (affirmative) of 読みます (to read):',
      prompt_jp: '読みます →（___）',
      correct: ['読みました', 'よみました', 'yomimashita'], explanation: '読みます → 読みました (las / habe gelesen)', explanation_en: '読みます → 読みました (read, past)' },
    { segment: 'verb_past', type: 'fill',
      prompt: 'Bilde die Vergangenheit (negativ) von 読みます (lesen):', prompt_en: 'Form the past tense (negative) of 読みます (to read):',
      prompt_jp: '読みます →（___）',
      correct: ['読みませんでした', 'よみませんでした', 'yomimasendeshita'], explanation: '読みます → 読みませんでした (las nicht)', explanation_en: '読みます → 読みませんでした (did not read)' },
    { segment: 'verb_past', type: 'fill',
      prompt: 'Bilde die Vergangenheit (affirmativ) von 買います (kaufen):', prompt_en: 'Form the past tense (affirmative) of 買います (to buy):',
      prompt_jp: '買います →（___）',
      correct: ['買いました', 'かいました', 'kaimashita'], explanation: '買います → 買いました (kaufte)', explanation_en: '買います → 買いました (bought)' },
    { segment: 'verb_past', type: 'fill',
      prompt: 'Bilde die Vergangenheit (negativ) von 買います (kaufen):', prompt_en: 'Form the past tense (negative) of 買います (to buy):',
      prompt_jp: '買います →（___）',
      correct: ['買いませんでした', 'かいませんでした', 'kaimasendeshita'], explanation: '買います → 買いませんでした (kaufte nicht)', explanation_en: '買います → 買いませんでした (did not buy)' },
    { segment: 'verb_past', type: 'fill',
      prompt: 'Bilde die Vergangenheit (affirmativ) von 食べます (essen):', prompt_en: 'Form the past tense (affirmative) of 食べます (to eat):',
      prompt_jp: '食べます →（___）',
      correct: ['食べました', 'たべました', 'tabemashita'], explanation: '食べます → 食べました (aß)', explanation_en: '食べます → 食べました (ate)' },
    { segment: 'verb_past', type: 'fill',
      prompt: 'Bilde die Vergangenheit (negativ) von 食べます (essen):', prompt_en: 'Form the past tense (negative) of 食べます (to eat):',
      prompt_jp: '食べます →（___）',
      correct: ['食べませんでした', 'たべませんでした', 'tabemasendeshita'], explanation: '食べます → 食べませんでした (aß nicht)', explanation_en: '食べます → 食べませんでした (did not eat)' },
    { segment: 'verb_past', type: 'fill',
      prompt: 'Bilde die Vergangenheit (affirmativ) von 行きます (gehen):', prompt_en: 'Form the past tense (affirmative) of 行きます (to go):',
      prompt_jp: '行きます →（___）',
      correct: ['行きました', 'いきました', 'ikimashita'], explanation: '行きます → 行きました (ging)', explanation_en: '行きます → 行きました (went)' },
    { segment: 'verb_past', type: 'fill',
      prompt: 'Bilde die Vergangenheit (negativ) von 見ます (sehen):', prompt_en: 'Form the past tense (negative) of 見ます (to see):',
      prompt_jp: '見ます →（___）',
      correct: ['見ませんでした', 'みませんでした', 'mimasendeshita'], explanation: '見ます → 見ませんでした (sah nicht)', explanation_en: '見ます → 見ませんでした (did not see)' },

    // ──────── VERGANGENHEIT: い-ADJEKTIVE ────────
    { segment: 'i_adj_past', type: 'fill',
      prompt: 'Bilde die Vergangenheit (affirmativ) von たのしい (spaßig):', prompt_en: 'Form the past tense (affirmative) of たのしい (fun):',
      prompt_jp: 'たのしい →（___）',
      correct: ['たのしかったです', 'tanoshikattadesu', 'tanoshikatta desu'], explanation: 'たのしい → たのしかったです (war spaßig)', explanation_en: 'たのしい → たのしかったです (was fun)' },
    { segment: 'i_adj_past', type: 'fill',
      prompt: 'Bilde die Vergangenheit (negativ) von おいしい (lecker):', prompt_en: 'Form the past tense (negative) of おいしい (delicious):',
      prompt_jp: 'おいしい →（___）',
      correct: ['おいしくなかったです', 'oishikunakattadesu', 'oishikunakatta desu'], explanation: 'おいしい → おいしくなかったです (war nicht lecker)', explanation_en: 'おいしい → おいしくなかったです (was not delicious)' },
    { segment: 'i_adj_past', type: 'fill',
      prompt: 'Bilde die Vergangenheit (affirmativ) von おもしろい (interessant):', prompt_en: 'Form the past tense (affirmative) of おもしろい (interesting):',
      prompt_jp: 'おもしろい →（___）',
      correct: ['おもしろかったです', 'omoshirokattadesu', 'omoshirokatta desu'], explanation: 'おもしろい → おもしろかったです (war interessant)', explanation_en: 'おもしろい → おもしろかったです (was interesting)' },
    { segment: 'i_adj_past', type: 'fill',
      prompt: 'Bilde die Vergangenheit (negativ) von たかい (teuer):', prompt_en: 'Form the past tense (negative) of たかい (expensive):',
      prompt_jp: 'たかい →（___）',
      correct: ['たかくなかったです', 'takakunakattadesu', 'takakunakatta desu'], explanation: 'たかい → たかくなかったです (war nicht teuer)', explanation_en: 'たかい → たかくなかったです (was not expensive)' },
    { segment: 'i_adj_past', type: 'fill',
      prompt: 'Bilde die Vergangenheit (affirmativ) von さむい (kalt):', prompt_en: 'Form the past tense (affirmative) of さむい (cold):',
      prompt_jp: 'さむい →（___）',
      correct: ['さむかったです', 'samukattadesu', 'samukatta desu'], explanation: 'さむい → さむかったです (war kalt)', explanation_en: 'さむい → さむかったです (was cold)' },
    { segment: 'i_adj_past', type: 'fill',
      prompt: 'Bilde die Vergangenheit (negativ) von あつい (heiß):', prompt_en: 'Form the past tense (negative) of あつい (hot):',
      prompt_jp: 'あつい →（___）',
      correct: ['あつくなかったです', 'atsukunakattadesu', 'atsukunakatta desu'], explanation: 'あつい → あつくなかったです (war nicht heiß)', explanation_en: 'あつい → あつくなかったです (was not hot)' },
    { segment: 'i_adj_past', type: 'mc',
      prompt: 'Wie bildet man die affirmative Vergangenheit eines い-Adjektivs?', prompt_en: 'How do you form the affirmative past of an い-adjective?',
      correct: ['い weglassen + かったです'], choices: ['い weglassen + かったです', 'い weglassen + でした', '+ ました', '+ でした'],
      choices_en: ['Drop い + かったです', 'Drop い + でした', '+ ました', '+ でした'], correct_en: ['Drop い + かったです'],
      explanation: 'い-Adj. Vergangenheit: い weglassen → かったです (z.B. たのしい → たのしかったです)', explanation_en: 'い-adj. past: drop い → かったです (e.g. たのしい → たのしかったです)' },

    // ──────── VERGANGENHEIT: な-ADJEKTIVE ────────
    { segment: 'na_adj_past', type: 'fill',
      prompt: 'Bilde die Vergangenheit (affirmativ) von たいへん (schwierig):', prompt_en: 'Form the past tense (affirmative) of たいへん (difficult):',
      prompt_jp: 'たいへん →（___）',
      correct: ['たいへんでした', 'taihendeshita', 'taihen deshita'], explanation: 'たいへん → たいへんでした (war schwierig)', explanation_en: 'たいへん → たいへんでした (was difficult)' },
    { segment: 'na_adj_past', type: 'fill',
      prompt: 'Bilde die Vergangenheit (negativ) von しずか (ruhig):', prompt_en: 'Form the past tense (negative) of しずか (quiet):',
      prompt_jp: 'しずか →（___）',
      correct: ['しずかじゃなかったです', 'shizukajanakattadesu', 'shizuka ja nakatta desu'], explanation: 'しずか → しずかじゃなかったです (war nicht ruhig)', explanation_en: 'しずか → しずかじゃなかったです (was not quiet)' },
    { segment: 'na_adj_past', type: 'fill',
      prompt: 'Bilde die Vergangenheit (affirmativ) von きれい (schön/sauber):', prompt_en: 'Form the past tense (affirmative) of きれい (beautiful/clean):',
      prompt_jp: 'きれい →（___）',
      correct: ['きれいでした', 'kireideshita', 'kirei deshita'], explanation: 'きれい → きれいでした (war schön)', explanation_en: 'きれい → きれいでした (was beautiful)' },
    { segment: 'na_adj_past', type: 'fill',
      prompt: 'Bilde die Vergangenheit (negativ) von げんき (gesund/munter):', prompt_en: 'Form the past tense (negative) of げんき (healthy/lively):',
      prompt_jp: 'げんき →（___）',
      correct: ['げんきじゃなかったです', 'genkijanakattadesu', 'genki ja nakatta desu'], explanation: 'げんき → げんきじゃなかったです (war nicht gesund)', explanation_en: 'げんき → げんきじゃなかったです (was not healthy)' },
    { segment: 'na_adj_past', type: 'fill',
      prompt: 'Bilde die Vergangenheit (affirmativ) von ひま (frei/unbeschäftigt):', prompt_en: 'Form the past tense (affirmative) of ひま (free/not busy):',
      prompt_jp: 'ひま →（___）',
      correct: ['ひまでした', 'himadeshita', 'hima deshita'], explanation: 'ひま → ひまでした (war frei)', explanation_en: 'ひま → ひまでした (was free)' },
    { segment: 'na_adj_past', type: 'fill',
      prompt: 'Bilde die Vergangenheit (negativ) von すき (mögen):', prompt_en: 'Form the past tense (negative) of すき (to like):',
      prompt_jp: 'すき →（___）',
      correct: ['すきじゃなかったです', 'sukijanakattadesu', 'suki ja nakatta desu'], explanation: 'すき → すきじゃなかったです (mochte nicht)', explanation_en: 'すき → すきじゃなかったです (did not like)' },
    { segment: 'na_adj_past', type: 'mc',
      prompt: 'Wie bildet man die affirmative Vergangenheit eines な-Adjektivs?', prompt_en: 'How do you form the affirmative past of a な-adjective?',
      correct: ['+ でした'], choices: ['+ でした', '+ かったです', '+ ました', 'な weglassen + でした'],
      choices_en: ['+ でした', '+ かったです', '+ ました', 'Drop な + でした'], correct_en: ['+ でした'],
      explanation: 'な-Adj. Vergangenheit: Stamm + でした (z.B. たいへん → たいへんでした)', explanation_en: 'な-adj. past: stem + でした (e.g. たいへん → たいへんでした)' },

    // ──────── NEGATION どこにも/なにも ────────
    { segment: 'negation', type: 'fill',
      prompt: 'Ergänze: „Ich gehe nirgendwohin."', prompt_en: 'Fill in: "I don\'t go anywhere."',
      prompt_jp: '（___）いきません。',
      correct: ['どこにも', 'どこへも', 'dokonimo', 'dokohemo', 'doko ni mo', 'doko he mo'], explanation: 'どこにもいきません = Ich gehe nirgendwohin.', explanation_en: 'どこにもいきません = I don\'t go anywhere.' },
    { segment: 'negation', type: 'fill',
      prompt: 'Ergänze: „Ich mache nichts."', prompt_en: 'Fill in: "I don\'t do anything."',
      prompt_jp: '（___）しません。',
      correct: ['なにも', 'nanimo', 'nani mo'], explanation: 'なにもしません = Ich mache nichts.', explanation_en: 'なにもしません = I don\'t do anything.' },
    { segment: 'negation', type: 'fill',
      prompt: 'Ergänze: „Gestern bin ich nirgendwohin gegangen."', prompt_en: 'Fill in: "Yesterday I didn\'t go anywhere."',
      prompt_jp: '昨日（___）いきませんでした。',
      correct: ['どこにも', 'どこへも', 'dokonimo', 'dokohemo', 'doko ni mo', 'doko he mo'], explanation: 'どこにもいきませんでした = Ich bin nirgendwohin gegangen.', explanation_en: 'どこにもいきませんでした = I didn\'t go anywhere.' },
    { segment: 'negation', type: 'fill',
      prompt: 'Ergänze: „Heute habe ich nichts gemacht."', prompt_en: 'Fill in: "Today I didn\'t do anything."',
      prompt_jp: '今日（___）しませんでした。',
      correct: ['なにも', 'nanimo', 'nani mo'], explanation: 'なにもしませんでした = Ich habe nichts gemacht.', explanation_en: 'なにもしませんでした = I didn\'t do anything.' },
    { segment: 'negation', type: 'mc',
      prompt: 'Was bedeutet どこにもいきません?', prompt_en: 'What does どこにもいきません mean?',
      correct: ['Ich gehe nirgendwohin.'], choices: ['Ich gehe nirgendwohin.', 'Ich mache nichts.', 'Ich gehe nach Hause.', 'Ich weiß es nicht.'],
      choices_en: ['I don\'t go anywhere.', 'I don\'t do anything.', 'I go home.', 'I don\'t know.'], correct_en: ['I don\'t go anywhere.'],
      explanation: 'どこにも + Negativ = nirgendwohin', explanation_en: 'どこにも + negative = nowhere / not anywhere' },
    { segment: 'negation', type: 'mc',
      prompt: 'Was bedeutet なにもしません?', prompt_en: 'What does なにもしません mean?',
      correct: ['Ich mache nichts.'], choices: ['Ich gehe nirgendwohin.', 'Ich mache nichts.', 'Ich esse nichts.', 'Ich kaufe nichts.'],
      choices_en: ['I don\'t go anywhere.', 'I don\'t do anything.', 'I don\'t eat anything.', 'I don\'t buy anything.'], correct_en: ['I don\'t do anything.'],
      explanation: 'なにも + Negativ = nichts (tun)', explanation_en: 'なにも + negative = nothing / not anything' },

    // ──────── KANJI-VOKABULAR ────────
    { segment: 'kanji_vocab', type: 'mc',
      prompt: 'Wie liest man 百円?', prompt_en: 'How do you read 百円?',
      correct: ['hyakuen'], choices: ['hyakuen', 'sen\'en', 'ichien', 'goen'],
      explanation: '百円 (hyakuen) = 100 Yen', explanation_en: '百円 (hyakuen) = 100 Yen' },
    { segment: 'kanji_vocab', type: 'mc',
      prompt: 'Was bedeutet 千円?', prompt_en: 'What does 千円 mean?',
      correct: ['1.000 Yen'], choices: ['1.000 Yen', '100 Yen', '10.000 Yen', '500 Yen'],
      explanation: '千円 (sen\'en) = 1.000 Yen', explanation_en: '千円 (sen\'en) = 1,000 Yen' },
    { segment: 'kanji_vocab', type: 'mc',
      prompt: 'Wie liest man 東京?', prompt_en: 'How do you read 東京?',
      correct: ['Tōkyō', 'Tokyo', 'Toukyou'], choices: ['Tōkyō', 'Ōsaka', 'Kyōto', 'Nagoya'],
      explanation: '東京 (Tōkyō) = Tokio', explanation_en: '東京 (Tōkyō) = Tokyo' },
    { segment: 'kanji_vocab', type: 'mc',
      prompt: 'Was bedeutet 行きます?', prompt_en: 'What does 行きます mean?',
      correct: ['gehen'], choices: ['gehen', 'kommen', 'kaufen', 'treffen'],
      choices_en: ['to go', 'to come', 'to buy', 'to meet'], correct_en: ['to go'],
      explanation: '行きます (ikimasu) = gehen', explanation_en: '行きます (ikimasu) = to go' },
    { segment: 'kanji_vocab', type: 'mc',
      prompt: 'Was bedeutet 買います?', prompt_en: 'What does 買います mean?',
      correct: ['kaufen'], choices: ['kaufen', 'gehen', 'essen', 'trinken'],
      choices_en: ['to buy', 'to go', 'to eat', 'to drink'], correct_en: ['to buy'],
      explanation: '買います (kaimasu) = kaufen', explanation_en: '買います (kaimasu) = to buy' },
    { segment: 'kanji_vocab', type: 'mc',
      prompt: 'Was bedeutet 会います?', prompt_en: 'What does 会います mean?',
      correct: ['treffen'], choices: ['treffen', 'kaufen', 'gehen', 'kommen'],
      choices_en: ['to meet', 'to buy', 'to go', 'to come'], correct_en: ['to meet'],
      explanation: '会います (aimasu) = treffen', explanation_en: '会います (aimasu) = to meet' },
    { segment: 'kanji_vocab', type: 'mc',
      prompt: 'Was bedeutet 休みます?', prompt_en: 'What does 休みます mean?',
      correct: ['sich ausruhen'], choices: ['sich ausruhen', 'arbeiten', 'lernen', 'spielen'],
      choices_en: ['to rest', 'to work', 'to study', 'to play'], correct_en: ['to rest'],
      explanation: '休みます (yasumimasu) = sich ausruhen, Urlaub machen', explanation_en: '休みます (yasumimasu) = to rest, to take a day off' },
    { segment: 'kanji_vocab', type: 'mc',
      prompt: 'Wie liest man 口?', prompt_en: 'How do you read 口?',
      correct: ['kuchi'], choices: ['kuchi', 'me', 'mimi', 'te'],
      explanation: '口 (kuchi) = Mund', explanation_en: '口 (kuchi) = mouth' }
];

/* ============ REFERENZ-INHALTE (Nachschlagen) ============ */

const trainingReference = {
    particles: {
        title: 'Bewegungsverben: ～にのります / ～をおります',
        title_en: 'Motion Verbs: ～にのります / ～をおります',
        html: '<ul>' +
            '<li><strong>～にのります。</strong> (auf etwas steigen / einsteigen)' +
            '<ul><li>例：電車にのります。(Densha ni norimasu.) — Ich steige in den Zug ein.</li></ul></li>' +
            '<li><strong>～をおります。</strong> (von etwas aussteigen / absteigen)' +
            '<ul><li>例：バスをおります。(Basu o orimasu.) — Ich steige aus dem Bus aus.</li></ul></li>' +
            '</ul>',
        html_en: '<ul>' +
            '<li><strong>～にのります。</strong> (to get on / to board)' +
            '<ul><li>例：電車にのります。(Densha ni norimasu.) — I get on the train.</li></ul></li>' +
            '<li><strong>～をおります。</strong> (to get off / to disembark)' +
            '<ul><li>例：バスをおります。(Basu o orimasu.) — I get off the bus.</li></ul></li>' +
            '</ul>'
    },
    existence: {
        title: 'Existenzsatz: あります / います',
        title_en: 'Existence: あります / います',
        html: '<ul>' +
            '<li><strong>あります (arimasu):</strong> für unbelebte Objekte und Pflanzen</li>' +
            '<li><strong>います (imasu):</strong> für belebte Objekte (Menschen und Tiere)</li>' +
            '<li>例：本はテーブルの上にあります。— Das Buch ist auf dem Tisch.</li>' +
            '<li>例：猫は椅子の下にいます。— Die Katze ist unter dem Stuhl.</li>' +
            '</ul>',
        html_en: '<ul>' +
            '<li><strong>あります (arimasu):</strong> for inanimate objects and plants</li>' +
            '<li><strong>います (imasu):</strong> for animate objects (people and animals)</li>' +
            '<li>例：本はテーブルの上にあります。— The book is on the table.</li>' +
            '<li>例：猫は椅子の下にいます。— The cat is under the chair.</li>' +
            '</ul>'
    },
    positions: {
        title: 'Positionen: ～のまえ、うしろ、なか、となり、よこ、うえ、した',
        title_en: 'Positions: ～のまえ, うしろ, なか, となり, よこ, うえ, した',
        html: '<ul>' +
            '<li>～のまえ (no mae) — vor</li>' +
            '<li>～のうしろ (no ushiro) — hinter</li>' +
            '<li>～のなか (no naka) — in, innerhalb</li>' +
            '<li>～のとなり (no tonari) — neben (direkt angrenzend)</li>' +
            '<li>～のよこ (no yoko) — neben (allgemein)</li>' +
            '<li>～のうえ (no ue) — auf, oben</li>' +
            '<li>～のした (no shita) — unter</li>' +
            '</ul>',
        html_en: '<ul>' +
            '<li>～のまえ (no mae) — in front of</li>' +
            '<li>～のうしろ (no ushiro) — behind</li>' +
            '<li>～のなか (no naka) — inside</li>' +
            '<li>～のとなり (no tonari) — next to (adjacent)</li>' +
            '<li>～のよこ (no yoko) — beside (general)</li>' +
            '<li>～のうえ (no ue) — on top of, above</li>' +
            '<li>～のした (no shita) — under, below</li>' +
            '</ul>'
    },
    giving: {
        title: 'Geben und Nehmen: あげます / もらいます',
        title_en: 'Giving and Receiving: あげます / もらいます',
        html: '<ul>' +
            '<li><strong>あげます (agemasu):</strong> geben (von Sprecher/A an B)</li>' +
            '<li><strong>もらいます (moraimasu):</strong> bekommen (Sprecher/B von A)</li>' +
            '<li>例：私は友達にプレゼントをあげます。— Ich gebe meinem Freund ein Geschenk.</li>' +
            '<li>例：私は友達に本をもらいました。— Ich habe von meinem Freund ein Buch bekommen.</li>' +
            '</ul>',
        html_en: '<ul>' +
            '<li><strong>あげます (agemasu):</strong> to give (from speaker/A to B)</li>' +
            '<li><strong>もらいます (moraimasu):</strong> to receive (speaker/B from A)</li>' +
            '<li>例：私は友達にプレゼントをあげます。— I give my friend a present.</li>' +
            '<li>例：私は友達に本をもらいました。— I received a book from my friend.</li>' +
            '</ul>'
    },
    shopping: {
        title: 'Einkaufen: これ、それ、あれ',
        title_en: 'Shopping: これ, それ, あれ',
        html: '<ul>' +
            '<li><strong>これ (kore):</strong> dieses (nah beim Sprecher)</li>' +
            '<li><strong>それ (sore):</strong> das (nah beim Angesprochenen)</li>' +
            '<li><strong>あれ (are):</strong> jenes (weit weg von beiden)</li>' +
            '<li><strong>～はいくらですか。</strong> — Wie viel kostet ~?</li>' +
            '<li><strong>～をください。</strong> — Bitte geben Sie mir ~.</li>' +
            '</ul>',
        html_en: '<ul>' +
            '<li><strong>これ (kore):</strong> this (near the speaker)</li>' +
            '<li><strong>それ (sore):</strong> that (near the listener)</li>' +
            '<li><strong>あれ (are):</strong> that over there (far from both)</li>' +
            '<li><strong>～はいくらですか。</strong> — How much is ~?</li>' +
            '<li><strong>～をください。</strong> — Please give me ~.</li>' +
            '</ul>'
    },
    verb_past: {
        title: 'Vergangenheitsform von Verben',
        title_en: 'Past Tense of Verbs',
        html: '<ul>' +
            '<li><strong>Affirmativ:</strong> Verb-Stamm + ました (mashita)' +
            '<ul><li>例：行きます → 行きました (ging)</li></ul></li>' +
            '<li><strong>Negativ:</strong> Verb-Stamm + ませんでした (masen deshita)' +
            '<ul><li>例：食べます → 食べませんでした (aß nicht)</li></ul></li>' +
            '</ul>',
        html_en: '<ul>' +
            '<li><strong>Affirmative:</strong> Verb stem + ました (mashita)' +
            '<ul><li>例：行きます → 行きました (went)</li></ul></li>' +
            '<li><strong>Negative:</strong> Verb stem + ませんでした (masen deshita)' +
            '<ul><li>例：食べます → 食べませんでした (did not eat)</li></ul></li>' +
            '</ul>'
    },
    i_adj_past: {
        title: 'Vergangenheitsform von い-Adjektiven',
        title_en: 'Past Tense of い-Adjectives',
        html: '<ul>' +
            '<li><strong>Affirmativ:</strong> い weglassen + かったです (katta desu)' +
            '<ul><li>例：たのしい → たのしかったです (war spaßig)</li></ul></li>' +
            '<li><strong>Negativ:</strong> い weglassen + くなかったです (kunakatta desu)' +
            '<ul><li>例：おいしい → おいしくなかったです (war nicht lecker)</li></ul></li>' +
            '</ul>',
        html_en: '<ul>' +
            '<li><strong>Affirmative:</strong> Drop い + かったです (katta desu)' +
            '<ul><li>例：たのしい → たのしかったです (was fun)</li></ul></li>' +
            '<li><strong>Negative:</strong> Drop い + くなかったです (kunakatta desu)' +
            '<ul><li>例：おいしい → おいしくなかったです (was not delicious)</li></ul></li>' +
            '</ul>'
    },
    na_adj_past: {
        title: 'Vergangenheitsform von な-Adjektiven',
        title_en: 'Past Tense of な-Adjectives',
        html: '<ul>' +
            '<li><strong>Affirmativ:</strong> Stamm + でした (deshita)' +
            '<ul><li>例：たいへん → たいへんでした (war schwierig)</li></ul></li>' +
            '<li><strong>Negativ:</strong> Stamm + じゃなかったです (ja nakatta desu)' +
            '<ul><li>例：しずか → しずかじゃなかったです (war nicht ruhig)</li></ul></li>' +
            '</ul>',
        html_en: '<ul>' +
            '<li><strong>Affirmative:</strong> Stem + でした (deshita)' +
            '<ul><li>例：たいへん → たいへんでした (was difficult)</li></ul></li>' +
            '<li><strong>Negative:</strong> Stem + じゃなかったです (ja nakatta desu)' +
            '<ul><li>例：しずか → しずかじゃなかったです (was not quiet)</li></ul></li>' +
            '</ul>'
    },
    negation: {
        title: 'Negation: どこにもいきません / なにもしません',
        title_en: 'Negation: どこにもいきません / なにもしません',
        html: '<ul>' +
            '<li><strong>どこにもいきません (doko ni mo ikimasen):</strong> Ich gehe nirgendwohin.</li>' +
            '<li><strong>なにもしません (nani mo shimasen):</strong> Ich mache nichts.</li>' +
            '<li>Diese Strukturen drücken eine vollständige Negation aus.</li>' +
            '</ul>',
        html_en: '<ul>' +
            '<li><strong>どこにもいきません (doko ni mo ikimasen):</strong> I don\'t go anywhere.</li>' +
            '<li><strong>なにもしません (nani mo shimasen):</strong> I don\'t do anything.</li>' +
            '<li>These structures express complete negation.</li>' +
            '</ul>'
    },
    kanji_vocab: {
        title: 'Kanji-Vokabular',
        title_en: 'Kanji Vocabulary',
        html: '<ul>' +
            '<li>百円 (hyakuen) — 100 Yen</li>' +
            '<li>千円 (sen\'en) — 1.000 Yen</li>' +
            '<li>一万円 (ichiman\'en) — 10.000 Yen</li>' +
            '<li>口 (kuchi) — Mund</li>' +
            '<li>行きます (ikimasu) — gehen</li>' +
            '<li>来ます (kimasu) — kommen</li>' +
            '<li>会います (aimasu) — treffen</li>' +
            '<li>買います (kaimasu) — kaufen</li>' +
            '<li>休みます (yasumimasu) — sich ausruhen</li>' +
            '<li>日本 (Nihon) — Japan</li>' +
            '<li>東京 (Tōkyō) — Tokio</li>' +
            '</ul>',
        html_en: '<ul>' +
            '<li>百円 (hyakuen) — 100 Yen</li>' +
            '<li>千円 (sen\'en) — 1,000 Yen</li>' +
            '<li>一万円 (ichiman\'en) — 10,000 Yen</li>' +
            '<li>口 (kuchi) — mouth</li>' +
            '<li>行きます (ikimasu) — to go</li>' +
            '<li>来ます (kimasu) — to come</li>' +
            '<li>会います (aimasu) — to meet</li>' +
            '<li>買います (kaimasu) — to buy</li>' +
            '<li>休みます (yasumimasu) — to rest</li>' +
            '<li>日本 (Nihon) — Japan</li>' +
            '<li>東京 (Tōkyō) — Tokyo</li>' +
            '</ul>'
    }
};
