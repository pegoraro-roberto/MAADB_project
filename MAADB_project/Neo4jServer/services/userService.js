const { runRead } = require("../databases/databases.js");
const neo4j = require("neo4j-driver");

async function peopleAgeByCity(ids) {
  const query = "MATCH (p:Person)-[:person_isLocatedIn_city]->(pl:Place) \n" +
    "WHERE pl.id IN $id \n" +
    "AND p.birthday IS NOT NULL \n" +
    "WITH \n" +
    "date({ \n" +
    "month:toInteger(substring(p.birthday, 0, 2)), \n" +
    "day:toInteger(substring(p.birthday, 3, 2)), \n" +
    "year:toInteger(substring(p.birthday, 6, 4)) \n" +
    " }) AS birthDate \n" +
    "WITH duration.between(birthDate, date()).years AS age \n" +
    "RETURN avg(age) AS averageAge;\n"
  ;

  const params = { id: ids.map(Number) };

  const res = await runRead(query, params);

  //rimappiamo il risultato in modo che sia più leggibile e che i valori numerici siano tali
  return res.records.map((r) => ({
    averageAge: neo4j.integer.toNumber(r.get("averageAge"))
  }));
}

async function peopleInterestsByCity(ids) {
  const query = "MATCH (pl:Place)<-[:person_isLocatedIn_city]-(p:Person)\n" +
    "WHERE pl.id IN $id\n" +
    "MATCH (p)-[:person_hasInterest_tag]->(t:Tag)\n" +
    "RETURN DISTINCT t.id;"
  ;

  const params = { id: ids.map(Number) };

  const res = await runRead(query, params);

  //rimappiamo il risultato in modo che sia più leggibile e che i valori numerici siano tali
  return res.records.map((r) => ({
    tagId: neo4j.integer.toNumber(r.get("t.id"))
  }));
}

async function uniInterests(id) {
  const query = "MATCH (o:Organisation {id: $id})<-[:person_studyAt_university]-(p:Person) \n" +
    "MATCH (p)-[:person_hasInterest_tag]->(t:Tag) \n" +
    "RETURN t.id AS tagId, count(DISTINCT p) AS personsCount \n" +
    "ORDER BY personsCount DESC, tagId;"
  ;

  const params = { id: Number(id) };

  const res = await runRead(query, params);

  //rimappiamo il risultato in modo che sia più leggibile e che i valori numerici siano tali
  return res.records.map((r) => ({
    tagId: neo4j.integer.toNumber(r.get("tagId")),
    personsCount: neo4j.integer.toNumber(r.get("personsCount")),
  }));
}

async function suggestedKnown(id) {
  const query =
    "MATCH (x:Person {id: $id})-[:person_knows_person]-(f:Person)-[:person_knows_person]-(cand:Person) " +
    "WHERE cand <> x AND NOT (x)-[:person_knows_person]-(cand) " +
    "WITH cand, count(DISTINCT f) AS commonKnows " +
    "RETURN cand.id AS suggestedPersonId, cand.firstName AS firstName, cand.lastName AS lastName, commonKnows " +
    "ORDER BY commonKnows DESC, suggestedPersonId " +
    "LIMIT 10;"
  ;

  const params = { id: Number(id) };

  const res = await runRead(query, params);

  //rimappiamo il risultato in modo che sia più leggibile e che i valori numerici siano tali
  return res.records.map((r) => ({
    personId: neo4j.integer.toNumber(r.get("suggestedPersonId")),
    firstName: r.get("firstName"),
    lastName: r.get("lastName"),
    commonKnows: neo4j.integer.toNumber(r.get("commonKnows")),
  }));
}

async function suggestedInterest(id) {
  const query =
    "MATCH (x:Person {id: $id})-[:person_hasInterest_tag]->(t:Tag)<-[:person_hasInterest_tag]-(cand:Person) " +
    "WHERE cand <> x AND NOT (x)-[:person_knows_person]-(cand) " +
    "WITH cand, count(DISTINCT t) AS commonInterests " +
    "RETURN cand.id AS suggestedPersonId, cand.firstName AS firstName, cand.lastName AS lastName, commonInterests " +
    "ORDER BY commonInterests DESC, suggestedPersonId " +
    "LIMIT 10;"
  ;

  const params = { id: Number(id) };

  const res = await runRead(query, params);

  //rimappiamo il risultato in modo che sia più leggibile e che i valori numerici siano tali
  return res.records.map((r) => ({
    personId: neo4j.integer.toNumber(r.get("suggestedPersonId")),
    firstName: r.get("firstName"),
    lastName: r.get("lastName"),
    commonKnows: neo4j.integer.toNumber(r.get("commonInterests")),
  }));
}
module.exports = { suggestedInterest, suggestedKnown, uniInterests, peopleInterestsByCity, peopleAgeByCity };

