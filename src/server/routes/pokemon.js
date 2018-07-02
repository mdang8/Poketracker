const express = require('express');

const pokemonController = require(__dirname + './../controllers/pokemonController');

const router = express.Router();

router.get('/all', function(req, res, next) {
  pokemonController.getAllPokemon(req, res);
});

router.get('/:id', function(req, res) {
  pokemonController.getPokemon(req, res);
});

router.put('/:id', function(req, res) {
  pokemonController.updatePokemon(req, res);
});

module.exports = router;
