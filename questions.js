// VanDiary — banco domande per la sezione "Gioco".
// Espone window.VD_QUESTIONS = [{ t: testo, l: 'soft'|'piccante'|'hot', pref?: true }]
// Le domande dirette sono curate; le "Preferiresti A o B?" sono generate per
// combinazione dai pool qui sotto, così si arriva a ~2000 voci senza un file enorme.
(function () {
  // ---------- DOMANDE DIRETTE (curate) ----------
  const direct = [
    // --- soft / dolci ---
    { t: "Qual è il primo momento in cui hai capito che ti piacevo?", l: "soft" },
    { t: "Qual è il ricordo più bello che hai di noi due?", l: "soft" },
    { t: "Se potessi rivivere un nostro giorno, quale sceglieresti?", l: "soft" },
    { t: "Cosa ti fa sentire più amato/a da me?", l: "soft" },
    { t: "Qual è una cosa piccola che faccio e che adori?", l: "soft" },
    { t: "Come immagini noi due tra dieci anni?", l: "soft" },
    { t: "Qual è la canzone che ti ricorda noi?", l: "soft" },
    { t: "Qual è stato il momento in cui ti sei sentito/a più al sicuro con me?", l: "soft" },
    { t: "Cosa ti manca di me quando non ci sono?", l: "soft" },
    { t: "Qual è il posto dove vorresti tornare con me?", l: "soft" },
    { t: "Qual è la cosa più dolce che ti abbiano mai detto?", l: "soft" },
    { t: "Se dovessi descrivermi in tre parole, quali sceglieresti?", l: "soft" },
    { t: "Qual è il tuo sogno nel cassetto che non mi hai ancora detto?", l: "soft" },
    { t: "Cosa ti fa ridere di più di me?", l: "soft" },
    { t: "Qual è stata la nostra avventura più bella finora?", l: "soft" },
    { t: "Cosa ti rende felice in una giornata storta?", l: "soft" },
    { t: "Qual è un profumo che ti riporta a un bel ricordo?", l: "soft" },
    { t: "Se potessimo partire domani, dove andremmo?", l: "soft" },
    { t: "Qual è la cosa di cui sei più orgoglioso/a di noi?", l: "soft" },
    { t: "Cosa hai imparato da me senza che me ne accorgessi?", l: "soft" },
    { t: "Qual è il tuo momento preferito della giornata insieme?", l: "soft" },
    { t: "Cosa vorresti che facessimo più spesso?", l: "soft" },
    { t: "Qual è una promessa che vuoi farmi adesso?", l: "soft" },
    { t: "Qual è il complimento che ricordi ancora?", l: "soft" },
    { t: "Se la nostra storia fosse un film, che titolo avrebbe?", l: "soft" },

    // --- piccante / flirty ---
    { t: "Qual è la prima cosa che hai notato del mio corpo?", l: "piccante" },
    { t: "Dove ti piacerebbe ricevere più baci?", l: "piccante" },
    { t: "Qual è stato il nostro bacio più indimenticabile?", l: "piccante" },
    { t: "Cosa indosso che ti fa girare la testa?", l: "piccante" },
    { t: "Qual è il punto debole che ti fa cedere subito?", l: "piccante" },
    { t: "Qual è la fantasia più innocente che hai su di me?", l: "piccante" },
    { t: "Preferisci sedurre o essere sedotto/a?", l: "piccante" },
    { t: "Qual è il posto più audace dove ci siamo baciati?", l: "piccante" },
    { t: "Cosa ti fa venire voglia di me all'improvviso?", l: "piccante" },
    { t: "Un messaggio che vorresti ricevere da me adesso?", l: "piccante" },
    { t: "Qual è il gesto che trovi più sexy in assoluto?", l: "piccante" },
    { t: "Quanto resisteresti se ti provocassi tutta la sera?", l: "piccante" },
    { t: "Qual è la cosa più hot che ti ho detto all'orecchio?", l: "piccante" },
    { t: "Preferisci le luci accese o soffuse?", l: "piccante" },
    { t: "Qual è l'outfit con cui vorresti vedermi?", l: "piccante" },
    { t: "Dove ti piacerebbe un massaggio lento stasera?", l: "piccante" },
    { t: "Qual è il tono di voce che ti fa cedere?", l: "piccante" },
    { t: "Cosa faresti se restassimo bloccati in ascensore?", l: "piccante" },
    { t: "Qual è il momento della giornata in cui mi desideri di più?", l: "piccante" },
    { t: "Preferisci un bacio lento o appassionato?", l: "piccante" },

    // --- hot / zozze (di gusto) ---
    { t: "Qual è la fantasia che non hai mai avuto il coraggio di dirmi?", l: "hot" },
    { t: "Dove vorresti farlo che non abbiamo mai provato?", l: "hot" },
    { t: "Preferisci comandare o lasciarti guidare?", l: "hot" },
    { t: "Qual è stata la nostra notte più bollente?", l: "hot" },
    { t: "C'è un gioco che vorresti provare stasera?", l: "hot" },
    { t: "Qual è la parte del mio corpo che ti fa perdere la testa?", l: "hot" },
    { t: "Cosa ti farebbe impazzire se te lo facessi adesso?", l: "hot" },
    { t: "Preferisci veloce e travolgente o lento per ore?", l: "hot" },
    { t: "Qual è il limite che saresti curioso/a di superare?", l: "hot" },
    { t: "Una fantasia in cui comando solo io: la realizzeresti?", l: "hot" },
    { t: "Qual è il posto più rischioso dove lo faresti?", l: "hot" },
    { t: "Cosa indosseresti solo per togliertelo davanti a me?", l: "hot" },
    { t: "Bendati per una notte: ci stai?", l: "hot" },
    { t: "Qual è il desiderio segreto che vorresti esaudissi?", l: "hot" },
    { t: "Preferisci provocarmi a parole o coi fatti?", l: "hot" },
    { t: "Cosa ti piacerebbe sentirti sussurrare all'orecchio?", l: "hot" },
    { t: "Qual è la cosa più audace che vorresti farmi?", l: "hot" },
    { t: "Una notte a esaudire ogni mio ordine: accetti?", l: "hot" },
    { t: "Qual è il ricordo hot che rivivresti subito?", l: "hot" },
    { t: "Cosa scriveresti in un biglietto proibito per stasera?", l: "hot" }
  ];

  // ---------- POOL per "Preferiresti A o B?" ----------
  const pools = {
    soft: [
      "fare colazione a letto insieme", "guardare l'alba in spiaggia",
      "ricevere una lettera d'amore scritta a mano", "ballare lenti in cucina",
      "fare un picnic al tramonto", "passare una giornata senza telefono",
      "leggere lo stesso libro abbracciati", "fare una passeggiata sotto le stelle",
      "cucinare una cena a quattro mani", "ricevere un abbraccio di dieci minuti",
      "scrivere una canzone l'uno per l'altra", "fare un viaggio improvvisato in van",
      "svegliarsi con un bacio sulla fronte", "guardare le vecchie foto insieme",
      "fare un bagno caldo a lume di candela", "imparare una lingua nuova insieme",
      "addormentarsi guardando le stelle", "scrivere insieme la lista dei sogni",
      "regalarsi un fiore senza motivo", "fare una maratona di film sotto le coperte",
      "perdersi in una città sconosciuta", "cantare a squarciagola in macchina",
      "farsi un tatuaggio uguale", "scriversi bigliettini nascosti",
      "adottare un cucciolo insieme", "fare un brindisi ogni sera",
      "mandarsi il buongiorno con una foto", "fare una gita in montagna all'alba",
      "cucinare la ricetta della nonna", "ballare scalzi sull'erba",
      "guardare un temporale dalla finestra", "fare un viaggio in treno senza meta",
      "scriverci una lettera da aprire tra dieci anni", "fare un falò in spiaggia",
      "svegliarci presto per vedere il mare", "costruire una casa sull'albero",
      "fare colazione in un posto nuovo ogni domenica", "piantare un albero insieme",
      "fare yoga insieme la mattina", "raccogliere le stelle cadenti ad agosto"
    ],
    piccante: [
      "un bacio rubato in ascensore", "un massaggio a luci soffuse",
      "un messaggio audace durante il lavoro", "ballare molto vicini in un locale",
      "un bacio sul collo a sorpresa", "spogliarci a vicenda lentamente",
      "una doccia insieme", "un weekend in hotel senza uscire dalla stanza",
      "farsi trovare con qualcosa di sexy addosso", "un gioco di sguardi a cena fuori",
      "sussurrare qualcosa di proibito all'orecchio", "un bacio appassionato sotto la pioggia",
      "mandarsi una foto provocante", "una sfida a chi resiste di più senza toccarsi",
      "uno spogliarello privato con musica", "baciarsi al buio in un cinema",
      "un massaggio con l'olio", "indossare qualcosa solo per l'altro",
      "un appuntamento bendati", "scriverci cosa vorremmo fare stasera",
      "una notte a parlare solo di desideri", "un bacio che dura un minuto intero",
      "farsi spogliare con gli occhi", "un ballo in intimo in camera",
      "un biglietto con una promessa hot", "una serata in cui comanda uno solo dei due",
      "una doccia al lume di candela", "una sfida di seduzione a turni",
      "baciarci in pubblico di nascosto", "leggere insieme qualcosa di osé",
      "un massaggio ai piedi che sale piano", "togliersi i vestiti a turno rispondendo a domande",
      "un appuntamento dove è vietato parlare", "una foto di coppia un po' spinta",
      "un bacio bollente in cucina", "farci desiderare tutta la sera",
      "un succhiotto di nascosto", "una serata a soli sguardi e sfioramenti"
    ],
    hot: [
      "farlo all'aperto sotto le stelle", "una notte senza nessuna regola",
      "usare una benda sugli occhi", "farlo nel van in un posto isolato",
      "provare un nuovo gioco di ruolo", "una notte dedicata solo al piacere",
      "farlo davanti allo specchio", "lasciarsi legare i polsi",
      "farlo al risveglio senza dire una parola", "una sfida a chi fa cedere l'altro per primo",
      "farlo sotto la doccia bollente", "una serata a esaudire ogni desiderio dell'altro",
      "provare un posto nuovo e rischioso", "farlo a luci accese",
      "giocare col ghiaccio e qualcosa di caldo", "una notte in cui l'altro decide tutto",
      "farlo lentamente per ore", "un gioco di dadi e penitenze hot",
      "osare qualcosa che non abbiamo mai provato", "farlo durante un temporale",
      "scambiarci i ruoli di chi comanda", "farlo in un hotel di lusso",
      "lasciarsi guidare solo dalle mani", "realizzare una fantasia confessata",
      "farlo all'ora di pranzo di nascosto", "un massaggio che finisce molto bene",
      "provare la tantra per una notte", "una notte a occhi chiusi e mani libere",
      "esaudire la fantasia più segreta dell'altro", "farlo con la musica a tutto volume",
      "una notte di soli sussurri", "lasciare che sia l'altro a dettare i tempi"
    ]
  };

  function buildPreferiresti(level, pool) {
    const out = [];
    for (let i = 0; i < pool.length; i++) {
      for (let j = i + 1; j < pool.length; j++) {
        out.push({ t: "Preferiresti " + pool[i] + " o " + pool[j] + "?", l: level, pref: true });
      }
    }
    return out;
  }

  let all = direct.slice();
  ["soft", "piccante", "hot"].forEach((lv) => {
    all = all.concat(buildPreferiresti(lv, pools[lv]));
  });

  // Mischia (Fisher-Yates) così l'ordine non è per categoria.
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = all[i]; all[i] = all[j]; all[j] = tmp;
  }

  window.VD_QUESTIONS = all;
})();
