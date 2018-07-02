const database = require(__dirname + './../lib/database.js');

function getAllPokemon(req, res) {
  const pool = database.connectDatabase();

  database.findAllPokemon(pool, pokemonData => {
    pool.end();
    res.status(200).send(pokemonData);
  });
}

function getPokemon(req, res) {
  const pool = database.connectDatabase();

  database.findPokemonById(parseInt(req.params.id), pool, pokemonData => {
    pool.end();
    res.status(200).send(pokemonData);
  });
}

function updatePokemon(req, res) {
  const pool = database.connectDatabase();

  database.updatePokedex(req.body.id, req.body.owned, pool, data => {
    pool.end();
    res.status(200).send(data);
  });
}

module.exports.getAllPokemon = getAllPokemon;
module.exports.getPokemon = getPokemon;
module.exports.updatePokemon = updatePokemon;
