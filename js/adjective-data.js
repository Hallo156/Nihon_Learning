/* Japanisch Lernprogramm — Erstellt von Hi156 unter Verwendung von Claude (Anthropic) */

/* adjective-data.js — Adjektiv-Trainer: Daten (25 Adjektive, bilingual) + Nachschlag-Referenz.
   Braucht: common.js, i18n.js */

/* ============ DATEN ============ */

const adjectivesData = [
    // ── い-Adjektive ──
    { adj: 'たかい',     romaji: 'takai',      type: 'i',  meaning_de: 'teuer / hoch',           meaning_en: 'expensive / tall',
      sentence_jp_blank: 'このレストランは ＿＿＿＿＿ です。',
      sentence_jp_filled: 'このレストランは たかい です。',
      sentence_de_filled: 'Dieses Restaurant ist teuer.',
      sentence_en_filled: 'This restaurant is expensive.' },

    { adj: 'やすい',     romaji: 'yasui',      type: 'i',  meaning_de: 'billig / günstig',        meaning_en: 'cheap / inexpensive',
      sentence_jp_blank: 'このスーパーは ＿＿＿＿＿ ですね。',
      sentence_jp_filled: 'このスーパーは やすい ですね。',
      sentence_de_filled: 'Dieser Supermarkt ist günstig, oder?',
      sentence_en_filled: 'This supermarket is cheap, isn\'t it?' },

    { adj: 'おおきい',   romaji: 'ookii',      type: 'i',  meaning_de: 'groß',                   meaning_en: 'big / large',
      sentence_jp_blank: 'あの いぬ は ＿＿＿＿＿ ですね。',
      sentence_jp_filled: 'あの いぬ は おおきい ですね。',
      sentence_de_filled: 'Jener Hund ist groß, oder?',
      sentence_en_filled: 'That dog is big, isn\'t it?' },

    { adj: 'ちいさい',   romaji: 'chiisai',    type: 'i',  meaning_de: 'klein',                  meaning_en: 'small / little',
      sentence_jp_blank: 'この ねこ は ＿＿＿＿＿ ですね。',
      sentence_jp_filled: 'この ねこ は ちいさい ですね。',
      sentence_de_filled: 'Diese Katze ist klein, oder?',
      sentence_en_filled: 'This cat is small, isn\'t it?' },

    { adj: 'あたらしい', romaji: 'atarashii',  type: 'i',  meaning_de: 'neu',                    meaning_en: 'new',
      sentence_jp_blank: 'この くるま は ＿＿＿＿＿ ですね。',
      sentence_jp_filled: 'この くるま は あたらしい ですね。',
      sentence_de_filled: 'Dieses Auto ist neu, oder?',
      sentence_en_filled: 'This car is new, isn\'t it?' },

    { adj: 'ふるい',     romaji: 'furui',      type: 'i',  meaning_de: 'alt (Gegenstände)',       meaning_en: 'old (things)',
      sentence_jp_blank: 'この じてんしゃ は ＿＿＿＿＿ ですね。',
      sentence_jp_filled: 'この じてんしゃ は ふるい ですね。',
      sentence_de_filled: 'Dieses Fahrrad ist alt, oder?',
      sentence_en_filled: 'This bicycle is old, isn\'t it?' },

    { adj: 'いい',       romaji: 'ii',         type: 'i',  meaning_de: 'gut',                    meaning_en: 'good',
      sentence_jp_blank: 'この コーヒー は ＿＿＿＿＿ ですね。',
      sentence_jp_filled: 'この コーヒー は いい ですね。',
      sentence_de_filled: 'Dieser Kaffee ist gut, oder?',
      sentence_en_filled: 'This coffee is good, isn\'t it?' },

    { adj: 'わるい',     romaji: 'warui',      type: 'i',  meaning_de: 'schlecht',               meaning_en: 'bad',
      sentence_jp_blank: 'きょう の てんき は ＿＿＿＿＿ ですね。',
      sentence_jp_filled: 'きょう の てんき は わるい ですね。',
      sentence_de_filled: 'Das Wetter heute ist schlecht, oder?',
      sentence_en_filled: 'The weather today is bad, isn\'t it?' },

    { adj: 'おいしい',   romaji: 'oishii',     type: 'i',  meaning_de: 'lecker',                 meaning_en: 'delicious / tasty',
      sentence_jp_blank: 'この ケーキ は ＿＿＿＿＿ ですね！',
      sentence_jp_filled: 'この ケーキ は おいしい ですね！',
      sentence_de_filled: 'Dieser Kuchen ist lecker!',
      sentence_en_filled: 'This cake is delicious!' },

    { adj: 'むずかしい', romaji: 'muzukashii', type: 'i',  meaning_de: 'schwierig',              meaning_en: 'difficult',
      sentence_jp_blank: 'この もんだい は ＿＿＿＿＿ ですね。',
      sentence_jp_filled: 'この もんだい は むずかしい ですね。',
      sentence_de_filled: 'Diese Aufgabe ist schwierig, oder?',
      sentence_en_filled: 'This problem is difficult, isn\'t it?' },

    { adj: 'やさしい',   romaji: 'yasashii',   type: 'i',  meaning_de: 'leicht / freundlich',    meaning_en: 'easy / kind',
      sentence_jp_blank: 'この テスト は ＿＿＿＿＿ です。',
      sentence_jp_filled: 'この テスト は やさしい です。',
      sentence_de_filled: 'Dieser Test ist einfach.',
      sentence_en_filled: 'This test is easy.' },

    { adj: 'おもしろい', romaji: 'omoshiroi',  type: 'i',  meaning_de: 'interessant / lustig',   meaning_en: 'interesting / funny',
      sentence_jp_blank: 'この ほん は ＿＿＿＿＿ ですね。',
      sentence_jp_filled: 'この ほん は おもしろい ですね。',
      sentence_de_filled: 'Dieses Buch ist interessant, oder?',
      sentence_en_filled: 'This book is interesting, isn\'t it?' },

    { adj: 'あつい',     romaji: 'atsui',      type: 'i',  meaning_de: 'heiß',                   meaning_en: 'hot',
      sentence_jp_blank: 'きょう は ＿＿＿＿＿ ですね。',
      sentence_jp_filled: 'きょう は あつい ですね。',
      sentence_de_filled: 'Heute ist es heiß, oder?',
      sentence_en_filled: 'It\'s hot today, isn\'t it?' },

    { adj: 'さむい',     romaji: 'samui',      type: 'i',  meaning_de: 'kalt (Wetter)',          meaning_en: 'cold (weather)',
      sentence_jp_blank: 'ふゆ は ＿＿＿＿＿ ですね。',
      sentence_jp_filled: 'ふゆ は さむい ですね。',
      sentence_de_filled: 'Der Winter ist kalt, oder?',
      sentence_en_filled: 'Winter is cold, isn\'t it?' },

    { adj: 'かわいい',   romaji: 'kawaii',     type: 'i',  meaning_de: 'süß / niedlich',         meaning_en: 'cute',
      sentence_jp_blank: 'この ぬいぐるみ は ＿＿＿＿＿ ですね！',
      sentence_jp_filled: 'この ぬいぐるみ は かわいい ですね！',
      sentence_de_filled: 'Dieses Kuscheltier ist süß!',
      sentence_en_filled: 'This stuffed animal is cute!' },

    { adj: 'はやい',     romaji: 'hayai',      type: 'i',  meaning_de: 'schnell / früh',         meaning_en: 'fast / early',
      sentence_jp_blank: 'この でんしゃ は ＿＿＿＿＿ ですね。',
      sentence_jp_filled: 'この でんしゃ は はやい ですね。',
      sentence_de_filled: 'Dieser Zug ist schnell, oder?',
      sentence_en_filled: 'This train is fast, isn\'t it?' },

    { adj: 'たのしい',   romaji: 'tanoshii',   type: 'i',  meaning_de: 'spaßig / angenehm',      meaning_en: 'fun / enjoyable',
      sentence_jp_blank: 'この パーティー は ＿＿＿＿＿ ですね。',
      sentence_jp_filled: 'この パーティー は たのしい ですね。',
      sentence_de_filled: 'Diese Party macht Spaß, oder?',
      sentence_en_filled: 'This party is fun, isn\'t it?' },

    { adj: 'ひろい',     romaji: 'hiroi',      type: 'i',  meaning_de: 'weit / geräumig',        meaning_en: 'wide / spacious',
      sentence_jp_blank: 'この こうえん は ＿＿＿＿＿ ですね。',
      sentence_jp_filled: 'この こうえん は ひろい ですね。',
      sentence_de_filled: 'Dieser Park ist geräumig, oder?',
      sentence_en_filled: 'This park is spacious, isn\'t it?' },

    // ── な-Adjektive ──
    { adj: 'きれい',     romaji: 'kirei',      type: 'na', meaning_de: 'schön / sauber',         meaning_en: 'beautiful / clean',
      sentence_jp_blank: 'この はな は ＿＿＿＿＿ ですね。',
      sentence_jp_filled: 'この はな は きれい ですね。',
      sentence_de_filled: 'Diese Blume ist schön, oder?',
      sentence_en_filled: 'This flower is beautiful, isn\'t it?' },

    { adj: 'げんき',     romaji: 'genki',      type: 'na', meaning_de: 'gesund / energiegeladen', meaning_en: 'healthy / energetic',
      sentence_jp_blank: 'たなかさん は ＿＿＿＿＿ ですね。',
      sentence_jp_filled: 'たなかさん は げんき ですね。',
      sentence_de_filled: 'Tanaka-san ist fit, oder?',
      sentence_en_filled: 'Tanaka-san is doing well, isn\'t he/she?' },

    { adj: 'しずか',     romaji: 'shizuka',    type: 'na', meaning_de: 'ruhig / still',          meaning_en: 'quiet / peaceful',
      sentence_jp_blank: 'この としょかん は ＿＿＿＿＿ ですね。',
      sentence_jp_filled: 'この としょかん は しずか ですね。',
      sentence_de_filled: 'Diese Bibliothek ist ruhig, oder?',
      sentence_en_filled: 'This library is quiet, isn\'t it?' },

    { adj: 'にぎやか',   romaji: 'nigiyaka',   type: 'na', meaning_de: 'lebhaft / belebt',       meaning_en: 'lively / bustling',
      sentence_jp_blank: 'この まち は ＿＿＿＿＿ ですね。',
      sentence_jp_filled: 'この まち は にぎやか ですね。',
      sentence_de_filled: 'Diese Stadt ist lebhaft, oder?',
      sentence_en_filled: 'This town is lively, isn\'t it?' },

    { adj: 'べんり',     romaji: 'benri',      type: 'na', meaning_de: 'praktisch / nützlich',   meaning_en: 'convenient / useful',
      sentence_jp_blank: 'この アプリ は ＿＿＿＿＿ ですね。',
      sentence_jp_filled: 'この アプリ は べんり ですね。',
      sentence_de_filled: 'Diese App ist praktisch, oder?',
      sentence_en_filled: 'This app is convenient, isn\'t it?' },

    { adj: 'ゆうめい',   romaji: 'yuumei',     type: 'na', meaning_de: 'berühmt',                meaning_en: 'famous',
      sentence_jp_blank: 'あの えいが は ＿＿＿＿＿ ですね。',
      sentence_jp_filled: 'あの えいが は ゆうめい ですね。',
      sentence_de_filled: 'Jener Film ist berühmt, oder?',
      sentence_en_filled: 'That movie is famous, isn\'t it?' },

    { adj: 'しんせつ',   romaji: 'shinsetsu',  type: 'na', meaning_de: 'freundlich / nett',      meaning_en: 'kind / friendly',
      sentence_jp_blank: 'あの せんせい は ＿＿＿＿＿ ですね。',
      sentence_jp_filled: 'あの せんせい は しんせつ ですね。',
      sentence_de_filled: 'Jener Lehrer ist freundlich, oder?',
      sentence_en_filled: 'That teacher is kind, isn\'t he/she?' }
];

