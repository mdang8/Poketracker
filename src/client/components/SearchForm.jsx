import React from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';

export default function SearchForm(props) {
  return (
    <Form>
      <FormGroup>
        <Input type="select" name="search-select" onChange={props.handleChange} value={props.currentId} id="search-select">
          {populateSelect(props.pokemons)}
        </Input>
      </FormGroup>
    </Form>
  );
}

// Populates the select input dropdown with the Pokemon names and ID's.
function populateSelect(pokemons) {
  // sorts the list of Pokemon by their ID
  const pokemonList = pokemons.sort((a, b) => a.id - b.id);
  const options = pokemonList.map(pokemon => {
    // pads the ID string with 0's
    let paddedId = pokemon.id.toString().padStart(3, '0');
    return <option key={pokemon.id} value={pokemon.id}>{`${paddedId} - ${pokemon.name}`}</option>;
  });

  return options;
}
