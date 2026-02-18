/* Japanisch Lernprogramm — Erstellt von Hi156 unter Verwendung von Claude (Anthropic) */

/* simulation-data.js — Einkaufs-Simulations-Daten: Dialogszenen mit Lückentexten. */

/* Jede Szene hat:
   - id, label, label_en
   - lines[]: Dialogzeilen, entweder fest (type:'text') oder Lücke (type:'blank')
     - type:'text': jp, de, en
     - type:'blank': speaker, before, after, before_en?, after_en?,
                     de (vollständige Übersetzung der ausgefüllten Zeile),
                     en (vollständige Übersetzung der ausgefüllten Zeile),
                     correct[], choices[], explanation, explanation_en
*/

const simulationScenes = [
    { id: 'clothes', label: 'Kleidung kaufen',    label_en: 'Buying Clothes',    checked: true  },
    { id: 'food',    label: 'Lebensmittel kaufen', label_en: 'Buying Food',       checked: false },
    { id: 'furni',   label: 'Möbel kaufen',        label_en: 'Buying Furniture',  checked: false },
];

/* =====================================================================
   SZENEN-DIALOGE
   ===================================================================== */

const simulationDialogs = {

    /* ---- KLEIDUNG ----
       Ablauf: Begrüßung → Kunde spricht an + nennt Wunsch →
               Verkäufer fragt nach Farbe → Kunde nennt Farbe →
               Verkäufer fragt nach Größe (Lücke) → Kunde nennt Größe →
               Verkäufer zeigt Artikel → Kunde fragt nach Preis →
               Verkäufer nennt Preis → Kunde kauft → Verabschiedung
    */
    clothes: [
        { type: 'text', speaker: 'ten',
          jp: 'いらっしゃいませ！', de: 'Willkommen!', en: 'Welcome!' },

        { type: 'blank', speaker: 'kyaku',
          before: '', after: '、シャツをさがしています。',
          before_en: '', after_en: ", I'm looking for a shirt.",
          de: 'Entschuldigung, ich suche ein Shirt.',
          en: "Excuse me, I'm looking for a shirt.",
          correct: ['すみません', 'sumimasen'],
          choices: ['すみません', 'ありがとう', 'さようなら', 'はじめまして'],
          explanation: 'すみません (sumimasen) = Entschuldigung — zum Ansprechen von Verkäufern.',
          explanation_en: 'すみません (sumimasen) = Excuse me — used to get a staff member\'s attention.' },

        { type: 'text', speaker: 'ten',
          jp: 'どんないろがよいですか？', de: 'Welche Farbe möchten Sie?', en: 'What colour would you like?' },

        { type: 'blank', speaker: 'kyaku',
          before: '', after: 'いろのシャツはありますか？',
          before_en: 'Do you have a ', after_en: ' shirt?',
          de: 'Haben Sie ein blaues Shirt?',
          en: 'Do you have a blue shirt?',
          correct: ['あおい', 'aoi', 'あお', 'ao'],
          choices: ['あおい', 'あかい', 'しろい', 'くろい'],
          explanation: 'あおい (aoi) = blau. Farbadjektive enden auf -い.',
          explanation_en: 'あおい (aoi) = blue. Colour adjectives end in -い.' },

        { type: 'blank', speaker: 'ten',
          before: 'サイズは', after: 'ですか？',
          before_en: 'What is your ', after_en: '?',
          de: 'Was ist Ihre Größe?',
          en: 'What is your size?',
          correct: ['なん', 'nan', 'なに', 'nani'],
          choices: ['なん', 'どこ', 'いくら', 'いつ'],
          explanation: 'なん/なに = was. サイズはなんですか = Was ist Ihre Größe?',
          explanation_en: 'なん/なに = what. サイズはなんですか = What is your size?' },

        { type: 'text', speaker: 'kyaku',
          jp: 'Mサイズです。', de: 'Größe M.', en: 'Size M.' },

        { type: 'text', speaker: 'ten',
          jp: 'こちらはいかがですか？', de: 'Wie wäre es hiermit?', en: 'How about this one?' },

        { type: 'blank', speaker: 'kyaku',
          before: 'これは', after: 'ですか？',
          before_en: 'How much is', after_en: '?',
          de: 'Wie viel kostet das?',
          en: 'How much is this?',
          correct: ['いくら', 'ikura'],
          choices: ['いくら', 'なん', 'どこ', 'いつ'],
          explanation: 'いくら (ikura) = wie viel / how much — Preis erfragen.',
          explanation_en: 'いくら (ikura) = how much — used to ask the price.' },

        { type: 'text', speaker: 'ten',
          jp: 'さんぜんえんです。', de: '3000 Yen.', en: '3000 yen.' },

        { type: 'blank', speaker: 'kyaku',
          before: 'じゃあ、', after: 'をください。',
          before_en: "Then, I'll take ", after_en: ', please.',
          de: 'Dann nehme ich das bitte.',
          en: "Then, I'll take this one, please.",
          correct: ['これ', 'kore'],
          choices: ['これ', 'それ', 'あれ', 'どれ'],
          explanation: 'これ (kore) = dies hier (beim Sprecher). ～をください = bitte geben Sie mir.',
          explanation_en: 'これ (kore) = this (near speaker). ～をください = please give me ~.' },

        { type: 'blank', speaker: 'kyaku',
          before: '', after: 'ございました！',
          before_en: '', after_en: 'gozaimashita!',
          de: 'Vielen Dank!',
          en: 'Thank you very much!',
          correct: ['ありがとう', 'arigatou'],
          choices: ['ありがとう', 'すみません', 'おねがいします', 'はい'],
          explanation: 'ありがとうございました — höflicher Abschiedsdank nach dem Kauf.',
          explanation_en: 'ありがとうございました — polite thank-you when leaving after a purchase.' },

        { type: 'text', speaker: 'ten',
          jp: 'またおこしください！', de: 'Kommen Sie bald wieder!', en: 'Please come again!' },
    ],

    /* ---- LEBENSMITTEL ----
       Ablauf: Begrüßung → Kunde bestellt Obst →
               Kunde fragt nach Preis des Brots → Verkäufer nennt Preis (Lücke) →
               Kunde kauft Brot → Kunde bestellt Eier →
               Verkäufer bestätigt (Lücke) → Verabschiedung
    */
    food: [
        { type: 'text', speaker: 'ten',
          jp: 'いらっしゃいませ！', de: 'Willkommen!', en: 'Welcome!' },

        { type: 'blank', speaker: 'kyaku',
          before: '', after: 'をひとつください。',
          before_en: 'One ', after_en: ', please.',
          de: 'Einen Apfel bitte.',
          en: 'One apple, please.',
          correct: ['りんご', 'ringo'],
          choices: ['りんご', 'バナナ', 'みかん', 'ぶどう'],
          explanation: 'りんご (ringo) = Apfel. ～をひとつください = bitte ein ~.',
          explanation_en: 'りんご (ringo) = apple. ～をひとつください = one ~ please.' },

        { type: 'blank', speaker: 'kyaku',
          before: 'あと、このパンは', after: 'ですか？',
          before_en: 'Also, how much is this bread', after_en: '?',
          de: 'Und wie viel kostet dieses Brot?',
          en: 'Also, how much is this bread?',
          correct: ['いくら', 'ikura'],
          choices: ['いくら', 'なん', 'どれ', 'いつ'],
          explanation: 'いくら = wie viel / how much.',
          explanation_en: 'いくら = how much.' },

        { type: 'blank', speaker: 'ten',
          before: '', after: 'えんです。',
          before_en: '', after_en: ' yen.',
          de: '150 Yen.',
          en: '150 yen.',
          correct: ['ひゃくごじゅう', 'hyakugojuu', 'hyakugoju'],
          choices: ['ひゃくごじゅう', 'にひゃく', 'さんびゃく', 'ごじゅう'],
          explanation: 'ひゃくごじゅう (hyakugojuu) = 150. ひゃく = 100, ごじゅう = 50.',
          explanation_en: 'ひゃくごじゅう (hyakugojuu) = 150. ひゃく = 100, ごじゅう = 50.' },

        { type: 'blank', speaker: 'kyaku',
          before: 'じゃあ、パンをひとつ', after: '。',
          before_en: "Then, one bread, ", after_en: '.',
          de: 'Dann nehme ich ein Brot bitte.',
          en: 'Then, one bread, please.',
          correct: ['ください', 'kudasai', 'おねがいします', 'onegaishimasu'],
          choices: ['ください', 'います', 'あります', 'みます'],
          explanation: 'ください (kudasai) = bitte geben Sie mir / please give me.',
          explanation_en: 'ください (kudasai) = please give me.' },

        { type: 'blank', speaker: 'kyaku',
          before: 'それから、', after: 'をふたつおねがいします。',
          before_en: 'And also, two ', after_en: ', please.',
          de: 'Und außerdem zwei Eier bitte.',
          en: 'And also, two eggs, please.',
          correct: ['たまご', 'tamago'],
          choices: ['たまご', 'にく', 'さかな', 'やさい'],
          explanation: 'たまご (tamago) = Ei. ふたつ = zwei (allgemeiner Zähler für kleine Dinge).',
          explanation_en: 'たまご (tamago) = egg. ふたつ = two (generic counter for small items).' },

        { type: 'blank', speaker: 'ten',
          before: '', after: 'ございます！',
          before_en: '', after_en: '!',
          de: 'Danke schön!',
          en: 'Thank you very much!',
          correct: ['ありがとう', 'arigatou'],
          choices: ['ありがとう', 'すみません', 'おはようございます', 'こんにちは'],
          explanation: 'ありがとうございます — höflicher Dank des Verkäufers.',
          explanation_en: 'ありがとうございます — polite thank-you from the staff.' },

        { type: 'blank', speaker: 'kyaku',
          before: '', after: 'ございました！',
          before_en: '', after_en: 'gozaimashita!',
          de: 'Vielen Dank!',
          en: 'Thank you very much!',
          correct: ['ありがとう', 'arigatou'],
          choices: ['ありがとう', 'すみません', 'おはよう', 'こんにちは'],
          explanation: 'ありがとうございました — Danke (beim Abschied nach Kauf).',
          explanation_en: 'ありがとうございました — thank you (polite farewell after purchase).' },
    ],

    /* ---- MÖBEL ----
       Ablauf: Begrüßung + Frage → Kunde nennt gesuchtes Möbel →
               Verkäufer zeigt Auswahl → Kunde kommentiert (groß) →
               Kunde fragt nach kleinerem → Verkäufer empfiehlt (Lücke: いかが) →
               Kunde fragt nach Preis → Verkäufer nennt Preis →
               Kunde findet es teuer, kauft → Verkäufer dankt (Lücke) → Verabschiedung
    */
    furni: [
        { type: 'text', speaker: 'ten',
          jp: 'いらっしゃいませ、なにをおさがしですか？', de: 'Willkommen, was suchen Sie?', en: 'Welcome, what are you looking for?' },

        { type: 'blank', speaker: 'kyaku',
          before: '', after: 'をさがしています。',
          before_en: "I'm looking for a ", after_en: '.',
          de: 'Ich suche einen Schreibtisch.',
          en: "I'm looking for a desk.",
          correct: ['つくえ', 'tsukue'],
          choices: ['つくえ', 'いす', 'ベッド', 'たな'],
          explanation: 'つくえ (tsukue) = Schreibtisch.',
          explanation_en: 'つくえ (tsukue) = desk.' },

        { type: 'text', speaker: 'ten',
          jp: 'こちらにございます。どうぞ。', de: 'Diese sind hier. Bitte sehr.', en: 'They are over here. Please.' },

        { type: 'blank', speaker: 'kyaku',
          before: 'このつくえは', after: 'ですね。',
          before_en: 'This desk is ', after_en: ', isn\'t it.',
          de: 'Dieser Schreibtisch ist groß, oder?',
          en: "This desk is big, isn't it.",
          correct: ['おおきい', 'ookii', 'おおき', 'ooki'],
          choices: ['おおきい', 'ちいさい', 'あたらしい', 'ふるい'],
          explanation: 'おおきい (ookii) = groß. い-Adjektiv.',
          explanation_en: 'おおきい (ookii) = big. い-adjective.' },

        { type: 'blank', speaker: 'kyaku',
          before: 'もっと', after: 'つくえはありますか？',
          before_en: 'Do you have a more ', after_en: ' desk?',
          de: 'Haben Sie einen kleineren Schreibtisch?',
          en: 'Do you have a smaller desk?',
          correct: ['ちいさい', 'chiisai'],
          choices: ['ちいさい', 'おおきい', 'たかい', 'やすい'],
          explanation: 'ちいさい (chiisai) = klein.',
          explanation_en: 'ちいさい (chiisai) = small.' },

        { type: 'blank', speaker: 'ten',
          before: 'はい、こちらは', after: 'ですか？',
          before_en: 'Yes, how about ', after_en: '?',
          de: 'Ja, wie wäre es hiermit?',
          en: 'Yes, how about this one?',
          correct: ['いかが', 'ikaga'],
          choices: ['いかが', 'いくら', 'なに', 'どこ'],
          explanation: 'いかが (ikaga) = wie wäre es (höfliche Form von どう).',
          explanation_en: 'いかが (ikaga) = how about (polite form of どう).' },

        { type: 'blank', speaker: 'kyaku',
          before: 'このつくえは', after: 'ですか？',
          before_en: 'How much is this desk', after_en: '?',
          de: 'Wie viel kostet dieser Schreibtisch?',
          en: 'How much is this desk?',
          correct: ['いくら', 'ikura'],
          choices: ['いくら', 'なん', 'どこ', 'いつ'],
          explanation: 'いくら (ikura) = wie viel / how much — Preis erfragen.',
          explanation_en: 'いくら (ikura) = how much — used to ask the price.' },

        { type: 'text', speaker: 'ten',
          jp: 'にまんえんです。', de: '20.000 Yen.', en: '20,000 yen.' },

        { type: 'blank', speaker: 'kyaku',
          before: 'すこし', after: 'ですね…でも、これをください。',
          before_en: 'It\'s a little ', after_en: '… but I\'ll take it, please.',
          de: 'Ein bisschen teuer… aber ich nehme ihn bitte.',
          en: "It's a little expensive… but I'll take it, please.",
          correct: ['たかい', 'takai'],
          choices: ['たかい', 'やすい', 'ちいさい', 'おおきい'],
          explanation: 'たかい (takai) = teuer. Erst nach der Preisnennung sinnvoll.',
          explanation_en: 'たかい (takai) = expensive. Only makes sense after the price is given.' },

        { type: 'blank', speaker: 'ten',
          before: '', after: 'ございます！またおこしください。',
          before_en: '', after_en: '! Please come again.',
          de: 'Vielen Dank! Kommen Sie bald wieder.',
          en: 'Thank you very much! Please come again.',
          correct: ['ありがとう', 'arigatou'],
          choices: ['ありがとう', 'すみません', 'はい', 'いいえ'],
          explanation: 'ありがとうございます — Dank des Verkäufers beim Abschluss.',
          explanation_en: 'ありがとうございます — staff\'s polite thank-you at the end.' },
    ],
};
