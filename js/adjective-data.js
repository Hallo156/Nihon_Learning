/* Japanisch Lernprogramm — Erstellt von Hi156 unter Verwendung von Claude (Anthropic) */

/* adjective-data.js — Adjektiv-Trainer: Daten (25 Adjektive, 4 Formen je) + Nachschlag-Referenz.
   Jedes Adjektiv enthält: adj, romaji, type ('i'|'na'), meaning_de, meaning_en,
   forms.present / .past / .neg_present / .neg_past mit jp/de/en/adj_jp/adj_romaji.
   Braucht: common.js, i18n.js */

/* ============ DATEN ============ */

const adjectivesData = [
    // ── い-Adjektive ──
    { adj: 'たかい', romaji: 'takai', type: 'i', meaning_de: 'teuer / hoch', meaning_en: 'expensive / tall',
      forms: {
        present:     { jp: 'このレストランは たかい です。',       de: 'Dieses Restaurant ist teuer.',      en: 'This restaurant is expensive.',      adj_jp: 'たかい',       adj_romaji: 'takai' },
        past:        { jp: 'このレストランは たかかった です。',   de: 'Dieses Restaurant war teuer.',      en: 'This restaurant was expensive.',     adj_jp: 'たかかった',   adj_romaji: 'takakatta' },
        neg_present: { jp: 'このレストランは たかくない です。',   de: 'Dieses Restaurant ist nicht teuer.', en: 'This restaurant is not expensive.',  adj_jp: 'たかくない',   adj_romaji: 'takakunai' },
        neg_past:    { jp: 'このレストランは たかくなかった です。', de: 'Dieses Restaurant war nicht teuer.', en: 'This restaurant was not expensive.', adj_jp: 'たかくなかった', adj_romaji: 'takakunakatta' }
    }},

    { adj: 'やすい', romaji: 'yasui', type: 'i', meaning_de: 'billig / günstig', meaning_en: 'cheap / inexpensive',
      forms: {
        present:     { jp: 'このスーパーは やすい ですね。',         de: 'Dieser Supermarkt ist günstig, oder?', en: 'This supermarket is cheap, isn\'t it?',  adj_jp: 'やすい',       adj_romaji: 'yasui' },
        past:        { jp: 'このスーパーは やすかった ですね。',     de: 'Dieser Supermarkt war günstig.',       en: 'This supermarket was cheap.',            adj_jp: 'やすかった',   adj_romaji: 'yasukatta' },
        neg_present: { jp: 'このスーパーは やすくない ですね。',     de: 'Dieser Supermarkt ist nicht günstig.', en: 'This supermarket is not cheap.',         adj_jp: 'やすくない',   adj_romaji: 'yasukunai' },
        neg_past:    { jp: 'このスーパーは やすくなかった ですね。', de: 'Dieser Supermarkt war nicht günstig.', en: 'This supermarket was not cheap.',        adj_jp: 'やすくなかった', adj_romaji: 'yasukunakatta' }
    }},

    { adj: 'おおきい', romaji: 'ookii', type: 'i', meaning_de: 'groß', meaning_en: 'big / large',
      forms: {
        present:     { jp: 'あの いぬ は おおきい ですね。',         de: 'Jener Hund ist groß, oder?',     en: 'That dog is big, isn\'t it?',   adj_jp: 'おおきい',       adj_romaji: 'ookii' },
        past:        { jp: 'あの いぬ は おおきかった ですね。',     de: 'Jener Hund war groß.',           en: 'That dog was big.',             adj_jp: 'おおきかった',   adj_romaji: 'ookikatta' },
        neg_present: { jp: 'あの いぬ は おおきくない ですね。',     de: 'Jener Hund ist nicht groß.',    en: 'That dog is not big.',          adj_jp: 'おおきくない',   adj_romaji: 'ookikunai' },
        neg_past:    { jp: 'あの いぬ は おおきくなかった ですね。', de: 'Jener Hund war nicht groß.',    en: 'That dog was not big.',         adj_jp: 'おおきくなかった', adj_romaji: 'ookikunakatta' }
    }},

    { adj: 'ちいさい', romaji: 'chiisai', type: 'i', meaning_de: 'klein', meaning_en: 'small / little',
      forms: {
        present:     { jp: 'この ねこ は ちいさい ですね。',         de: 'Diese Katze ist klein, oder?',  en: 'This cat is small, isn\'t it?', adj_jp: 'ちいさい',       adj_romaji: 'chiisai' },
        past:        { jp: 'この ねこ は ちいさかった ですね。',     de: 'Diese Katze war klein.',        en: 'This cat was small.',           adj_jp: 'ちいさかった',   adj_romaji: 'chiisákatta' },
        neg_present: { jp: 'この ねこ は ちいさくない ですね。',     de: 'Diese Katze ist nicht klein.',  en: 'This cat is not small.',        adj_jp: 'ちいさくない',   adj_romaji: 'chiisákunai' },
        neg_past:    { jp: 'この ねこ は ちいさくなかった ですね。', de: 'Diese Katze war nicht klein.',  en: 'This cat was not small.',       adj_jp: 'ちいさくなかった', adj_romaji: 'chiisákunakatta' }
    }},

    { adj: 'あたらしい', romaji: 'atarashii', type: 'i', meaning_de: 'neu', meaning_en: 'new',
      forms: {
        present:     { jp: 'この くるま は あたらしい ですね。',         de: 'Dieses Auto ist neu, oder?',  en: 'This car is new, isn\'t it?', adj_jp: 'あたらしい',       adj_romaji: 'atarashii' },
        past:        { jp: 'この くるま は あたらしかった ですね。',     de: 'Dieses Auto war neu.',        en: 'This car was new.',           adj_jp: 'あたらしかった',   adj_romaji: 'atarashikatta' },
        neg_present: { jp: 'この くるま は あたらしくない ですね。',     de: 'Dieses Auto ist nicht neu.',  en: 'This car is not new.',        adj_jp: 'あたらしくない',   adj_romaji: 'atarashikunai' },
        neg_past:    { jp: 'この くるま は あたらしくなかった ですね。', de: 'Dieses Auto war nicht neu.',  en: 'This car was not new.',       adj_jp: 'あたらしくなかった', adj_romaji: 'atarashikunakatta' }
    }},

    { adj: 'ふるい', romaji: 'furui', type: 'i', meaning_de: 'alt (Gegenstände)', meaning_en: 'old (things)',
      forms: {
        present:     { jp: 'この じてんしゃ は ふるい ですね。',         de: 'Dieses Fahrrad ist alt, oder?',  en: 'This bicycle is old, isn\'t it?', adj_jp: 'ふるい',       adj_romaji: 'furui' },
        past:        { jp: 'この じてんしゃ は ふるかった ですね。',     de: 'Dieses Fahrrad war alt.',        en: 'This bicycle was old.',           adj_jp: 'ふるかった',   adj_romaji: 'furukatta' },
        neg_present: { jp: 'この じてんしゃ は ふるくない ですね。',     de: 'Dieses Fahrrad ist nicht alt.',  en: 'This bicycle is not old.',        adj_jp: 'ふるくない',   adj_romaji: 'furukunai' },
        neg_past:    { jp: 'この じてんしゃ は ふるくなかった ですね。', de: 'Dieses Fahrrad war nicht alt.',  en: 'This bicycle was not old.',       adj_jp: 'ふるくなかった', adj_romaji: 'furukunakatta' }
    }},

    { adj: 'いい', romaji: 'ii', type: 'i', meaning_de: 'gut', meaning_en: 'good',
      forms: {
        present:     { jp: 'この コーヒー は いい ですね。',         de: 'Dieser Kaffee ist gut, oder?',  en: 'This coffee is good, isn\'t it?', adj_jp: 'いい',       adj_romaji: 'ii' },
        past:        { jp: 'この コーヒー は よかった ですね。',     de: 'Dieser Kaffee war gut.',         en: 'This coffee was good.',           adj_jp: 'よかった',   adj_romaji: 'yokatta' },
        neg_present: { jp: 'この コーヒー は よくない ですね。',     de: 'Dieser Kaffee ist nicht gut.',   en: 'This coffee is not good.',        adj_jp: 'よくない',   adj_romaji: 'yokunai' },
        neg_past:    { jp: 'この コーヒー は よくなかった ですね。', de: 'Dieser Kaffee war nicht gut.',   en: 'This coffee was not good.',       adj_jp: 'よくなかった', adj_romaji: 'yokunakatta' }
    }},

    { adj: 'わるい', romaji: 'warui', type: 'i', meaning_de: 'schlecht', meaning_en: 'bad',
      forms: {
        present:     { jp: 'きょう の てんき は わるい ですね。',         de: 'Das Wetter heute ist schlecht, oder?', en: 'The weather today is bad, isn\'t it?', adj_jp: 'わるい',       adj_romaji: 'warui' },
        past:        { jp: 'きのう の てんき は わるかった ですね。',     de: 'Das Wetter gestern war schlecht.',     en: 'The weather yesterday was bad.',      adj_jp: 'わるかった',   adj_romaji: 'warukatta' },
        neg_present: { jp: 'きょう の てんき は わるくない ですね。',     de: 'Das Wetter heute ist nicht schlecht.', en: 'The weather today is not bad.',       adj_jp: 'わるくない',   adj_romaji: 'warukunai' },
        neg_past:    { jp: 'きのう の てんき は わるくなかった ですね。', de: 'Das Wetter gestern war nicht schlecht.', en: 'The weather yesterday was not bad.', adj_jp: 'わるくなかった', adj_romaji: 'warukunakatta' }
    }},

    { adj: 'おいしい', romaji: 'oishii', type: 'i', meaning_de: 'lecker', meaning_en: 'delicious / tasty',
      forms: {
        present:     { jp: 'この ケーキ は おいしい ですね！',         de: 'Dieser Kuchen ist lecker!',         en: 'This cake is delicious!',        adj_jp: 'おいしい',       adj_romaji: 'oishii' },
        past:        { jp: 'あの ケーキ は おいしかった ですね！',     de: 'Jener Kuchen war lecker!',          en: 'That cake was delicious!',       adj_jp: 'おいしかった',   adj_romaji: 'oishikatta' },
        neg_present: { jp: 'この ケーキ は おいしくない ですね。',     de: 'Dieser Kuchen ist nicht lecker.',   en: 'This cake is not delicious.',    adj_jp: 'おいしくない',   adj_romaji: 'oishikunai' },
        neg_past:    { jp: 'あの ケーキ は おいしくなかった ですね。', de: 'Jener Kuchen war nicht lecker.',    en: 'That cake was not delicious.',   adj_jp: 'おいしくなかった', adj_romaji: 'oishikunakatta' }
    }},

    { adj: 'むずかしい', romaji: 'muzukashii', type: 'i', meaning_de: 'schwierig', meaning_en: 'difficult',
      forms: {
        present:     { jp: 'この もんだい は むずかしい ですね。',         de: 'Diese Aufgabe ist schwierig, oder?', en: 'This problem is difficult, isn\'t it?', adj_jp: 'むずかしい',       adj_romaji: 'muzukashii' },
        past:        { jp: 'あの もんだい は むずかしかった ですね。',     de: 'Jene Aufgabe war schwierig.',        en: 'That problem was difficult.',          adj_jp: 'むずかしかった',   adj_romaji: 'muzukashikatta' },
        neg_present: { jp: 'この もんだい は むずかしくない ですね。',     de: 'Diese Aufgabe ist nicht schwierig.', en: 'This problem is not difficult.',      adj_jp: 'むずかしくない',   adj_romaji: 'muzukashikunai' },
        neg_past:    { jp: 'あの もんだい は むずかしくなかった ですね。', de: 'Jene Aufgabe war nicht schwierig.',  en: 'That problem was not difficult.',     adj_jp: 'むずかしくなかった', adj_romaji: 'muzukashikunakatta' }
    }},

    { adj: 'やさしい', romaji: 'yasashii', type: 'i', meaning_de: 'leicht / freundlich', meaning_en: 'easy / kind',
      forms: {
        present:     { jp: 'この テスト は やさしい です。',         de: 'Dieser Test ist einfach.',      en: 'This test is easy.',      adj_jp: 'やさしい',       adj_romaji: 'yasashii' },
        past:        { jp: 'あの テスト は やさしかった です。',     de: 'Jener Test war einfach.',       en: 'That test was easy.',     adj_jp: 'やさしかった',   adj_romaji: 'yasashikatta' },
        neg_present: { jp: 'この テスト は やさしくない です。',     de: 'Dieser Test ist nicht einfach.', en: 'This test is not easy.', adj_jp: 'やさしくない',   adj_romaji: 'yasashikunai' },
        neg_past:    { jp: 'あの テスト は やさしくなかった です。', de: 'Jener Test war nicht einfach.', en: 'That test was not easy.', adj_jp: 'やさしくなかった', adj_romaji: 'yasashikunakatta' }
    }},

    { adj: 'おもしろい', romaji: 'omoshiroi', type: 'i', meaning_de: 'interessant / lustig', meaning_en: 'interesting / funny',
      forms: {
        present:     { jp: 'この ほん は おもしろい ですね。',         de: 'Dieses Buch ist interessant, oder?', en: 'This book is interesting, isn\'t it?', adj_jp: 'おもしろい',       adj_romaji: 'omoshiroi' },
        past:        { jp: 'あの ほん は おもしろかった ですね。',     de: 'Jenes Buch war interessant.',        en: 'That book was interesting.',          adj_jp: 'おもしろかった',   adj_romaji: 'omoshirokatta' },
        neg_present: { jp: 'この ほん は おもしろくない ですね。',     de: 'Dieses Buch ist nicht interessant.', en: 'This book is not interesting.',      adj_jp: 'おもしろくない',   adj_romaji: 'omoshirokunai' },
        neg_past:    { jp: 'あの ほん は おもしろくなかった ですね。', de: 'Jenes Buch war nicht interessant.',  en: 'That book was not interesting.',     adj_jp: 'おもしろくなかった', adj_romaji: 'omoshirokunakatta' }
    }},

    { adj: 'あつい', romaji: 'atsui', type: 'i', meaning_de: 'heiß', meaning_en: 'hot',
      forms: {
        present:     { jp: 'きょう は あつい ですね。',         de: 'Heute ist es heiß, oder?',     en: 'It\'s hot today, isn\'t it?', adj_jp: 'あつい',       adj_romaji: 'atsui' },
        past:        { jp: 'きのう は あつかった ですね。',     de: 'Gestern war es heiß.',          en: 'Yesterday was hot.',          adj_jp: 'あつかった',   adj_romaji: 'atsukatta' },
        neg_present: { jp: 'きょう は あつくない ですね。',     de: 'Heute ist es nicht heiß.',     en: 'It\'s not hot today.',        adj_jp: 'あつくない',   adj_romaji: 'atsukunai' },
        neg_past:    { jp: 'きのう は あつくなかった ですね。', de: 'Gestern war es nicht heiß.',    en: 'Yesterday was not hot.',      adj_jp: 'あつくなかった', adj_romaji: 'atsukunakatta' }
    }},

    { adj: 'さむい', romaji: 'samui', type: 'i', meaning_de: 'kalt (Wetter)', meaning_en: 'cold (weather)',
      forms: {
        present:     { jp: 'ふゆ は さむい ですね。',         de: 'Der Winter ist kalt, oder?',  en: 'Winter is cold, isn\'t it?', adj_jp: 'さむい',       adj_romaji: 'samui' },
        past:        { jp: 'きのう は さむかった ですね。',     de: 'Gestern war es kalt.',         en: 'Yesterday was cold.',         adj_jp: 'さむかった',   adj_romaji: 'samukatta' },
        neg_present: { jp: 'ふゆ は さむくない ですね。',       de: 'Der Winter ist nicht kalt.',  en: 'Winter is not cold.',        adj_jp: 'さむくない',   adj_romaji: 'samukunai' },
        neg_past:    { jp: 'きのう は さむくなかった ですね。', de: 'Gestern war es nicht kalt.',   en: 'Yesterday was not cold.',    adj_jp: 'さむくなかった', adj_romaji: 'samukunakatta' }
    }},

    { adj: 'かわいい', romaji: 'kawaii', type: 'i', meaning_de: 'süß / niedlich', meaning_en: 'cute',
      forms: {
        present:     { jp: 'この ぬいぐるみ は かわいい ですね！',         de: 'Dieses Kuscheltier ist süß!',         en: 'This stuffed animal is cute!',     adj_jp: 'かわいい',       adj_romaji: 'kawaii' },
        past:        { jp: 'あの ぬいぐるみ は かわいかった ですね！',     de: 'Jenes Kuscheltier war süß!',          en: 'That stuffed animal was cute!',    adj_jp: 'かわいかった',   adj_romaji: 'kawaikatta' },
        neg_present: { jp: 'この ぬいぐるみ は かわいくない ですね。',     de: 'Dieses Kuscheltier ist nicht süß.',   en: 'This stuffed animal is not cute.', adj_jp: 'かわいくない',   adj_romaji: 'kawaikunai' },
        neg_past:    { jp: 'あの ぬいぐるみ は かわいくなかった ですね。', de: 'Jenes Kuscheltier war nicht süß.',    en: 'That stuffed animal was not cute.', adj_jp: 'かわいくなかった', adj_romaji: 'kawaikunakatta' }
    }},

    { adj: 'はやい', romaji: 'hayai', type: 'i', meaning_de: 'schnell / früh', meaning_en: 'fast / early',
      forms: {
        present:     { jp: 'この でんしゃ は はやい ですね。',         de: 'Dieser Zug ist schnell, oder?', en: 'This train is fast, isn\'t it?', adj_jp: 'はやい',       adj_romaji: 'hayai' },
        past:        { jp: 'あの でんしゃ は はやかった ですね。',     de: 'Jener Zug war schnell.',         en: 'That train was fast.',           adj_jp: 'はやかった',   adj_romaji: 'hayakatta' },
        neg_present: { jp: 'この でんしゃ は はやくない ですね。',     de: 'Dieser Zug ist nicht schnell.', en: 'This train is not fast.',        adj_jp: 'はやくない',   adj_romaji: 'hayakunai' },
        neg_past:    { jp: 'あの でんしゃ は はやくなかった ですね。', de: 'Jener Zug war nicht schnell.',  en: 'That train was not fast.',       adj_jp: 'はやくなかった', adj_romaji: 'hayakunakatta' }
    }},

    { adj: 'たのしい', romaji: 'tanoshii', type: 'i', meaning_de: 'spaßig / angenehm', meaning_en: 'fun / enjoyable',
      forms: {
        present:     { jp: 'この パーティー は たのしい ですね。',         de: 'Diese Party macht Spaß, oder?', en: 'This party is fun, isn\'t it?', adj_jp: 'たのしい',       adj_romaji: 'tanoshii' },
        past:        { jp: 'あの パーティー は たのしかった ですね。',     de: 'Jene Party machte Spaß.',        en: 'That party was fun.',           adj_jp: 'たのしかった',   adj_romaji: 'tanoshikatta' },
        neg_present: { jp: 'この パーティー は たのしくない ですね。',     de: 'Diese Party macht keinen Spaß.', en: 'This party is not fun.',        adj_jp: 'たのしくない',   adj_romaji: 'tanoshikunai' },
        neg_past:    { jp: 'あの パーティー は たのしくなかった ですね。', de: 'Jene Party machte keinen Spaß.', en: 'That party was not fun.',       adj_jp: 'たのしくなかった', adj_romaji: 'tanoshikunakatta' }
    }},

    { adj: 'ひろい', romaji: 'hiroi', type: 'i', meaning_de: 'weit / geräumig', meaning_en: 'wide / spacious',
      forms: {
        present:     { jp: 'この こうえん は ひろい ですね。',         de: 'Dieser Park ist geräumig, oder?', en: 'This park is spacious, isn\'t it?', adj_jp: 'ひろい',       adj_romaji: 'hiroi' },
        past:        { jp: 'あの こうえん は ひろかった ですね。',     de: 'Jener Park war geräumig.',         en: 'That park was spacious.',          adj_jp: 'ひろかった',   adj_romaji: 'hirokatta' },
        neg_present: { jp: 'この こうえん は ひろくない ですね。',     de: 'Dieser Park ist nicht geräumig.', en: 'This park is not spacious.',      adj_jp: 'ひろくない',   adj_romaji: 'hirokunai' },
        neg_past:    { jp: 'あの こうえん は ひろくなかった ですね。', de: 'Jener Park war nicht geräumig.',  en: 'That park was not spacious.',     adj_jp: 'ひろくなかった', adj_romaji: 'hirokunakatta' }
    }},

    // ── な-Adjektive ──
    { adj: 'きれい', romaji: 'kirei', type: 'na', meaning_de: 'schön / sauber', meaning_en: 'beautiful / clean',
      forms: {
        present:     { jp: 'この はな は きれい ですね。',              de: 'Diese Blume ist schön, oder?', en: 'This flower is beautiful, isn\'t it?', adj_jp: 'きれい',            adj_romaji: 'kirei' },
        past:        { jp: 'あの はな は きれい でした。',              de: 'Jene Blume war schön.',         en: 'That flower was beautiful.',          adj_jp: 'きれい でした',      adj_romaji: 'kirei deshita' },
        neg_present: { jp: 'この はな は きれい じゃない ですね。',     de: 'Diese Blume ist nicht schön.',  en: 'This flower is not beautiful.',       adj_jp: 'きれい じゃない',    adj_romaji: 'kirei janai' },
        neg_past:    { jp: 'あの はな は きれい じゃなかった です。',   de: 'Jene Blume war nicht schön.',   en: 'That flower was not beautiful.',      adj_jp: 'きれい じゃなかった', adj_romaji: 'kirei janakatta' }
    }},

    { adj: 'げんき', romaji: 'genki', type: 'na', meaning_de: 'gesund / energiegeladen', meaning_en: 'healthy / energetic',
      forms: {
        present:     { jp: 'たなかさん は げんき ですね。',              de: 'Tanaka-san ist fit, oder?',     en: 'Tanaka-san is doing well, isn\'t he/she?', adj_jp: 'げんき',            adj_romaji: 'genki' },
        past:        { jp: 'たなかさん は げんき でした。',              de: 'Tanaka-san war fit.',           en: 'Tanaka-san was doing well.',              adj_jp: 'げんき でした',      adj_romaji: 'genki deshita' },
        neg_present: { jp: 'たなかさん は げんき じゃない ですね。',     de: 'Tanaka-san ist nicht fit.',    en: 'Tanaka-san is not doing well.',           adj_jp: 'げんき じゃない',    adj_romaji: 'genki janai' },
        neg_past:    { jp: 'たなかさん は げんき じゃなかった です。',   de: 'Tanaka-san war nicht fit.',     en: 'Tanaka-san was not doing well.',          adj_jp: 'げんき じゃなかった', adj_romaji: 'genki janakatta' }
    }},

    { adj: 'しずか', romaji: 'shizuka', type: 'na', meaning_de: 'ruhig / still', meaning_en: 'quiet / peaceful',
      forms: {
        present:     { jp: 'この としょかん は しずか ですね。',              de: 'Diese Bibliothek ist ruhig, oder?', en: 'This library is quiet, isn\'t it?', adj_jp: 'しずか',            adj_romaji: 'shizuka' },
        past:        { jp: 'あの としょかん は しずか でした。',              de: 'Jene Bibliothek war ruhig.',        en: 'That library was quiet.',           adj_jp: 'しずか でした',      adj_romaji: 'shizuka deshita' },
        neg_present: { jp: 'この としょかん は しずか じゃない ですね。',     de: 'Diese Bibliothek ist nicht ruhig.', en: 'This library is not quiet.',       adj_jp: 'しずか じゃない',    adj_romaji: 'shizuka janai' },
        neg_past:    { jp: 'あの としょかん は しずか じゃなかった です。',   de: 'Jene Bibliothek war nicht ruhig.',  en: 'That library was not quiet.',      adj_jp: 'しずか じゃなかった', adj_romaji: 'shizuka janakatta' }
    }},

    { adj: 'にぎやか', romaji: 'nigiyaka', type: 'na', meaning_de: 'lebhaft / belebt', meaning_en: 'lively / bustling',
      forms: {
        present:     { jp: 'この まち は にぎやか ですね。',              de: 'Diese Stadt ist lebhaft, oder?', en: 'This town is lively, isn\'t it?', adj_jp: 'にぎやか',            adj_romaji: 'nigiyaka' },
        past:        { jp: 'あの まち は にぎやか でした。',              de: 'Jene Stadt war lebhaft.',         en: 'That town was lively.',           adj_jp: 'にぎやか でした',      adj_romaji: 'nigiyaka deshita' },
        neg_present: { jp: 'この まち は にぎやか じゃない ですね。',     de: 'Diese Stadt ist nicht lebhaft.', en: 'This town is not lively.',        adj_jp: 'にぎやか じゃない',    adj_romaji: 'nigiyaka janai' },
        neg_past:    { jp: 'あの まち は にぎやか じゃなかった です。',   de: 'Jene Stadt war nicht lebhaft.',  en: 'That town was not lively.',       adj_jp: 'にぎやか じゃなかった', adj_romaji: 'nigiyaka janakatta' }
    }},

    { adj: 'べんり', romaji: 'benri', type: 'na', meaning_de: 'praktisch / nützlich', meaning_en: 'convenient / useful',
      forms: {
        present:     { jp: 'この アプリ は べんり ですね。',              de: 'Diese App ist praktisch, oder?', en: 'This app is convenient, isn\'t it?', adj_jp: 'べんり',            adj_romaji: 'benri' },
        past:        { jp: 'あの アプリ は べんり でした。',              de: 'Jene App war praktisch.',         en: 'That app was convenient.',          adj_jp: 'べんり でした',      adj_romaji: 'benri deshita' },
        neg_present: { jp: 'この アプリ は べんり じゃない ですね。',     de: 'Diese App ist nicht praktisch.', en: 'This app is not convenient.',      adj_jp: 'べんり じゃない',    adj_romaji: 'benri janai' },
        neg_past:    { jp: 'あの アプリ は べんり じゃなかった です。',   de: 'Jene App war nicht praktisch.',  en: 'That app was not convenient.',     adj_jp: 'べんり じゃなかった', adj_romaji: 'benri janakatta' }
    }},

    { adj: 'ゆうめい', romaji: 'yuumei', type: 'na', meaning_de: 'berühmt', meaning_en: 'famous',
      forms: {
        present:     { jp: 'あの えいが は ゆうめい ですね。',              de: 'Jener Film ist berühmt, oder?', en: 'That movie is famous, isn\'t it?', adj_jp: 'ゆうめい',            adj_romaji: 'yuumei' },
        past:        { jp: 'あの えいが は ゆうめい でした。',              de: 'Jener Film war berühmt.',        en: 'That movie was famous.',           adj_jp: 'ゆうめい でした',      adj_romaji: 'yuumei deshita' },
        neg_present: { jp: 'あの えいが は ゆうめい じゃない ですね。',     de: 'Jener Film ist nicht berühmt.', en: 'That movie is not famous.',        adj_jp: 'ゆうめい じゃない',    adj_romaji: 'yuumei janai' },
        neg_past:    { jp: 'あの えいが は ゆうめい じゃなかった です。',   de: 'Jener Film war nicht berühmt.', en: 'That movie was not famous.',       adj_jp: 'ゆうめい じゃなかった', adj_romaji: 'yuumei janakatta' }
    }},

    { adj: 'しんせつ', romaji: 'shinsetsu', type: 'na', meaning_de: 'freundlich / nett', meaning_en: 'kind / friendly',
      forms: {
        present:     { jp: 'あの せんせい は しんせつ ですね。',              de: 'Jener Lehrer ist freundlich, oder?', en: 'That teacher is kind, isn\'t he/she?', adj_jp: 'しんせつ',            adj_romaji: 'shinsetsu' },
        past:        { jp: 'あの せんせい は しんせつ でした。',              de: 'Jener Lehrer war freundlich.',        en: 'That teacher was kind.',              adj_jp: 'しんせつ でした',      adj_romaji: 'shinsetsu deshita' },
        neg_present: { jp: 'あの せんせい は しんせつ じゃない ですね。',     de: 'Jener Lehrer ist nicht freundlich.', en: 'That teacher is not kind.',           adj_jp: 'しんせつ じゃない',    adj_romaji: 'shinsetsu janai' },
        neg_past:    { jp: 'あの せんせい は しんせつ じゃなかった です。',   de: 'Jener Lehrer war nicht freundlich.', en: 'That teacher was not kind.',          adj_jp: 'しんせつ じゃなかった', adj_romaji: 'shinsetsu janakatta' }
    }}
];

