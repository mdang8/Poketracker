import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import swal from 'sweetalert';

import Pokedex from './Pokedex.jsx';
import PokemonCard from './PokemonCard.jsx';
import SearchForm from './SearchForm.jsx';
import Nav from './Nav.jsx';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemons: [],
      displayedPokemonId: 1,
    };
  }

  // Retrieves all of the Pokemon data in the database when the component mounts.
  componentDidMount() {
    fetch('/api/v1/pokemon/all')
      .then(res => res.json())
      .then(data => this.setState({ pokemons: data }));
  }

  // Updates the Pokemon ID in the state when the select input changes.
  updateDisplayedPokemon() {
    const selected = document.getElementById('search-select');
    const selectedId = parseInt(selected.options[selected.selectedIndex].value);

    this.setState({
      displayedPokemonId: selectedId,
    });
  }

  // Adds or removes the Pokemon with the given ID from the Pokedex.
  updatePokedex(id, op) {
    const owned = op === 'Add';
    const pokemonName = this.state.pokemons.find(x => x.id === id).name
    const successMsg = (owned) ?
      `${pokemonName} added to Pokédex!` :
      `${pokemonName} removed from Pokédex!`;
    const updatedPokemons = this.state.pokemons.map(pokemon => {
      return (pokemon.id === id) ? Object.assign(pokemon, { owned: owned }) : pokemon;
    });
    fetch(`/api/v1/pokemon/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        owned: owned,
      }),
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ pokemons: updatedPokemons });
        swal({
          title: successMsg,
          icon: 'success',
          button: 'Ok'
        });
      });
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Route path="/" exact={true} render={() =>
            <div className="container main">
              <h1>My Pokédex</h1>
              <SearchForm pokemons={this.state.pokemons} handleChange={this.updateDisplayedPokemon.bind(this)}
                currentId={this.state.displayedPokemonId} />
              {renderCard(this.state.pokemons, this.state.displayedPokemonId, this.updatePokedex.bind(this))}
            </div>
          } />
          <Route path="/pokedex" exact={true} render={() =>
            <div className="container pokedex">
              <h1>Pokémon Owned</h1>
              <Pokedex pokemons={this.state.pokemons} handleClick={this.updatePokedex.bind(this)} />
            </div>
          } />
        </div>
      </Router>
    );
  }
}

// Returns the Pokemon card display when the data is loaded.
function renderCard(pokemons, id, f) {
  if (pokemons.length > 0) {
    return (
      <PokemonCard pokemon={pokemons.find(x => x.id === id)} handleClick={f} main={true} />
    );
  } else {
    return <div></div>;
  }
}

export default Main;