/* ============ NACHSCHLAG-REFERENZ ============ */

const adjReference = {
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
    },
    grammar: {
        title:    'Grammatik-Hinweise',
        title_en: 'Grammar Notes',
        html: '<p><strong>Pr&auml;dikative Verwendung</strong> (Adjektiv als Satzaussage):</p>' +
              '<ul>' +
              '<li>い-Adj: この ほん は <strong>おもしろい</strong> です。(Dieses Buch ist interessant.)</li>' +
              '<li>な-Adj: この まち は <strong>にぎやか</strong> です。(Diese Stadt ist lebhaft.)</li>' +
              '</ul>' +
              '<p><strong>Attributive Verwendung</strong> (Adjektiv vor Nomen):</p>' +
              '<ul>' +
              '<li>い-Adj: <strong>おもしろい</strong> ほん (ein interessantes Buch)</li>' +
              '<li>な-Adj: <strong>にぎやか<em>な</em></strong> まち (eine lebhafte Stadt) — な wird angeh&auml;ngt!</li>' +
              '</ul>',
        html_en: '<p><strong>Predicate use</strong> (adjective as sentence predicate):</p>' +
              '<ul>' +
              '<li>i-adj: この ほん は <strong>おもしろい</strong> です。(This book is interesting.)</li>' +
              '<li>na-adj: この まち は <strong>にぎやか</strong> です。(This town is lively.)</li>' +
              '</ul>' +
              '<p><strong>Attributive use</strong> (adjective before noun):</p>' +
              '<ul>' +
              '<li>i-adj: <strong>おもしろい</strong> ほん (an interesting book)</li>' +
              '<li>na-adj: <strong>にぎやか<em>な</em></strong> まち (a lively town) — な is added!</li>' +
              '</ul>'
    }
};
