// VanDiary — banco "Preferiresti" per la sezione Gioco.
// Espone window.VD_QUESTIONS = [{ t: testo, l: 'facile'|'medio'|'difficile' }]
// Tutte generate per combinazione dai pool: "Preferiresti A o B?".
// MEDIO usa i nomi del gruppo. Aggiungere una frase a un pool = decine di nuove domande.
(function () {
  const pools = {
    // ---------- FACILE: dilemmi scemi e leggeri ----------
    facile: [
      "starnutire ogni volta che ridi",
      "avere sempre un sassolino nella scarpa",
      "dover cantare invece di parlare per un giorno",
      "avere il singhiozzo per un'ora ogni mattina",
      "indossare scarpe di due numeri più piccole",
      "avere sempre le mani appiccicose",
      "dimenticare sempre il finale dei film",
      "parlare con un accento a caso per una settimana",
      "ridere come una iena a ogni battuta",
      "dover camminare all'indietro nei weekend",
      "avere sempre freddo ai piedi",
      "dover dire sempre la verità per un giorno intero",
      "avere il telefono sempre al 2% di batteria",
      "mangiare solo cibo piccante per un mese",
      "perdere sempre a sasso-carta-forbice",
      "avere una zanzara che ti segue ovunque",
      "dover indossare un cappello ridicolo per un anno",
      "capire tutte le lingue ma rispondere solo a versi",
      "avere le scarpe che cigolano a ogni passo",
      "dover starnutire prima di ogni frase",
      "avere sempre un capello in bocca",
      "dimenticare il nome di chiunque dopo 5 minuti",
      "dover ballare ogni volta che senti musica",
      "mangiare la pizza con l'ananas per sempre",
      "avere sempre sonno alle 15",
      "dover rispondere 'boh' a ogni domanda per un giorno",
      "avere il telecomando che funziona una volta su tre",
      "avere sempre un piede addormentato",
      "dover fare le scale invece dell'ascensore per sempre",
      "avere i lacci che si slacciano da soli",
      "dimenticare sempre dove hai messo le chiavi",
      "dover guardare solo film in bianco e nero",
      "starnutire ogni volta che entri in un negozio",
      "avere i capelli che crescono il doppio più veloci",
      "dover mangiare la minestra con la forchetta",
      "avere sempre la maglietta al contrario senza accorgertene",
      "ridere a ogni momento serio",
      "dover usare solo le maiuscole quando scrivi",
      "avere il naso che fischia quando respiri",
      "dover salutare tutti con un inchino per un mese"
    ],

    // ---------- MEDIO: scenari col gruppo (usa i nomi) ----------
    medio: [
      "fare un viaggio in van di 12 ore con Stefano che canta",
      "dividere la stanza d'albergo con Mattia che russa",
      "restare bloccato in ascensore con Leonardo per un'ora",
      "cucinare per tutti insieme a Simona",
      "perderti in una città straniera con Alessandra",
      "fare campeggio sotto la pioggia con Simone",
      "avere Stefano come navigatore per un viaggio intero",
      "organizzare una festa a sorpresa con Mattia",
      "fare la spesa con Leonardo che compra tutto",
      "montare una tenda al buio con Simone",
      "fare un karaoke a duetto con Alessandra",
      "affrontare un trekking di 8 ore con Simona",
      "dividere l'ultima fetta di pizza con Stefano",
      "guidare di notte mentre Mattia racconta storie",
      "fare un escape room con Leonardo che si agita",
      "cucinare una cena per 20 persone con Alessandra",
      "dover svegliare Simone presto ogni mattina",
      "fare un viaggio low cost organizzato da Simona",
      "litigare per la playlist in macchina con Stefano",
      "fare le pulizie di casa con Mattia",
      "perdere il volo insieme a Leonardo",
      "fare un picnic con Alessandra che porta troppo cibo",
      "montare un mobile IKEA con Simone",
      "convincere Simona a fare paracadutismo",
      "passare un weekend in silenzio con Stefano",
      "fare un viaggio in barca con Mattia che ha il mal di mare",
      "sfidare Leonardo a un torneo di carte",
      "organizzare un trasloco con Alessandra",
      "fare una maratona di film horror con Simone",
      "dover dividere il conto al ristorante con Simona",
      "fare un'escursione con Stefano che si perde sempre",
      "passare il Capodanno bloccato in casa con Mattia",
      "decidere le tappe di un on-the-road con Leonardo",
      "ballare tutta la notte con Alessandra",
      "cucinare senza ricetta insieme a Simone",
      "fare un campionato di ping pong contro Simona",
      "tenere un segreto insieme a Stefano",
      "fare un viaggio senza GPS con Mattia"
    ],

    // ---------- ESTREMO: scelte impossibili e brutali ----------
    difficile: [
      "rinunciare per sempre alla pizza",
      "non poter più ascoltare musica per il resto della vita",
      "vivere senza internet per cinque anni",
      "perdere tutti i ricordi degli ultimi due anni",
      "non poter più mangiare cibo salato",
      "dover dire ad alta voce ogni tuo pensiero",
      "rivivere lo stesso identico giorno per un anno",
      "non poter più dormire più di quattro ore a notte",
      "rinunciare al caffè per sempre",
      "dover camminare scalzo ovunque per sempre",
      "perdere il senso del gusto per dieci anni",
      "non poter più guardare film o serie tv",
      "doverti trasferire in un paese a caso domani",
      "rinunciare a tutti i social per sempre",
      "vivere sempre con lo stesso identico clima",
      "non poter più ridere ad alta voce",
      "fare per sempre un lavoro che odi ma pagatissimo",
      "rinunciare a viaggiare per il resto della vita",
      "non poter più bere niente che non sia acqua",
      "dire addio al tuo cibo preferito per sempre",
      "perdere del tutto la capacità di mentire",
      "non poter più usare le mani per un anno",
      "vivere in una città senza mai vedere il mare",
      "rinunciare a festeggiare il compleanno per sempre",
      "sapere la data esatta della tua morte",
      "non poter più cambiare idea una volta deciso",
      "indossare gli stessi vestiti ogni giorno per dieci anni",
      "perdere tutte le foto che hai mai scattato",
      "non poter più tornare nei posti dove sei già stato",
      "vivere senza dolci per il resto della vita",
      "usare la mano non dominante per sempre",
      "non poter più ascoltare la tua canzone preferita",
      "scegliere un solo amico da rivedere per sempre",
      "passare un anno intero senza parlare con nessuno"
    ]
  };

  function buildPreferiresti(level, pool) {
    const out = [];
    for (let i = 0; i < pool.length; i++) {
      for (let j = i + 1; j < pool.length; j++) {
        out.push({ t: "Preferiresti " + pool[i] + " o " + pool[j] + "?", l: level });
      }
    }
    return out;
  }

  let all = [];
  ["facile", "medio", "difficile"].forEach((lv) => {
    all = all.concat(buildPreferiresti(lv, pools[lv]));
  });

  // Mischia (Fisher-Yates)
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = all[i]; all[i] = all[j]; all[j] = tmp;
  }

  window.VD_QUESTIONS = all;
})();
