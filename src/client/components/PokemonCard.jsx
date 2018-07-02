import React from 'react';
import { Button, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

export default function PokemonCard(props) {
  const types = (props.pokemon.types) ?
    props.pokemon.types.join(', ') :
    [];
  const buttonColor = (!props.pokemon.owned) ? 'success' : 'danger';
  const buttonText = (!props.pokemon.owned) ? 'Add to Pokédex' : 'Remove from Pokédex';
  const buttonValue = (!props.pokemon.owned) ? 'Add' : 'Remove';
  const button = <Button color={buttonColor} onClick={() => props.handleClick(props.pokemon.id, buttonValue)}
      value={buttonValue}>{(props.main) ? buttonText : buttonValue}</Button>;

  return (
    <Card>
      <CardImg top width="40%" src={props.pokemon.imageSrc} />
      <CardBody>
        <CardTitle><strong>{props.pokemon.name}</strong></CardTitle>
        <CardSubtitle><i>{types}</i></CardSubtitle>
        <div class="pokemon-measurements">
          <p>Height: {props.pokemon.height}</p>
          <p>Weight: {props.pokemon.weight}</p>
        </div>
      </CardBody>
      {button}
    </Card>
  );
}
