var express = require('express');
var router = express.Router();
const axios = require('axios')

// costanti utilizzate per le query
const forumq1 = 755914255349; // costante che indica l'id del forum usato nella prima query
const placeq2q6 = 0; // costante che indica l'id della nazione usata nella seconda e nella sesta query
const orgq3 = 3009; // costante che indica l'id dell'università usata nella terza query
const userq4 = 14; // costante che indica l'id dell'utente usato nella quarta query
const userq5 = 71; // costante che indica l'id dell'utente usato nella quinta query

//route che viene al caricamento della pagina e renderizza l'index
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/q1', function(req, res, next) {
//comunichiamo con il server connesso al DB Neo4j andandogli a passare l'id del forum
  axios.post('http://localhost:3002/q1', {forum: forumq1})
    .then(received =>{
      //restituiamo i dati in formato json
      res.json(received.data);
    })
    .catch(err => {
      res.setHeader('Content-Type', 'application/json');
      res.status(505).json(err)
    })
});

router.post('/q2', function(req, res, next) {
  //comunichiamo con il server connesso al DB Mongo andandogli a passare l'id della nazione
  axios.post('http://localhost:3001/q2pt1', {placeId: placeq2q6})
    .then(received_mongo_q1 =>{
      //rimappiamo il risultato per ottenere un semplice array contenente i vari id delle città
      const cityIds = received_mongo_q1.data.map(el => el.Place1Id);
      //comunichiamo al server connesso al DB neo4j le città rilevanti
      axios.post('http://localhost:3002/q2', {cityIds: cityIds})
        .then(received_neo =>{
          //rimappiamo il risultato per ottenere un semplice array contenente i vari id dei tag che i residenti trovano interessanti
          const tagIds = received_neo.data.map(el => el.tagId);
          //comunichiamo al server connessso al DB Mongo i tag rilevanti
          axios.post('http://localhost:3001/q2pt2', {tagIds: tagIds})
            .then(received_mongo_q2 =>{
              //restituiamo il risultato in formato json
              res.json(received_mongo_q2.data)

            })
            .catch(err => {
              res.setHeader('Content-Type', 'application/json');
              res.status(505).json(err)
            })

        })
        .catch(err => {
          res.setHeader('Content-Type', 'application/json');
          res.status(505).json(err)
        })

    })
    .catch(err => {
      res.setHeader('Content-Type', 'application/json');
      res.status(505).json(err)
    })
});

router.post('/q3', function(req, res, next) {
  //comunichiamo al server connesso al DB neo4j l'id dell'università selezionata
  axios.post('http://localhost:3002/q3', {orgId: orgq3})
    .then(received_neo =>{
      // Neo deve essere un array di oggetti: [{tagId, personsCount}, ...]
      // Se arriva una matrice annidata, "appiattisco" per sicurezza
      const neoRows = Array.isArray(received_neo.data)
        ? received_neo.data.flat(Infinity)
        : [];
      //costruiamo un array composto dai tag che gli studenti trovano interessanti
      const tagIds = received_neo.data.map(el => el.tagId);
      //comunichiamo al server connesso al DB Mongo i tag interessati
      axios.post('http://localhost:3001/q3', {tagIds: tagIds})
        .then(received_mongo =>{
          // Controllo analogo al precedente
          const mongoRows = Array.isArray(received_mongo.data)
            ? received_mongo.data
            : [];
          // Mappa id -> nome
          const nameById = new Map(
            mongoRows.map(t => [Number(t.id), t.name])
          );
          // Merge finale: id, nome, n_comparse
          const table = neoRows.map(r => ({
            id: r.tagId,
            nome: nameById.get(Number(r.tagId)) ?? null,
            n_comparse: r.personsCount
          }));
          //restituiamo la tabella finale in formato json
          res.json(table);
        })
        .catch(err => {
          res.setHeader('Content-Type', 'application/json');
          res.status(505).json(err)
        })
    })
    .catch(err => {
      res.setHeader('Content-Type', 'application/json');
      res.status(505).json(err)
    })
});

router.post('/q4', function(req, res, next) {
  //comunichiamo al server connesso a neo4j l'id dell'utente interessato
  axios.post('http://localhost:3002/q4', {userId: userq4})
    .then(received =>{
      //restituiamo i risultati in formato json
      res.json(received.data);
    })
    .catch(err => {
      res.setHeader('Content-Type', 'application/json');
      res.status(505).json(err)
    })
});

router.post('/q5', function(req, res, next) {
  //comunichiamo al server connesso a neo4j l'id dell'utente interessato
  axios.post('http://localhost:3002/q5', {userId: userq5})
    .then(received =>{
      //restituiamo i risultati in formato json
      res.json(received.data);
    })
    .catch(err => {
      res.setHeader('Content-Type', 'application/json');
      res.status(505).json(err)
    })
});

router.post('/q6', function(req, res, next) {
  //comunichiamo al server connesso al DB Mongo l'id della nazione interessata
  axios.post('http://localhost:3001/q2pt1', {placeId: placeq2q6})
    .then(received_mongo =>{
      //rimappiamo per costruire un'array contenente gli id delle città interessate
      const cityIds = received_mongo.data.map(el => el.Place1Id);
      //comunichiamo al server connesso al DB neo4j le città interessate
      axios.post('http://localhost:3002/q6', {cityIds: cityIds})
        .then(received_neo =>{
          //restituiamo il risultato in formato json
          res.json(received_neo.data);
        })
        .catch(err => {
          res.setHeader('Content-Type', 'application/json');
          res.status(505).json(err)
        })

    })
    .catch(err => {
      res.setHeader('Content-Type', 'application/json');
      res.status(505).json(err)
    })
});

module.exports = router;
