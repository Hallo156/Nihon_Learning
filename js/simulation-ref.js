/* Japanisch Lernprogramm — Erstellt von Hi156 unter Verwendung von Claude (Anthropic) */

/* simulation-ref.js — Nachschlag-Referenz fuer Einkaufs-Simulation.
   Geladen nach simulation-data.js, vor simulation.js. */

const simulationReference = {
    phrasen: {
        title: 'Einkaufsphrasen',
        title_en: 'Shopping Phrases',
        html: '<table class="ref-table"><thead><tr><th>Japanisch</th><th>Romaji</th><th>Bedeutung</th></tr></thead><tbody>' +
            '<tr><td>いらっしゃいませ</td><td>irasshaimase</td><td>Willkommen!</td></tr>' +
            '<tr><td>すみません</td><td>sumimasen</td><td>Entschuldigung</td></tr>' +
            '<tr><td>～をください</td><td>~wo kudasai</td><td>Bitte geben Sie mir ~</td></tr>' +
            '<tr><td>～をさがしています</td><td>~wo sagashite imasu</td><td>Ich suche ~</td></tr>' +
            '<tr><td>～はありますか？</td><td>~wa arimasu ka?</td><td>Haben Sie ~?</td></tr>' +
            '<tr><td>いくらですか？</td><td>ikura desu ka?</td><td>Wie viel kostet es?</td></tr>' +
            '<tr><td>～えんです</td><td>~en desu</td><td>Es kostet ~ Yen</td></tr>' +
            '<tr><td>ありがとうございます</td><td>arigatou gozaimasu</td><td>Vielen Dank</td></tr>' +
            '</tbody></table>',
        html_en: '<table class="ref-table"><thead><tr><th>Japanese</th><th>Romaji</th><th>Meaning</th></tr></thead><tbody>' +
            '<tr><td>いらっしゃいませ</td><td>irasshaimase</td><td>Welcome!</td></tr>' +
            '<tr><td>すみません</td><td>sumimasen</td><td>Excuse me</td></tr>' +
            '<tr><td>～をください</td><td>~wo kudasai</td><td>Please give me ~</td></tr>' +
            '<tr><td>～をさがしています</td><td>~wo sagashite imasu</td><td>I am looking for ~</td></tr>' +
            '<tr><td>～はありますか？</td><td>~wa arimasu ka?</td><td>Do you have ~?</td></tr>' +
            '<tr><td>いくらですか？</td><td>ikura desu ka?</td><td>How much is it?</td></tr>' +
            '<tr><td>～えんです</td><td>~en desu</td><td>It costs ~ yen</td></tr>' +
            '<tr><td>ありがとうございます</td><td>arigatou gozaimasu</td><td>Thank you very much</td></tr>' +
            '</tbody></table>'
    },
    kosoado: {
        title: 'これ・それ・あれ (Demonstrativpronomen)',
        title_en: 'これ・それ・あれ (Demonstratives)',
        html: '<table class="ref-table"><thead><tr><th>Wort</th><th>Romaji</th><th>Bedeutung</th><th>Abstand</th></tr></thead><tbody>' +
            '<tr><td>これ</td><td>kore</td><td>dies (hier)</td><td>nah beim Sprecher</td></tr>' +
            '<tr><td>それ</td><td>sore</td><td>das (da)</td><td>nah beim H&ouml;rer</td></tr>' +
            '<tr><td>あれ</td><td>are</td><td>jenes (dort)</td><td>weit von beiden</td></tr>' +
            '<tr><td>どれ</td><td>dore</td><td>welches?</td><td>Frage</td></tr>' +
            '</tbody></table>' +
            '<p><strong>Beispiel:</strong> これをください = Bitte geben Sie mir <em>dieses hier</em>.</p>',
        html_en: '<table class="ref-table"><thead><tr><th>Word</th><th>Romaji</th><th>Meaning</th><th>Distance</th></tr></thead><tbody>' +
            '<tr><td>これ</td><td>kore</td><td>this (here)</td><td>near speaker</td></tr>' +
            '<tr><td>それ</td><td>sore</td><td>that (there)</td><td>near listener</td></tr>' +
            '<tr><td>あれ</td><td>are</td><td>that (over there)</td><td>far from both</td></tr>' +
            '<tr><td>どれ</td><td>dore</td><td>which one?</td><td>question</td></tr>' +
            '</tbody></table>' +
            '<p><strong>Example:</strong> これをください = Please give me <em>this one</em>.</p>'
    },
    adjektive: {
        title: 'N\u00fctzliche Adjektive',
        title_en: 'Useful Adjectives',
        html: '<table class="ref-table"><thead><tr><th>Japanisch</th><th>Romaji</th><th>Bedeutung</th></tr></thead><tbody>' +
            '<tr><td>おおきい</td><td>ookii</td><td>gro&szlig;</td></tr>' +
            '<tr><td>ちいさい</td><td>chiisai</td><td>klein</td></tr>' +
            '<tr><td>たかい</td><td>takai</td><td>teuer / hoch</td></tr>' +
            '<tr><td>やすい</td><td>yasui</td><td>g&uuml;nstig</td></tr>' +
            '<tr><td>あおい</td><td>aoi</td><td>blau</td></tr>' +
            '<tr><td>くろい</td><td>kuroi</td><td>schwarz</td></tr>' +
            '<tr><td>しろい</td><td>shiroi</td><td>wei&szlig;</td></tr>' +
            '</tbody></table>',
        html_en: '<table class="ref-table"><thead><tr><th>Japanese</th><th>Romaji</th><th>Meaning</th></tr></thead><tbody>' +
            '<tr><td>おおきい</td><td>ookii</td><td>big</td></tr>' +
            '<tr><td>ちいさい</td><td>chiisai</td><td>small</td></tr>' +
            '<tr><td>たかい</td><td>takai</td><td>expensive / high</td></tr>' +
            '<tr><td>やすい</td><td>yasui</td><td>cheap</td></tr>' +
            '<tr><td>あおい</td><td>aoi</td><td>blue</td></tr>' +
            '<tr><td>くろい</td><td>kuroi</td><td>black</td></tr>' +
            '<tr><td>しろい</td><td>shiroi</td><td>white</td></tr>' +
            '</tbody></table>'
    }
};
