const { Pool, Client } = require('pg');

// Creates a client connected to the database.
function connectDatabase() {
  // Config params from environment variables
  const pool = new Pool({
    user: process.env.USER,
    host: 'localhost',
    database: process.env.DB,
    password: process.env.PASSWORD,
    port: process.env.PORT,
  });

  pool.on('error', (err, client) => {
    console.error('Error on idle client', err);
    process.exit(-1);
  });

  return pool;
}

// Returns all of the Pokémon in the database.
function findAllPokemon(pool, callback) {
  const queryStr = 'SELECT * FROM pokemon';
  pool.query(queryStr, (err, res) => {
    if (err) {
      console.error('Error with finding all Pokemon', err);
    }

    callback(res.rows);
  });
}

// Returns the Pokémon with the given ID.
function findPokemonById(id, pool, callback) {
  const queryStr = `SELECT * FROM pokemon WHERE id = ${id}`;
  pool.query(queryStr, (err, res) => {
    if (err) {
      console.error(`Error with finding Pokemon with ID ${id}`, err);
    }

    callback(res.rows[0]);
  });
}

// Creates a row in the database with the given Pokémon data.
function addPokemon(pokemonData, pool, callback) {
  let types = '\'{';
  pokemonData.types.forEach(type => {
    types += `"${type}", `;
  });
  types = types.slice(0, -2) + '}\'';
  const queryStr = `INSERT INTO pokemon (id, name, height, weight, types, "imageSrc", owned) VALUES 
      (${pokemonData.id}, '${pokemonData.name}', ${pokemonData.height}, ${pokemonData.weight}, 
      ${types}, '${pokemonData.imageSrc}', '${pokemonData.owned}')`;
  pool.query(queryStr, (err, res) => {
    if (err) {
      console.error('Error with adding new Pokemon', err);
    }

    callback(res);
  });
}

// Updates a Pokémon's "owned" field in the database (adds to Pokédex).
function updatePokedex(id, owned, pool, callback) {
  const queryStr = `UPDATE pokemon SET owned = '${owned}' WHERE id = ${id}`;
  console.log(queryStr);
  pool.query(queryStr, (err, res) => {
    if (err) {
      console.error('Error with updating Pokemon', err);
    }

    callback(res);
  });
}

module.exports.connectDatabase = connectDatabase;
module.exports.findAllPokemon = findAllPokemon;
module.exports.findPokemonById = findPokemonById;
module.exports.addPokemon = addPokemon;
module.exports.updatePokedex = updatePokedex;
