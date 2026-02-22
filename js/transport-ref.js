/* Japanisch Lernprogramm — Erstellt von Hi156 unter Verwendung von Claude (Anthropic) */

/* transport-ref.js — Nachschlag-Referenz fuer Verkehr & Fortbewegung.
   Geladen nach transport-data.js, vor transport.js. */

const transportReference = {
    transportmittel: {
        title: 'Transportmittel',
        title_en: 'Transport Modes',
        html: '<table class="ref-table"><thead><tr><th>Japanisch</th><th>Romaji</th><th>Bedeutung</th></tr></thead><tbody>' +
            '<tr><td>あるいて</td><td>aruite</td><td>zu Fu&szlig;</td></tr>' +
            '<tr><td>でんしゃ</td><td>densha</td><td>Zug</td></tr>' +
            '<tr><td>ちかてつ</td><td>chikatetsu</td><td>U-Bahn</td></tr>' +
            '<tr><td>バス</td><td>basu</td><td>Bus</td></tr>' +
            '<tr><td>タクシー</td><td>takush&imacr;</td><td>Taxi</td></tr>' +
            '<tr><td>くるま</td><td>kuruma</td><td>Auto</td></tr>' +
            '<tr><td>ひこうき</td><td>hikouki</td><td>Flugzeug</td></tr>' +
            '<tr><td>じてんしゃ</td><td>jitensha</td><td>Fahrrad</td></tr>' +
            '</tbody></table>',
        html_en: '<table class="ref-table"><thead><tr><th>Japanese</th><th>Romaji</th><th>Meaning</th></tr></thead><tbody>' +
            '<tr><td>あるいて</td><td>aruite</td><td>on foot</td></tr>' +
            '<tr><td>でんしゃ</td><td>densha</td><td>train</td></tr>' +
            '<tr><td>ちかてつ</td><td>chikatetsu</td><td>subway</td></tr>' +
            '<tr><td>バス</td><td>basu</td><td>bus</td></tr>' +
            '<tr><td>タクシー</td><td>takush&imacr;</td><td>taxi</td></tr>' +
            '<tr><td>くるま</td><td>kuruma</td><td>car</td></tr>' +
            '<tr><td>ひこうき</td><td>hikouki</td><td>airplane</td></tr>' +
            '<tr><td>じてんしゃ</td><td>jitensha</td><td>bicycle</td></tr>' +
            '</tbody></table>'
    },
    orte: {
        title: 'Orte',
        title_en: 'Places',
        html: '<table class="ref-table"><thead><tr><th>Japanisch</th><th>Romaji</th><th>Bedeutung</th></tr></thead><tbody>' +
            '<tr><td>いえ</td><td>ie</td><td>Zuhause</td></tr>' +
            '<tr><td>えき</td><td>eki</td><td>Bahnhof</td></tr>' +
            '<tr><td>がっこう</td><td>gakkou</td><td>Schule</td></tr>' +
            '<tr><td>くうこう</td><td>kuukou</td><td>Flughafen</td></tr>' +
            '<tr><td>びょういん</td><td>byouin</td><td>Krankenhaus</td></tr>' +
            '<tr><td>こうえん</td><td>kouen</td><td>Park</td></tr>' +
            '<tr><td>スーパー</td><td>s&umacr;p&amacr;</td><td>Supermarkt</td></tr>' +
            '<tr><td>バス停</td><td>basutei</td><td>Bushaltestelle</td></tr>' +
            '<tr><td>地下鉄の駅</td><td>chikatetsu no eki</td><td>U-Bahnstation</td></tr>' +
            '<tr><td>ホテル</td><td>hoteru</td><td>Hotel</td></tr>' +
            '<tr><td>会社</td><td>kaisha</td><td>Firma / B&uuml;ro</td></tr>' +
            '<tr><td>コンビニ</td><td>konbini</td><td>Konbini</td></tr>' +
            '</tbody></table>',
        html_en: '<table class="ref-table"><thead><tr><th>Japanese</th><th>Romaji</th><th>Meaning</th></tr></thead><tbody>' +
            '<tr><td>いえ</td><td>ie</td><td>Home</td></tr>' +
            '<tr><td>えき</td><td>eki</td><td>Station</td></tr>' +
            '<tr><td>がっこう</td><td>gakkou</td><td>School</td></tr>' +
            '<tr><td>くうこう</td><td>kuukou</td><td>Airport</td></tr>' +
            '<tr><td>びょういん</td><td>byouin</td><td>Hospital</td></tr>' +
            '<tr><td>こうえん</td><td>kouen</td><td>Park</td></tr>' +
            '<tr><td>スーパー</td><td>s&umacr;p&amacr;</td><td>Supermarket</td></tr>' +
            '<tr><td>バス停</td><td>basutei</td><td>Bus Stop</td></tr>' +
            '<tr><td>地下鉄の駅</td><td>chikatetsu no eki</td><td>Subway Station</td></tr>' +
            '<tr><td>ホテル</td><td>hoteru</td><td>Hotel</td></tr>' +
            '<tr><td>会社</td><td>kaisha</td><td>Company / Office</td></tr>' +
            '<tr><td>コンビニ</td><td>konbini</td><td>Convenience Store</td></tr>' +
            '</tbody></table>'
    },
    satzmuster: {
        title: 'Satzmuster',
        title_en: 'Sentence Patterns',
        html: '<ul>' +
            '<li><strong>Grundmuster:</strong> [Ziel] まで [Transportmittel] で いきます</li>' +
            '<li>がっこう<strong>まで</strong> バス<strong>で</strong> いきます = Ich fahre <strong>mit dem Bus</strong> zur Schule</li>' +
            '<li>えき<strong>まで</strong> あるいて いきます = Ich gehe <strong>zu Fu&szlig;</strong> zum Bahnhof</li>' +
            '</ul>' +
            '<p><strong>Partikel で (de):</strong> Gibt das Transportmittel an (\"mit/per\").</p>' +
            '<p><strong>Partikel まで (made):</strong> Gibt das Ziel an (\"bis/nach\").</p>',
        html_en: '<ul>' +
            '<li><strong>Basic pattern:</strong> [Destination] まで [Transport] で いきます</li>' +
            '<li>がっこう<strong>まで</strong> バス<strong>で</strong> いきます = I go to school <strong>by bus</strong></li>' +
            '<li>えき<strong>まで</strong> あるいて いきます = I go to the station <strong>on foot</strong></li>' +
            '</ul>' +
            '<p><strong>Particle で (de):</strong> Indicates the means of transport ("by/with").</p>' +
            '<p><strong>Particle まで (made):</strong> Indicates the destination ("to/until").</p>'
    },
    verben: {
        title: 'のります / おります',
        title_en: 'のります / おります',
        html: '<table class="ref-table"><thead><tr><th>Verb</th><th>Romaji</th><th>Bedeutung</th></tr></thead><tbody>' +
            '<tr><td>のります</td><td>norimasu</td><td>einsteigen / fahren mit</td></tr>' +
            '<tr><td>おります</td><td>orimasu</td><td>aussteigen</td></tr>' +
            '</tbody></table>' +
            '<ul>' +
            '<li>でんしゃ<strong>に</strong>のります = In den Zug <strong>einsteigen</strong></li>' +
            '<li>バス<strong>を</strong>おります = Aus dem Bus <strong>aussteigen</strong></li>' +
            '<li><strong>Beachte:</strong> のります verwendet <strong>に</strong>, おります verwendet <strong>を</strong></li>' +
            '</ul>',
        html_en: '<table class="ref-table"><thead><tr><th>Verb</th><th>Romaji</th><th>Meaning</th></tr></thead><tbody>' +
            '<tr><td>のります</td><td>norimasu</td><td>to get on / to ride</td></tr>' +
            '<tr><td>おります</td><td>orimasu</td><td>to get off</td></tr>' +
            '</tbody></table>' +
            '<ul>' +
            '<li>でんしゃ<strong>に</strong>のります = <strong>Get on</strong> the train</li>' +
            '<li>バス<strong>を</strong>おります = <strong>Get off</strong> the bus</li>' +
            '<li><strong>Note:</strong> のります uses <strong>に</strong>, おります uses <strong>を</strong></li>' +
            '</ul>'
    }
};
