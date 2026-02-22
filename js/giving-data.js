/* Japanisch Lernprogramm — Erstellt von Hi156 unter Verwendung von Claude (Anthropic) */

/* giving-data.js — Geben & Nehmen Dialogszenen: あげる・もらう・くれる.
   Jede Zeile hat ggf. ein romaji-Feld (text-Zeilen) bzw.
   before_romaji / after_romaji / answer_romaji (blank-Zeilen) für den Romaji-Toggle. */

const givingScenes = [
    { id: 'giving1', label: 'Geburtstag',  label_en: 'Birthday', checked: true,
      speakerLabels: { ten: { de: 'Sakura', en: 'Sakura' }, kyaku: { de: 'Kenta', en: 'Kenta' } } },
    { id: 'giving2', label: 'Familie',     label_en: 'Family',   checked: true,
      speakerLabels: { ten: { de: 'Yui',    en: 'Yui'    }, kyaku: { de: 'Sota',  en: 'Sota'  } } },
    { id: 'giving3', label: 'Kette',       label_en: 'Chain',    checked: true,
      speakerLabels: { ten: { de: 'Momo',   en: 'Momo'   }, kyaku: { de: 'Riku',  en: 'Riku'  } } },
];

/* =====================================================================
   SZENEN-DIALOGE
   ===================================================================== */

