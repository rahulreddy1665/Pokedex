import React from 'react';
import { SharedElement } from 'react-navigation-shared-element';
import { Container, Type, TypeText } from './styles';



const PokemonTypes = ({ pokemon, size, ...rest }) => {
  return (
    <Container size={size} {...rest}>
      {pokemon.types.map(type => (
        <SharedElement
          key={type.url}
          id={`pokemon.${pokemon.id}.type.${type.url}`}
        >
          <Type size={size}>
            <TypeText size={size}>{type.name}</TypeText>
          </Type>
        </SharedElement>
      ))}
    </Container>
  );
};

export default PokemonTypes;
