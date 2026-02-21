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
    { id: 'clothes',  label: 'Kleidung',       label_en: 'Clothing',   checked: true  },
    { id: 'clothes2', label: 'Kleidung',       label_en: 'Clothing',   checked: true  },
    { id: 'food',     label: 'Lebensmittel',   label_en: 'Food',       checked: false },
    { id: 'food2',    label: 'Lebensmittel',   label_en: 'Food',       checked: false },
    { id: 'furni',    label: 'Möbel',          label_en: 'Furniture',  checked: false },
    { id: 'furni2',   label: 'Möbel',          label_en: 'Furniture',  checked: false },
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
          choices: ['すみません', 'ありがとう', 'さようなら', 'おはようございます'],
          explanation: 'すみません (sumimasen) = Entschuldigung — zum Ansprechen von Verkäufern.',
          explanation_en: 'すみません (sumimasen) = Excuse me — used to get a staff member\'s attention.' },

        { type: 'text', speaker: 'ten',
          jp: 'どんないろがよいですか？', de: 'Welche Farbe möchten Sie?', en: 'What colour would you like?' },

        { type: 'blank', speaker: 'kyaku',
          before: '', after: 'シャツはありますか？',
          before_en: 'Do you have a ', after_en: ' shirt?',
          de: 'Haben Sie ein blaues Shirt?',
          en: 'Do you have a blue shirt?',
          mcOnly: true,
          correct: ['あおい', 'aoi'],
          choices: ['あおい', 'ズボン', 'いくら', 'おおきい'],
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
          choices: ['これ', 'いくら', 'たかい', 'ありがとう'],
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

    /* ---- KLEIDUNG 2 ----
       Ablauf: Begrüßung → Kunde sucht Hose →
               Verkäufer fragt nach Farbe (Lücke) → Kunde nennt Farbe (schwarz) →
               Verkäufer fragt nach Größe → Kunde nennt Größe (L) →
               Verkäufer zeigt Artikel → Kunde fragt ob günstiger möglich →
               Verkäufer macht kleinen Rabatt → Kunde fragt ob Kartenzahlung möglich →
               Verkäufer bestätigt (Lücke) → Kunde kauft → Verabschiedung
       Neue Vokabeln: ズボン, くろい, Lサイズ, まけてもらえますか, カード, つかえます
    */
    clothes2: [
        { type: 'text', speaker: 'ten',
          jp: 'いらっしゃいませ！なにをおさがしですか？', de: 'Willkommen! Was suchen Sie?', en: 'Welcome! What are you looking for?' },

        { type: 'blank', speaker: 'kyaku',
          before: '', after: 'をさがしています。',
          before_en: "I'm looking for ", after_en: '.',
          de: 'Ich suche eine Hose.',
          en: "I'm looking for trousers.",
          mcOnly: true,
          correct: ['ズボン', 'zubon'],
          choices: ['ズボン', 'みず', 'つくえ', 'りんご'],
          explanation: 'ズボン (zubon) = Hose (aus dem Französischen „jupon").',
          explanation_en: 'ズボン (zubon) = trousers/pants (borrowed from French „jupon").' },

        { type: 'blank', speaker: 'ten',
          before: 'どんな', after: 'がよいですか？',
          before_en: 'What ', after_en: ' would you like?',
          de: 'Welche Farbe möchten Sie?',
          en: 'What colour would you like?',
          correct: ['いろ', 'iro'],
          choices: ['いろ', 'サイズ', 'ねだん', 'かたち'],
          explanation: 'いろ (iro) = Farbe. どんないろがよいですか = Welche Farbe möchten Sie?',
          explanation_en: 'いろ (iro) = colour. どんないろがよいですか = What colour would you like?' },

        { type: 'blank', speaker: 'kyaku',
          before: '', after: 'ズボンはありますか？',
          before_en: 'Do you have ', after_en: ' trousers?',
          de: 'Haben Sie eine schwarze Hose?',
          en: 'Do you have black trousers?',
          correct: ['くろい', 'kuroi'],
          choices: ['くろい', 'りんご', 'いくら', 'つくえ'],
          explanation: 'くろい (kuroi) = schwarz. い-Adjektiv wie あおい, しろい usw.',
          explanation_en: 'くろい (kuroi) = black. い-adjective like あおい, しろい, etc.' },

        { type: 'text', speaker: 'ten',
          jp: 'はい、ございます。サイズはどれですか？', de: 'Ja, die haben wir. Welche Größe?', en: 'Yes, we have them. Which size?' },

        { type: 'blank', speaker: 'kyaku',
          before: '', after: 'サイズをください。',
          before_en: '', after_en: ' size, please.',
          de: 'Größe L bitte.',
          en: 'Size L, please.',
          mcOnly: true,
          correct: ['L', 'エル', 'eru'],
          choices: ['L', 'ありがとう', 'つくえ', 'みず'],
          explanation: 'L = Lサイズ (エルサイズ). Größenangaben werden oft auf Englisch benutzt.',
          explanation_en: 'L = Lサイズ (L size). Size labels are often used in English.' },

        { type: 'text', speaker: 'ten',
          jp: 'こちらはいかがですか？にせんえんです。', de: 'Wie wäre es hiermit? 2000 Yen.', en: 'How about this one? 2000 yen.' },

        { type: 'blank', speaker: 'kyaku',
          before: 'すこし', after: 'もらえますか？',
          before_en: 'Could you make it a little ', after_en: '?',
          de: 'Könnten Sie etwas günstiger machen?',
          en: 'Could you make it a little cheaper?',
          correct: ['まけて', 'makete'],
          choices: ['まけて', 'もって', 'みせて', 'おしえて'],
          explanation: 'まけてもらえますか = Können Sie den Preis senken? (まける = nachgeben, Rabatt geben)',
          explanation_en: 'まけてもらえますか = Could you give a discount? (まける = to give a discount)' },

        { type: 'text', speaker: 'ten',
          jp: 'では、せんはっぴゃくえんでいかがですか？', de: 'Wie wäre es mit 1800 Yen?', en: 'How about 1800 yen?' },

        { type: 'blank', speaker: 'kyaku',
          before: 'では、', after: 'でもいいですか？',
          before_en: 'Can I also pay by ', after_en: '?',
          de: 'Kann ich auch mit Karte zahlen?',
          en: 'Can I also pay by card?',
          mcOnly: true,
          correct: ['カード', 'kaado', 'kado'],
          choices: ['カード', 'ズボン', 'おおきい', 'ありがとう'],
          explanation: 'カード (kaado) = Karte (Kreditkarte). げんきん = Bargeld.',
          explanation_en: 'カード (kaado) = card (credit card). げんきん = cash.' },

        { type: 'blank', speaker: 'ten',
          before: 'はい、カードも', after: 'ますよ。',
          before_en: 'Yes, we also ', after_en: ' cards.',
          de: 'Ja, wir akzeptieren auch Karten.',
          en: 'Yes, we also accept cards.',
          correct: ['つかえ', 'tsukae'],
          choices: ['つかえ', 'みえ', 'かえ', 'とれ'],
          explanation: 'つかえます (tsukaemasu) = kann benutzt werden. カードもつかえます = Karte ist auch möglich.',
          explanation_en: 'つかえます (tsukaemasu) = can be used. カードもつかえます = cards are also accepted.' },

        { type: 'blank', speaker: 'kyaku',
          before: 'じゃあ、', after: 'でおねがいします。',
          before_en: 'Then, by ', after_en: ', please.',
          de: 'Dann bitte per Karte.',
          en: 'Then by card, please.',
          correct: ['カード', 'kaado', 'kado'],
          choices: ['カード', 'りんご', 'たかい', 'つくえ'],
          explanation: 'カード (kaado) でおねがいします = Bitte mit Karte.',
          explanation_en: 'カード (kaado) でおねがいします = By card, please.' },

        { type: 'blank', speaker: 'kyaku',
          before: '', after: 'ございました！',
          before_en: '', after_en: 'gozaimashita!',
          de: 'Vielen Dank!',
          en: 'Thank you very much!',
          correct: ['ありがとう', 'arigatou'],
          choices: ['ありがとう', 'すみません', 'さようなら', 'おはよう'],
          explanation: 'ありがとうございました — Abschiedsdank nach dem Kauf.',
          explanation_en: 'ありがとうございました — polite farewell thanks after purchase.' },

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
          mcOnly: true,
          correct: ['りんご', 'ringo'],
          choices: ['りんご', 'ズボン', 'つくえ', 'さんびゃく'],
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
          mcOnly: true,
          correct: ['たまご', 'tamago'],
          choices: ['たまご', 'いくら', 'ベッド', 'カード'],
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

    /* ---- LEBENSMITTEL 2 ----
       Ablauf: Begrüßung → Kunde fragt ob Wasser vorhanden (Lücke: ありますか) →
               Verkäufer bestätigt + nennt Preis → Kunde bestellt 3 Flaschen (本 Counter) →
               Kunde fragt nach Snack → Verkäufer zeigt → Kunde kauft beides →
               Kassierer nennt Gesamtpreis (Lücke: Zahl) → Kunde fragt nach Tüte →
               Verkäufer gibt Tüte → Verabschiedung
       Neue Vokabeln: みず, 本 (Counter), ぜんぶで, ふくろ, おつり, レシート
    */
    food2: [
        { type: 'text', speaker: 'ten',
          jp: 'いらっしゃいませ！', de: 'Willkommen!', en: 'Welcome!' },

        { type: 'blank', speaker: 'kyaku',
          before: 'すみません、みずは', after: '？',
          before_en: 'Excuse me, do you have ', after_en: '?',
          de: 'Entschuldigung, haben Sie Wasser?',
          en: 'Excuse me, do you have water?',
          correct: ['ありますか', 'arimasu ka', 'arimasuka'],
          choices: ['ありますか', 'いますか', 'ですか', 'できますか'],
          explanation: 'ありますか = Haben Sie ~? / Gibt es ~? (für Dinge/Sachen).',
          explanation_en: 'ありますか = Do you have ~? / Is there ~? (for objects/things).' },

        { type: 'text', speaker: 'ten',
          jp: 'はい、あちらにあります。いっぽんにひゃくえんです。', de: 'Ja, dort drüben. 100 Yen pro Flasche.', en: 'Yes, over there. 100 yen per bottle.' },

        { type: 'blank', speaker: 'kyaku',
          before: 'じゃあ、みずを', after: 'ほんください。',
          before_en: 'Then, ', after_en: ' bottles of water, please.',
          de: 'Dann drei Flaschen Wasser bitte.',
          en: 'Then three bottles of water, please.',
          correct: ['さん', 'san', '3'],
          choices: ['さん', 'ズボン', 'いかが', 'ありがとう'],
          explanation: 'さん (san) = drei. 本 (ほん) = Zähler für lange, dünne Dinge wie Flaschen.',
          explanation_en: 'さん (san) = three. 本 (hon) = counter for long thin objects like bottles.' },

        { type: 'blank', speaker: 'kyaku',
          before: 'あと、このお', after: 'もください。',
          before_en: 'Also, this ', after_en: ' too, please.',
          de: 'Und diesen Snack auch bitte.',
          en: 'Also, this snack too, please.',
          mcOnly: true,
          correct: ['かし', 'kashi'],
          choices: ['かし', 'つくえ', 'ズボン', 'にひゃく'],
          explanation: 'おかし (okashi) = Süßigkeit / Snack. お is eine Höflichkeitsvorsilbe.',
          explanation_en: 'おかし (okashi) = sweets / snack. お is a polite prefix.' },

        { type: 'blank', speaker: 'ten',
          before: 'ぜんぶで', after: 'えんになります。',
          before_en: 'That comes to ', after_en: ' yen in total.',
          de: 'Das macht insgesamt 400 Yen.',
          en: 'That comes to 400 yen in total.',
          correct: ['よんひゃく', 'yonhyaku', '400'],
          choices: ['よんひゃく', 'さんびゃく', 'ごひゃく', 'にひゃく'],
          explanation: 'よんひゃく (yonhyaku) = 400. よん = 4, ひゃく = 100.',
          explanation_en: 'よんひゃく (yonhyaku) = 400. よん = 4, ひゃく = 100.' },

        { type: 'blank', speaker: 'kyaku',
          before: '', after: 'をもらえますか？',
          before_en: 'Could I get a ', after_en: '?',
          de: 'Könnte ich eine Tüte haben?',
          en: 'Could I get a bag?',
          correct: ['ふくろ', 'fukuro'],
          choices: ['ふくろ', 'くろい', 'さん', 'いかが'],
          explanation: 'ふくろ (fukuro) = Tüte / Beutel. はこ = Schachtel, かご = Korb.',
          explanation_en: 'ふくろ (fukuro) = bag/sack. はこ = box, かご = basket.' },

        { type: 'text', speaker: 'ten',
          jp: 'はい、どうぞ。レシートもおつけしますか？', de: 'Ja, bitte sehr. Soll ich auch einen Kassenbon beilegen?', en: 'Yes, here you go. Shall I also include a receipt?' },

        { type: 'blank', speaker: 'kyaku',
          before: 'はい、', after: 'をください。',
          before_en: 'Yes, please give me the ', after_en: '.',
          de: 'Ja, den Kassenbon bitte.',
          en: 'Yes, the receipt please.',
          correct: ['レシート', 'reshiito', 'reshito'],
          choices: ['レシート', 'カード', 'はこ', 'ふくろ'],
          explanation: 'レシート (reshiito) = Kassenbon / Quittung (aus dem Englischen „receipt").',
          explanation_en: 'レシート (reshiito) = receipt (borrowed from English).' },

        { type: 'blank', speaker: 'kyaku',
          before: '', after: 'ございました！',
          before_en: '', after_en: 'gozaimashita!',
          de: 'Vielen Dank!',
          en: 'Thank you very much!',
          correct: ['ありがとう', 'arigatou'],
          choices: ['ありがとう', 'すみません', 'さようなら', 'おはよう'],
          explanation: 'ありがとうございました — Abschiedsdank nach dem Einkauf.',
          explanation_en: 'ありがとうございました — polite farewell thanks after shopping.' },
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
          mcOnly: true,
          correct: ['つくえ', 'tsukue'],
          choices: ['つくえ', 'りんご', 'カード', 'おおきい'],
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

    /* ---- MÖBEL 2 ----
       Ablauf: Begrüßung → Kunde sucht Regal →
               Verkäufer fragt nach Farbe (Lücke) → Kunde will weiß →
               Verkäufer fragt nach Größe (groß/klein) → Kunde will mittelgroß →
               Verkäufer zeigt Modell + nennt Preis → Kunde fragt nach Lieferung (Lücke) →
               Verkäufer bestätigt Lieferung → Kunde fragt nach Liefertag (Lücke: いつ) →
               Verkäufer nennt Tag → Kunde kauft → Verabschiedung
       Neue Vokabeln: たな, しろい, とどけてもらえますか, いつ, もくようび, はいそう
    */
    furni2: [
        { type: 'text', speaker: 'ten',
          jp: 'いらっしゃいませ！', de: 'Willkommen!', en: 'Welcome!' },

        { type: 'blank', speaker: 'kyaku',
          before: '', after: 'をさがしています。',
          before_en: "I'm looking for a ", after_en: '.',
          de: 'Ich suche ein Regal.',
          en: "I'm looking for a shelf.",
          mcOnly: true,
          correct: ['たな', 'tana'],
          choices: ['たな', 'たまご', 'カード', 'ひゃく'],
          explanation: 'たな (tana) = Regal / Ablage.',
          explanation_en: 'たな (tana) = shelf / rack.' },

        { type: 'blank', speaker: 'ten',
          before: 'どんな', after: 'のたなをおさがしですか？',
          before_en: 'What ', after_en: ' shelf are you looking for?',
          de: 'Was für eine Farbe suchen Sie beim Regal?',
          en: 'What colour shelf are you looking for?',
          correct: ['いろ', 'iro'],
          choices: ['いろ', 'サイズ', 'かたち', 'ねだん'],
          explanation: 'いろ (iro) = Farbe. どんないろのたな = Was für ein farbe Regal.',
          explanation_en: 'いろ (iro) = colour. どんないろのたな = what colour shelf.' },

        { type: 'blank', speaker: 'kyaku',
          before: '', after: 'たながいいです。',
          before_en: 'I\'d like a ', after_en: ' one.',
          de: 'Ich hätte gerne ein weißes.',
          en: "I'd like a white one.",
          mcOnly: true,
          correct: ['しろい', 'shiroi'],
          choices: ['しろい', 'りんご', 'いくら', 'つくえ'],
          explanation: 'しろい (shiroi) = weiß. ちゃいろい = braun, くろい = schwarz.',
          explanation_en: 'しろい (shiroi) = white. ちゃいろい = brown, くろい = black.' },

        { type: 'text', speaker: 'ten',
          jp: 'こちらのしろいたなはいかがですか？よんせんえんです。', de: 'Wie wäre es mit diesem weißen Regal? 4000 Yen.', en: 'How about this white shelf? 4000 yen.' },

        { type: 'blank', speaker: 'kyaku',
          before: 'いいですね。', after: 'もらえますか？',
          before_en: 'Nice. Can you ', after_en: ' it?',
          de: 'Schön. Können Sie es liefern?',
          en: 'Nice. Can you deliver it?',
          correct: ['とどけて', 'todokete'],
          choices: ['とどけて', 'みせて', 'もって', 'かえて'],
          explanation: 'とどけてもらえますか = Können Sie es liefern? (とどける = liefern, zustellen)',
          explanation_en: 'とどけてもらえますか = Can you deliver it? (とどける = to deliver)' },

        { type: 'text', speaker: 'ten',
          jp: 'はい、はいそうできます。', de: 'Ja, Lieferung ist möglich.', en: 'Yes, we can deliver.' },

        { type: 'blank', speaker: 'kyaku',
          before: '', after: 'とどけてもらえますか？',
          before_en: '', after_en: ' can you deliver it?',
          de: 'Wann können Sie es liefern?',
          en: 'When can you deliver it?',
          correct: ['いつ', 'itsu'],
          choices: ['いつ', 'どこ', 'なん', 'だれ'],
          explanation: 'いつ (itsu) = wann. いつとどけてもらえますか = Wann können Sie liefern?',
          explanation_en: 'いつ (itsu) = when. いつとどけてもらえますか = When can you deliver?' },

        { type: 'blank', speaker: 'ten',
          before: '', after: 'はいかがですか？',
          before_en: '', after_en: ', would that work?',
          de: 'Wie wäre es mit Donnerstag?',
          en: 'How about Thursday?',
          correct: ['もくようび', 'mokuyoubi', 'もくよう', 'mokuyou', 'もく', 'moku'],
          choices: ['もくようび', 'りんご', 'いくら', 'カード'],
          explanation: 'もくようび (mokuyoubi) = Donnerstag. 木 = Holz (木曜日).',
          explanation_en: 'もくようび (mokuyoubi) = Thursday. 木 = tree/wood (木曜日).' },

        { type: 'blank', speaker: 'kyaku',
          before: 'じゃあ、このたなを', after: '。',
          before_en: "Then, I'll take this shelf, ", after_en: '.',
          de: 'Dann nehme ich dieses Regal bitte.',
          en: "Then I'll take this shelf, please.",
          correct: ['ください', 'kudasai', 'おねがいします', 'onegaishimasu'],
          choices: ['ください', 'みます', 'あります', 'います'],
          explanation: 'ください (kudasai) = bitte geben Sie mir. ～をください = ich nehme ~.',
          explanation_en: 'ください (kudasai) = please give me. ～をください = I\'ll take ~.' },

        { type: 'blank', speaker: 'kyaku',
          before: '', after: 'ございました！',
          before_en: '', after_en: 'gozaimashita!',
          de: 'Vielen Dank!',
          en: 'Thank you very much!',
          correct: ['ありがとう', 'arigatou'],
          choices: ['ありがとう', 'すみません', 'はい', 'いいえ'],
          explanation: 'ありがとうございました — Abschiedsdank.',
          explanation_en: 'ありがとうございました — polite farewell thanks.' },

        { type: 'text', speaker: 'ten',
          jp: 'ありがとうございます！もくようびにおとどけします。', de: 'Danke schön! Wir liefern am Donnerstag.', en: 'Thank you! We will deliver on Thursday.' },
    ],
};
