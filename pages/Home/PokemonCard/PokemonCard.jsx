import React, { useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';
import  getColorByPokemonType  from '../../../utils/getColorByPokemonType';
import Text from '../../../components/Text';


import { Container, StyledButton, PokedexNumber, PokemonImage } from './styles';
import PokemonTypes from '../../../components/PokemonTypes';
import Pokeball from '../../../components/Pokeball';


const PokemonCard = ({
  pokemon,
  afterThirdCard,
  rightCard,
  opacity,
}) => {

  const navigation = useNavigation();

  const handleNavigateToPokemon = useCallback(() => {
    navigation.navigate('Pokemon', {
      pokemon,
      from: 'card',
    });
  }, [navigation, pokemon]);

  const backgroundColor = useMemo(
    () => getColorByPokemonType(pokemon.types[0].name),
    [pokemon.types],
  );

  const containerStyle = {
    opacity: opacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
  };

  return (
    <Container style={containerStyle}>
      <StyledButton
        afterThirdCard={afterThirdCard}
        rightCard={rightCard}
        style={{
          backgroundColor,
        }}
        onPress={handleNavigateToPokemon}
      >
        <SharedElement
          id={`pokemon.${pokemon.id}.name`}
          style={{ alignItems: 'flex-start' }}
        >
          <Text color="white" bold>
            {pokemon.name}
          </Text>
        </SharedElement>

        <PokedexNumber style={{ fontSize: 10 }}>
          #{pokemon.pokedex_number}
        </PokedexNumber>

        <SharedElement
          id={`pokemon.${pokemon.id}.image`}
          style={{ position: 'absolute', bottom: 4, right: 4 }}
        >
          <PokemonImage source={{uri:pokemon.image}} />
        </SharedElement>

        <Pokeball
          width={80}
          height={80}
          style={{
            position: 'absolute',
            right: -8,
            bottom: -8,
          }}
        />

        <PokemonTypes pokemon={pokemon} size="small" style={{ marginTop: 8 }} />
      </StyledButton>
    </Container>
  );
};

export default PokemonCard;
