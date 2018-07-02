const request = require('request');

const database = require(__dirname + '/database.js');

// Makes an external API request to get Pokémon data from http://pokeapi.co website.
function requestPokemon(id, callback) {
  const url = 'http://pokeapi.co/api/v2/pokemon/' + id;
  request(url, (err, res, body) => {
    if (err) {
      console.error('Error with requesting Pokemon', err);
    }

    callback(JSON.parse(body));
  });
}

// Used to initially populate the database with the external data. Only needed for development purposes.
function main() {
  const pool = database.connectDatabase();

  // loops 151 times to retrieve the data for the original 151 Pokemon
  for (let i = 1; i <= 151; i++) {
    requestPokemon(i, data => {
      let paddedId = data.id.toString().padStart(3, '0');
      let pokemonData = {
        id: data.id,
        name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
        height: data.height,
        weight: data.weight,
        types: data.types.map(type => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)),
        // Pokemon image source from pokemon.com
        imageSrc: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedId}.png`,
        owned: false,
      };
      database.addPokemon(pokemonData, pool, res => {
      });
    });
  }
}

main();