const givingDialogs = {

    /* ---- GEBEN & NEHMEN 1 ----
       Fokus: あげました / もらいました / くれました im Kontext einer Geburtstagsparty.
       Personen: Sakura (ten, erzählt) und Kenta (kyaku, fragt).
       Abgedeckt: Sprecher gibt an Freundin (あげます), Sprecher bekommt (もらいます),
                  Eltern geben an Sprecher (くれます).
    */
    giving1: [
        { type: 'text', speaker: 'ten',
          jp:     '昨日、友達の誕生日パーティーがありました！',
          romaji: 'Kinō, tomodachi no tanjōbi pāti ga arimashita!',
          de:     'Gestern war die Geburtstagsparty meiner Freundin!',
          en:     "Yesterday was my friend's birthday party!" },

        { type: 'blank', speaker: 'kyaku',
          before: '友達に何か', after: 'か？',
          before_romaji: 'Tomodachi ni nani ka', after_romaji: ' ka?', answer_romaji: 'agemashita',
          before_en: 'Did you ', after_en: ' your friend something?',
          de: 'Toll! Hast du deiner Freundin etwas gegeben?',
          en: 'Nice! Did you give your friend something?',
          correct: ['あげました', 'agemashita'],
          choices: ['あげました', 'もらいました', 'くれました', 'みました'],
          explanation: 'あげました (agemashita) = gab. [私は]友達に何かをあげました = Ich habe meiner Freundin etwas gegeben. Sprecher gibt an jemanden → あげます.',
          explanation_en: 'あげました (agemashita) = gave. [私は]友達に何かをあげました = I gave my friend something. Speaker gives to someone → あげます.' },

        { type: 'text', speaker: 'ten',
          jp:     'はい！チョコレートとお花をあげました。とても喜んでくれましたよ。',
          romaji: 'Hai! Chokoreeto to ohana wo agemashita. Totemo yorokonde kuremashita yo.',
          de:     'Ja! Ich habe ihr Schokolade und Blumen gegeben. Sie hat sich sehr gefreut.',
          en:     'Yes! I gave her chocolate and flowers. She was very happy.' },

        { type: 'blank', speaker: 'kyaku',
          before: '友達から何か', after: 'か？',
          before_romaji: 'Tomodachi kara nani ka', after_romaji: ' ka?', answer_romaji: 'moraimashita',
          before_en: 'Did you ', after_en: ' anything from your friend?',
          de: 'Hast du etwas von deiner Freundin bekommen?',
          en: 'Did you receive anything from your friend?',
          correct: ['もらいました', 'moraimashita'],
          choices: ['もらいました', 'あげました', 'くれました', 'みました'],
          explanation: 'もらいました (moraimashita) = bekam. 友達から～をもらいました = von der Freundin ~ bekommen. Sprecher empfängt → もらいます. から = von.',
          explanation_en: 'もらいました (moraimashita) = received. 友達から～をもらいました = received ~ from my friend. Speaker receives → もらいます. から = from.' },

        { type: 'text', speaker: 'ten',
          jp:     'はい！かわいいスカーフをもらいました。そして、お母さんとお父さんも…',
          romaji: 'Hai! Kawaii sukāfu wo moraimashita. Soshite, okaasan to otōsan mo…',
          de:     'Ja! Ich habe einen süßen Schal bekommen. Und auch meine Mutter und mein Vater…',
          en:     'Yes! I received a cute scarf. And also my mother and father…' },

        { type: 'blank', speaker: 'ten',
          before: 'お母さんもお父さんも私にプレゼントを', after: '！うれしかったです。',
          before_romaji: 'Okaasan mo otōsan mo watashi ni purezento wo', after_romaji: '! Ureshikatta desu.', answer_romaji: 'kuremashita',
          before_en: 'Both my mother and my father ', after_en: ' me a present! I was so happy.',
          de: 'Sowohl meine Mutter als auch mein Vater haben mir Geschenke gegeben! Ich war so glücklich.',
          en: 'Both my mother and my father gave me presents! I was so happy.',
          correct: ['くれました', 'kuremashita'],
          choices: ['くれました', 'あげました', 'もらいました', 'みました'],
          explanation: 'くれました (kuremashita) = gaben (an den Sprecher). お母さんが私に～をくれました = Meine Mutter gab MIR ~. Wenn andere dem Sprecher geben → くれます, nicht あげます!',
          explanation_en: 'くれました (kuremashita) = gave (to the speaker). お母さんが私に～をくれました = My mother gave ME ~. When others give to the speaker → くれます, not あげます!' },

        { type: 'text', speaker: 'kyaku',
          jp:     'すてきな誕生日でしたね！よかった！',
          romaji: 'Suteki na tanjōbi deshita ne! Yokatta!',
          de:     'Was für ein wunderschöner Geburtstag! Wie schön!',
          en:     'What a wonderful birthday! How nice!' },
    ],

    /* ---- GEBEN & NEHMEN 2 ----
       Fokus: くれました / もらいました / あげました mit Familienmitgliedern.
       Personen: Yui (ten, erzählt) und Sota (kyaku, fragt).
       Abgedeckt: Mutter gibt an Sprecher (くれます), Sprecher bekommt von Vater (もらいます),
                  Sprecher gibt an jüngeren Bruder (あげます).
    */
    giving2: [
        { type: 'text', speaker: 'kyaku',
          jp:     'ゆいさん、そのかばん、新しいですね！',
          romaji: 'Yui-san, sono kaban, atarashii desu ne!',
          de:     'Yui-san, das ist aber eine neue Tasche!',
          en:     'Yui-san, that is a new bag!' },

        { type: 'blank', speaker: 'ten',
          before: '誕生日にお母さんが私に', after: 'んです！',
          before_romaji: 'Tanjōbi ni okaasan ga watashi ni', after_romaji: ' n desu!', answer_romaji: 'kuremashita',
          before_en: 'My mother ', after_en: ' it to me for my birthday!',
          de: 'Ja! Meine Mutter hat es mir zum Geburtstag gegeben!',
          en: 'Yes! My mother gave it to me for my birthday!',
          correct: ['くれた', 'くれました', 'kureta', 'kuremashita'],
          choices: ['くれました', 'あげました', 'もらいました', 'かいました'],
          explanation: 'くれました (kuremashita) = gab (an den Sprecher). お母さんが私にくれました = Meine Mutter gab MIR. Wenn jemand dem Sprecher gibt → くれます.',
          explanation_en: 'くれました (kuremashita) = gave (to the speaker). お母さんが私にくれました = My mother gave to ME. When someone gives to the speaker → くれます.' },

        { type: 'text', speaker: 'kyaku',
          jp:     'いいですね！お父さんからは何かもらいましたか？',
          romaji: 'Ii desu ne! Otōsan kara wa nani ka moraimashita ka?',
          de:     'Schön! Hast du von deinem Vater auch etwas bekommen?',
          en:     'Nice! Did you also receive something from your father?' },

        { type: 'blank', speaker: 'ten',
          before: 'お父さんからはお金を', after: '！',
          before_romaji: 'Otōsan kara wa okane wo', after_romaji: '!', answer_romaji: 'moraimashita',
          before_en: 'I ', after_en: ' money from my father!',
          de: 'Von meinem Vater habe ich Geld bekommen!',
          en: 'I received money from my father!',
          correct: ['もらいました', 'moraimashita'],
          choices: ['もらいました', 'あげました', 'くれました', 'みました'],
          explanation: 'もらいました (moraimashita) = bekam. お父さんから～をもらいました = von Vater ~ bekommen. Sprecher empfängt → もらいます. から = von.',
          explanation_en: 'もらいました (moraimashita) = received. お父さんから～をもらいました = received ~ from father. Speaker receives → もらいます. から = from.' },

        { type: 'text', speaker: 'kyaku',
          jp:     'じゃあ、ゆいさんはご家族に何かあげましたか？',
          romaji: 'Jā, Yui-san wa gokazoku ni nani ka agemashita ka?',
          de:     'Hast du deiner Familie auch etwas geschenkt?',
          en:     'Did you also give your family something?' },

        { type: 'blank', speaker: 'ten',
          before: '弟に本を', after: '。弟はすごく喜んでいました。',
          before_romaji: 'Otōto ni hon wo', after_romaji: '. Otōto wa sugoku yorokonde imashita.', answer_romaji: 'agemashita',
          before_en: 'I ', after_en: ' my younger brother a book. He was very happy.',
          de: 'Ich habe meinem jüngeren Bruder ein Buch gegeben. Er hat sich sehr gefreut.',
          en: 'I gave my younger brother a book. He was very happy.',
          correct: ['あげました', 'agemashita'],
          choices: ['あげました', 'もらいました', 'くれました', 'みました'],
          explanation: 'あげました (agemashita) = gab. 弟に本をあげました = Ich gab meinem (jüngeren) Bruder ein Buch. Sprecher gibt an andere → あげます.',
          explanation_en: 'あげました (agemashita) = gave. 弟に本をあげました = I gave my younger brother a book. Speaker gives to others → あげます.' },

        { type: 'text', speaker: 'kyaku',
          jp:     'すてきですね！やさしいお姉さんですね。',
          romaji: 'Suteki desu ne! Yasashii onēsan desu ne.',
          de:     'Wie schön! Du bist eine so fürsorgliche große Schwester.',
          en:     'How lovely! You are such a kind older sister.' },
    ],

    /* ---- GEBEN & NEHMEN 3 ----
       Fokus: Kette des Gebens — alle drei Verben + wichtiger Kontrast くれます vs もらいます.
       Personen: Momo (ten, erzählt) und Riku (kyaku, fragt).
       Abgedeckt: Lehrer gibt an Sprecher (くれます), Sprecher bekommt von Lehrer (もらいます =
                  gleiches Ereignis, andere Perspektive!), Sprecher gibt an Bruder (あげます),
                  Bruder gibt an Sprecher (くれます).
    */
    giving3: [
        { type: 'text', speaker: 'kyaku',
          jp:     'ももさん、その本はどこから？',
          romaji: 'Momo-san, sono hon wa doko kara?',
          de:     'Momo-san, wo hast du das Buch her?',
          en:     'Momo-san, where did that book come from?' },

        { type: 'blank', speaker: 'ten',
          before: '先生が私に', after: 'んです。',
          before_romaji: 'Sensei ga watashi ni', after_romaji: ' n desu.', answer_romaji: 'kuremashita',
          before_en: 'My teacher ', after_en: ' it to me.',
          de: 'Mein Lehrer hat es mir gegeben.',
          en: 'My teacher gave it to me.',
          correct: ['くれた', 'くれました', 'kureta', 'kuremashita'],
          choices: ['くれました', 'あげました', 'もらいました', 'かいました'],
          explanation: 'くれました = gab (an den Sprecher). 先生が私にくれました = Der Lehrer gab MIR. Wenn jemand dem Sprecher gibt → くれます, nicht あげました!',
          explanation_en: 'くれました = gave (to the speaker). 先生が私にくれました = The teacher gave to ME. When someone gives to the speaker → くれます, not あげました!' },

        { type: 'blank', speaker: 'kyaku',
          before: 'じゃあ、先生から本を', after: 'んですね。',
          before_romaji: 'Jā, sensei kara hon wo', after_romaji: ' n desu ne.', answer_romaji: 'moraimashita',
          before_en: 'So you ', after_en: ' the book from your teacher.',
          de: 'Also hast du das Buch von deinem Lehrer bekommen.',
          en: 'So you received the book from your teacher.',
          correct: ['もらった', 'もらいました', 'moratta', 'moraimashita'],
          choices: ['もらいました', 'あげました', 'くれました', 'かいました'],
          explanation: 'もらいました = bekam. Wichtig: くれました (Z.2) und もらいました beschreiben dasselbe Ereignis! くれました = Fokus auf den Geber, もらいました = Fokus auf den Empfänger.',
          explanation_en: 'もらいました = received. Key point: くれました (line 2) and もらいました describe the same event! くれました = focus on giver, もらいました = focus on receiver.' },

        { type: 'blank', speaker: 'ten',
          before: '弟がほしがっていたので、弟に本を', after: '。',
          before_romaji: 'Otōto ga hoshigatte ita node, otōto ni hon wo', after_romaji: '.', answer_romaji: 'agemashita',
          before_en: 'My younger brother wanted it, so I ', after_en: ' my younger brother the book.',
          de: 'Mein jüngerer Bruder wollte es haben, also habe ich ihm das Buch gegeben.',
          en: 'My younger brother wanted it, so I gave my younger brother the book.',
          correct: ['あげました', 'agemashita'],
          choices: ['あげました', 'もらいました', 'くれました', 'みました'],
          explanation: 'あげました (agemashita) = gab. 弟に本をあげました = Ich gab meinem (jüngeren) Bruder das Buch. Sprecher gibt an jemanden → あげます.',
          explanation_en: 'あげました (agemashita) = gave. 弟に本をあげました = I gave my younger brother the book. Speaker gives to someone → あげます.' },

        { type: 'text', speaker: 'ten',
          jp:     'そして、弟はお礼に私にチョコレートをくれました。うれしかったです！',
          romaji: 'Soshite, otōto wa orei ni watashi ni chokoreeto wo kuremashita. Ureshikatta desu!',
          de:     'Und als Dankeschön hat mein jüngerer Bruder mir Schokolade gegeben. Ich war so glücklich!',
          en:     'And as thanks, my younger brother gave me chocolate. I was so happy!' },

        { type: 'blank', speaker: 'kyaku',
          before: '弟さんはお礼に何か', after: 'か？',
          before_romaji: 'Otōto-san wa orei ni nani ka', after_romaji: ' ka?', answer_romaji: 'kuremashita',
          before_en: 'Did your younger brother ', after_en: ' you something as thanks?',
          de: 'Hat dir dein jüngerer Bruder zum Dank etwas gegeben?',
          en: 'Did your younger brother give you something as thanks?',
          correct: ['くれました', 'kuremashita'],
          choices: ['くれました', 'あげました', 'もらいました', 'みました'],
          explanation: 'くれました (kuremashita) = gab (an den Sprecher). 弟が私に何かをくれましたか = Hat mir der (jüngere) Bruder etwas gegeben? Wenn jemand dem Sprecher gibt → くれます.',
          explanation_en: 'くれました (kuremashita) = gave (to the speaker). 弟が私に何かをくれましたか = Did the younger brother give me something? When someone gives to the speaker → くれます.' },

        { type: 'text', speaker: 'ten',
          jp:     'チョコレートをくれたんですよ！先生 → 私 → 弟 → 私…やさしい連鎖でしょう？',
          romaji: 'Chokoreeto wo kureta n desu yo! Sensei → watashi → otōto → watashi… yasashii rensa deshō?',
          de:     'Er hat mir Schokolade gegeben! Lehrer → ich → Bruder → ich… eine schöne Kette, oder?',
          en:     'He gave me chocolate! Teacher → me → younger brother → me… a lovely chain, right?' },

        { type: 'text', speaker: 'kyaku',
          jp:     'すてきな話ですね！',
          romaji: 'Suteki na hanashi desu ne!',
          de:     'Was für eine schöne Geschichte!',
          en:     'What a lovely story!' },
    ],
};

