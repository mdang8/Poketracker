import React from 'react';
import _ from 'lodash';

import PokemonCard from './PokemonCard.jsx';

export default function Pokedex(props) {
  const cards = getOwnedCards(props);
  const cardLayout = cardGrid(cards);

  return (
    <div>
      {cardLayout}
    </div>
  );
}

// Returns a list of all of the Pokemon cards in the Pokedex.
function getOwnedCards(props) {
  const ownedPokemon = props.pokemons.filter(pokemon => pokemon.owned);
  const cards = ownedPokemon.map(pokemon => <PokemonCard pokemon={pokemon} handleClick={props.handleClick} main={false} />);

  return cards;
}

// Creates the layout of cards for the Pokedex page.
function cardGrid(cards) {
  const elements = [];
  const cardCols = _.map(cards, card => {
    return <div class="col-md-3">{card}</div>;
  });
  const groups = _.chunk(cardCols, 4);
  groups.forEach(group => {
    elements.push(
      <div class="row">
        {group}
      </div>
    );
  })

  return elements;
}