/* ============ NACHSCHLAG-REFERENZ ============ */

const adjReference = {
    zeitformen: {
        title:    'Adjektiv-Zeitformen',
        title_en: 'Adjective Tenses',
        html: '<table class="ref-table"><thead><tr><th>Form</th><th>い-Adj. (たかい)</th><th>な-Adj. (きれい)</th></tr></thead><tbody>' +
              '<tr><td><strong>Gegenwart (+)</strong></td><td>たかい です</td><td>きれい です</td></tr>' +
              '<tr><td><strong>Vergangenheit (+)</strong></td><td>たかかった です</td><td>きれい でした</td></tr>' +
              '<tr><td><strong>Verneinung Geg. (−)</strong></td><td>たかくない です</td><td>きれい じゃない です</td></tr>' +
              '<tr><td><strong>Verneinung Vgh. (−)</strong></td><td>たかくなかった です</td><td>きれい じゃなかった です</td></tr>' +
              '</tbody></table>' +
              '<p><strong>Sonderfall いい → よ:</strong> Past: よかった ・ Neg: よくない ・ Neg Past: よくなかった</p>',
        html_en: '<table class="ref-table"><thead><tr><th>Form</th><th>i-Adj. (たかい)</th><th>na-Adj. (きれい)</th></tr></thead><tbody>' +
              '<tr><td><strong>Present (+)</strong></td><td>たかい です</td><td>きれい です</td></tr>' +
              '<tr><td><strong>Past (+)</strong></td><td>たかかった です</td><td>きれい でした</td></tr>' +
              '<tr><td><strong>Negative Pres. (−)</strong></td><td>たかくない です</td><td>きれい じゃない です</td></tr>' +
              '<tr><td><strong>Negative Past (−)</strong></td><td>たかくなかった です</td><td>きれい じゃなかった です</td></tr>' +
              '</tbody></table>' +
              '<p><strong>Irregular いい → よ:</strong> Past: よかった ・ Neg: よくない ・ Neg Past: よくなかった</p>'
    },
    i_adj: {
        title:    'い-Adjektive',
        title_en: 'i-Adjectives',
        html: '<p>い-Adjektive enden auf <strong>い</strong>. Im Pr&auml;dikat stehen sie direkt vor <strong>です</strong>. ' +
              'Vor einem Nomen bleiben sie unver&auml;ndert.</p>' +
              '<table class="ref-table"><thead><tr><th>Adjektiv</th><th>Romaji</th><th>Bedeutung</th></tr></thead><tbody>' +
              '<tr><td>たかい</td><td>takai</td><td>teuer / hoch</td></tr>' +
              '<tr><td>やすい</td><td>yasui</td><td>billig / g&uuml;nstig</td></tr>' +
              '<tr><td>おおきい</td><td>ookii</td><td>gro&szlig;</td></tr>' +
              '<tr><td>ちいさい</td><td>chiisai</td><td>klein</td></tr>' +
              '<tr><td>あたらしい</td><td>atarashii</td><td>neu</td></tr>' +
              '<tr><td>ふるい</td><td>furui</td><td>alt (Gegenst&auml;nde)</td></tr>' +
              '<tr><td>いい</td><td>ii</td><td>gut</td></tr>' +
              '<tr><td>わるい</td><td>warui</td><td>schlecht</td></tr>' +
              '<tr><td>おいしい</td><td>oishii</td><td>lecker</td></tr>' +
              '<tr><td>むずかしい</td><td>muzukashii</td><td>schwierig</td></tr>' +
              '<tr><td>やさしい</td><td>yasashii</td><td>leicht / freundlich</td></tr>' +
              '<tr><td>おもしろい</td><td>omoshiroi</td><td>interessant / lustig</td></tr>' +
              '<tr><td>あつい</td><td>atsui</td><td>hei&szlig;</td></tr>' +
              '<tr><td>さむい</td><td>samui</td><td>kalt (Wetter)</td></tr>' +
              '<tr><td>かわいい</td><td>kawaii</td><td>s&uuml;&szlig; / niedlich</td></tr>' +
              '<tr><td>はやい</td><td>hayai</td><td>schnell / fr&uuml;h</td></tr>' +
              '<tr><td>たのしい</td><td>tanoshii</td><td>spa&szlig;ig / angenehm</td></tr>' +
              '<tr><td>ひろい</td><td>hiroi</td><td>weit / ger&auml;umig</td></tr>' +
              '</tbody></table>',
        html_en: '<p>i-Adjectives end in <strong>い</strong>. In predicate position they appear directly before <strong>です</strong>. ' +
              'Before a noun they remain unchanged.</p>' +
              '<table class="ref-table"><thead><tr><th>Adjective</th><th>Romaji</th><th>Meaning</th></tr></thead><tbody>' +
              '<tr><td>たかい</td><td>takai</td><td>expensive / tall</td></tr>' +
              '<tr><td>やすい</td><td>yasui</td><td>cheap / inexpensive</td></tr>' +
              '<tr><td>おおきい</td><td>ookii</td><td>big / large</td></tr>' +
              '<tr><td>ちいさい</td><td>chiisai</td><td>small / little</td></tr>' +
              '<tr><td>あたらしい</td><td>atarashii</td><td>new</td></tr>' +
              '<tr><td>ふるい</td><td>furui</td><td>old (things)</td></tr>' +
              '<tr><td>いい</td><td>ii</td><td>good</td></tr>' +
              '<tr><td>わるい</td><td>warui</td><td>bad</td></tr>' +
              '<tr><td>おいしい</td><td>oishii</td><td>delicious / tasty</td></tr>' +
              '<tr><td>むずかしい</td><td>muzukashii</td><td>difficult</td></tr>' +
              '<tr><td>やさしい</td><td>yasashii</td><td>easy / kind</td></tr>' +
              '<tr><td>おもしろい</td><td>omoshiroi</td><td>interesting / funny</td></tr>' +
              '<tr><td>あつい</td><td>atsui</td><td>hot</td></tr>' +
              '<tr><td>さむい</td><td>samui</td><td>cold (weather)</td></tr>' +
              '<tr><td>かわいい</td><td>kawaii</td><td>cute</td></tr>' +
              '<tr><td>はやい</td><td>hayai</td><td>fast / early</td></tr>' +
              '<tr><td>たのしい</td><td>tanoshii</td><td>fun / enjoyable</td></tr>' +
              '<tr><td>ひろい</td><td>hiroi</td><td>wide / spacious</td></tr>' +
              '</tbody></table>'
    },
    na_adj: {
        title:    'な-Adjektive',
        title_en: 'na-Adjectives',
        html: '<p>な-Adjektive stehen im Pr&auml;dikat direkt vor <strong>です</strong> (ohne な). ' +
              'Vor einem Nomen wird <strong>な</strong> angeh&auml;ngt: きれい<strong>な</strong> はな.</p>' +
              '<table class="ref-table"><thead><tr><th>Adjektiv</th><th>Romaji</th><th>Bedeutung</th></tr></thead><tbody>' +
              '<tr><td>きれい</td><td>kirei</td><td>sch&ouml;n / sauber</td></tr>' +
              '<tr><td>げんき</td><td>genki</td><td>gesund / energiegeladen</td></tr>' +
              '<tr><td>しずか</td><td>shizuka</td><td>ruhig / still</td></tr>' +
              '<tr><td>にぎやか</td><td>nigiyaka</td><td>lebhaft / belebt</td></tr>' +
              '<tr><td>べんり</td><td>benri</td><td>praktisch / n&uuml;tzlich</td></tr>' +
              '<tr><td>ゆうめい</td><td>yuumei</td><td>ber&uuml;hmt</td></tr>' +
              '<tr><td>しんせつ</td><td>shinsetsu</td><td>freundlich / nett</td></tr>' +
              '</tbody></table>',
        html_en: '<p>na-Adjectives appear before <strong>です</strong> without な in predicate position. ' +
              'Before a noun, <strong>な</strong> is added: きれい<strong>な</strong> はな (a beautiful flower).</p>' +
              '<table class="ref-table"><thead><tr><th>Adjective</th><th>Romaji</th><th>Meaning</th></tr></thead><tbody>' +
              '<tr><td>きれい</td><td>kirei</td><td>beautiful / clean</td></tr>' +
              '<tr><td>げんき</td><td>genki</td><td>healthy / energetic</td></tr>' +
              '<tr><td>しずか</td><td>shizuka</td><td>quiet / peaceful</td></tr>' +
              '<tr><td>にぎやか</td><td>nigiyaka</td><td>lively / bustling</td></tr>' +
              '<tr><td>べんり</td><td>benri</td><td>convenient / useful</td></tr>' +
              '<tr><td>ゆうめい</td><td>yuumei</td><td>famous</td></tr>' +
              '<tr><td>しんせつ</td><td>shinsetsu</td><td>kind / friendly</td></tr>' +
              '</tbody></table>'
    }
};
