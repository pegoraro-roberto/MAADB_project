// funzione che viene richiamata alla pressione del bottone per l'esecuzione della prima query
function q1(id){
  //richiamiamo la route per l'esecuzione della query 1
  axios.post('/q1')
    .then (function (dataR) {
      //ottenuti i risultati andiamo a effettuare una coversione del formato JSON in stringa
      let ris = JSON.stringify(dataR.data)
      //prendiamo l'id della cella di testo passato come parametro e ci copiamo i risultati
      const box = document.getElementById(id);
      if (!box) return;
      box.innerHTML = "<pre>"+ ris +"</pre>";
    })
    .catch( function (response) {
      alert (JSON.stringify(response.data));
    })
}

// funzione che viene richiamata alla pressione del bottone per l'esecuzione della seconda query
function q2(id){
  //richiamiamo la route per l'esecuzione della query 2
  axios.post('/q2')
    .then (function (dataR) {
      //ottenuti i risultati andiamo a effettuare una coversione del formato JSON in stringa
      let ris = JSON.stringify(dataR.data, null, 2); // i parametri aggiuntivi servono per far andare a capo ad ogni elemento del vettore
      //prendiamo l'id della cella di testo passato come parametro e ci copiamo i risultati
      const box = document.getElementById(id);
      if (!box) return;
      box.innerHTML = "<pre>"+ ris +"</pre>";
    })
    .catch( function (response) {
      alert (JSON.stringify(response.data));
    })
}

// funzione che viene richiamata alla pressione del bottone per l'esecuzione della terza query
function q3(id){
  //richiamiamo la route per l'esecuzione della query 3
  axios.post('/q3')
    .then (function (dataR) {
      //ottenuti i risultati andiamo a effettuare una coversione del formato JSON in stringa
      let ris = JSON.stringify(dataR.data, null, 2);// i parametri aggiuntivi servono per far andare a capo ad ogni elemento del vettore
      //prendiamo l'id della cella di testo passato come parametro e ci copiamo i risultati
      const box = document.getElementById(id);
      if (!box) return;
      box.innerHTML = "<pre>"+ ris +"</pre>";
    })
    .catch( function (response) {
      alert (JSON.stringify(response.data));
    })
}

// funzione che viene richiamata alla pressione del bottone per l'esecuzione della quarta query
function q4(id){
  //richiamiamo la route per l'esecuzione della query 4
  axios.post('/q4')
    .then (function (dataR) {
      //ottenuti i risultati andiamo a effettuare una coversione del formato JSON in stringa
      let ris = JSON.stringify(dataR.data, null, 2);// i parametri aggiuntivi servono per far andare a capo ad ogni elemento del vettore
      //prendiamo l'id della cella di testo passato come parametro e ci copiamo i risultati
      const box = document.getElementById(id);
      if (!box) return;
      box.innerHTML = "<pre>"+ ris +"</pre>";
    })
    .catch( function (response) {
      alert (JSON.stringify(response.data));
    })
}

// funzione che viene richiamata alla pressione del bottone per l'esecuzione della quinta query
function q5(id){
  //richiamiamo la route per l'esecuzione della query 5
  axios.post('/q5')
    .then (function (dataR) {
      //ottenuti i risultati andiamo a effettuare una coversione del formato JSON in stringa
      let ris = JSON.stringify(dataR.data, null, 2);// i parametri aggiuntivi servono per far andare a capo ad ogni elemento del vettore
      //prendiamo l'id della cella di testo passato come parametro e ci copiamo i risultati
      const box = document.getElementById(id);
      if (!box) return;
      box.innerHTML = "<pre>"+ ris +"</pre>";
    })
    .catch( function (response) {
      alert (JSON.stringify(response.data));
    })
}

// funzione che viene richiamata alla pressione del bottone per l'esecuzione della sesta query
function q6(id){
  //richiamiamo la route per l'esecuzione della query 6
  axios.post('/q6')
    .then (function (dataR) {
      //ottenuti i risultati andiamo a effettuare una coversione del formato JSON in stringa
      let ris = JSON.stringify(dataR.data)
      //prendiamo l'id della cella di testo passato come parametro e ci copiamo i risultati
      const box = document.getElementById(id);
      if (!box) return;
      box.innerHTML = "<pre>"+ ris +"</pre>";
    })
    .catch( function (response) {
      alert (JSON.stringify(response.data));
    })
}