/* ============ NACHSCHLAG-REFERENZ ============ */

const givingReference = {
    verben: {
        title: 'Die drei Geben-/Nehmen-Verben',
        title_en: 'The Three Giving/Receiving Verbs',
        html: '<table class="ref-table"><thead><tr><th>Verb</th><th>Romaji</th><th>Bedeutung</th><th>Wer?</th></tr></thead><tbody>' +
            '<tr><td>あげます</td><td>agemasu</td><td>geben</td><td>Sprecher gibt an andere</td></tr>' +
            '<tr><td>もらいます</td><td>moraimasu</td><td>bekommen</td><td>Sprecher bekommt von anderen</td></tr>' +
            '<tr><td>くれます</td><td>kuremasu</td><td>geben (an mich)</td><td>Andere geben an den Sprecher</td></tr>' +
            '</tbody></table>' +
            '<p><strong>Vergangenheit (ました):</strong> あげました, もらいました, くれました</p>',
        html_en: '<table class="ref-table"><thead><tr><th>Verb</th><th>Romaji</th><th>Meaning</th><th>Who?</th></tr></thead><tbody>' +
            '<tr><td>あげます</td><td>agemasu</td><td>to give</td><td>Speaker gives to others</td></tr>' +
            '<tr><td>もらいます</td><td>moraimasu</td><td>to receive</td><td>Speaker receives from others</td></tr>' +
            '<tr><td>くれます</td><td>kuremasu</td><td>to give (to me)</td><td>Others give to the speaker</td></tr>' +
            '</tbody></table>' +
            '<p><strong>Past tense (ました):</strong> あげました, もらいました, くれました</p>'
    },
    perspektive: {
        title: 'Perspektiv-Regeln',
        title_en: 'Perspective Rules',
        html: '<ul>' +
            '<li><strong>あげます:</strong> ICH gebe DIR etwas. &rarr; 友達にチョコをあげました。</li>' +
            '<li><strong>もらいます:</strong> ICH bekomme von DIR etwas. &rarr; 友達からプレゼントをもらいました。</li>' +
            '<li><strong>くれます:</strong> DU gibst MIR etwas. &rarr; お母さんが私にかばんをくれました。</li>' +
            '</ul>' +
            '<p><strong>Wichtig:</strong> くれます und もらいます k&ouml;nnen dasselbe Ereignis beschreiben!</p>' +
            '<ul>' +
            '<li>先生が私に本を<strong>くれました</strong> = Der Lehrer gab mir ein Buch (Fokus: Geber)</li>' +
            '<li>先生から本を<strong>もらいました</strong> = Ich bekam ein Buch vom Lehrer (Fokus: Empf&auml;nger)</li>' +
            '</ul>',
        html_en: '<ul>' +
            '<li><strong>あげます:</strong> I give YOU something. &rarr; 友達にチョコをあげました。</li>' +
            '<li><strong>もらいます:</strong> I receive from YOU. &rarr; 友達からプレゼントをもらいました。</li>' +
            '<li><strong>くれます:</strong> YOU give ME something. &rarr; お母さんが私にかばんをくれました。</li>' +
            '</ul>' +
            '<p><strong>Important:</strong> くれます and もらいます can describe the same event!</p>' +
            '<ul>' +
            '<li>先生が私に本を<strong>くれました</strong> = The teacher gave me a book (focus: giver)</li>' +
            '<li>先生から本を<strong>もらいました</strong> = I received a book from the teacher (focus: receiver)</li>' +
            '</ul>'
    },
    partikel: {
        title: 'Partikel',
        title_en: 'Particles',
        html: '<ul>' +
            '<li><strong>に (ni)</strong> — Empf&auml;nger: 友達<strong>に</strong>あげました (an den Freund gegeben)</li>' +
            '<li><strong>から (kara)</strong> — Quelle: 先生<strong>から</strong>もらいました (vom Lehrer bekommen)</li>' +
            '<li><strong>を (wo)</strong> — Objekt: 本<strong>を</strong>あげました (ein Buch gegeben)</li>' +
            '<li><strong>が (ga)</strong> — Subjekt bei くれます: お母さん<strong>が</strong>くれました</li>' +
            '</ul>',
        html_en: '<ul>' +
            '<li><strong>に (ni)</strong> — Recipient: 友達<strong>に</strong>あげました (gave to a friend)</li>' +
            '<li><strong>から (kara)</strong> — Source: 先生<strong>から</strong>もらいました (received from the teacher)</li>' +
            '<li><strong>を (wo)</strong> — Object: 本<strong>を</strong>あげました (gave a book)</li>' +
            '<li><strong>が (ga)</strong> — Subject with くれます: お母さん<strong>が</strong>くれました</li>' +
            '</ul>'
    }
};
