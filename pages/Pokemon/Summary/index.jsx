import React, { useEffect, useMemo } from 'react';
import { Animated, Easing } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';

import Pokeball from '../../../components/Pokeball';
import PokemonTypes from '../../../components/PokemonTypes';
import Text from '../../../components/Text';
import { POKEMON_SUMMARY_HEIGHT } from '../../../constants';


import {
  Container,
  Header,
  Row,
  PokemonImageContainer,
  PokemonImage,
} from './styles';



const Summary = ({ pokemon, translateY }) => {
  const translateXNumber = useMemo(() => new Animated.Value(100), []);
  const translateXGenera = useMemo(() => new Animated.Value(200), []);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateXNumber, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),

      Animated.timing(translateXGenera, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.quad),
      }),
    ]).start();
  }, [translateXNumber, translateXGenera]);

  const pokedexNumberStyle = {
    transform: [
      {
        translateX: translateXNumber.interpolate({
          inputRange: [0, 100],
          outputRange: [0, 100],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const generaStyle = {
    transform: [
      {
        translateX: translateXGenera.interpolate({
          inputRange: [0, 200],
          outputRange: [0, 200],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const summaryStyle = {
    zIndex: translateY.interpolate({
      inputRange: [-POKEMON_SUMMARY_HEIGHT, 0],
      outputRange: [-1, 2],
      extrapolate: 'clamp',
    }),
    opacity: translateY.interpolate({
      inputRange: [-200, 0],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
  };

  const pokemonImageContainerStyle = {
    opacity: translateY.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
    transform: [
      {
        translateY: translateY.interpolate({
          inputRange: [-100, 0, 200],
          outputRange: [-20, 0, 25],
          extrapolate: 'clamp',
        }),
      },
      {
        scale: translateY.interpolate({
          inputRange: [-100, 0, 200],
          outputRange: [0.9, 1, 1.1],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  return (
    <>
      <Pokeball
        width={250}
        height={250}
        withRotate
        style={{
          position: 'absolute',
          bottom: 0,
          alignSelf: 'center',
        }}
      />

      <Container style={summaryStyle}>
        <Header>
          <Row>
            <SharedElement
              id={`pokemon.${pokemon.id}.name`}
              style={{ alignItems: 'flex-start' }}
            >
              <Text variant="title" color="white">
                {pokemon.name}
              </Text>
            </SharedElement>

            <Animated.View style={pokedexNumberStyle}>
              <Text variant="body2" color="white" bold>
                #{pokemon.pokedex_number}
              </Text>
            </Animated.View>
          </Row>

          <Row style={{ marginTop: 16 }}>
            <PokemonTypes pokemon={pokemon} size="regular" />

            <Animated.View style={generaStyle}>
              <Text color="white">{pokemon.genera}</Text>
            </Animated.View>
          </Row>
        </Header>

        <PokemonImageContainer style={pokemonImageContainerStyle}>
          <SharedElement id={`pokemon.${pokemon.id}.image`}>
            <PokemonImage source={{uri:pokemon.image}} />
          </SharedElement>
        </PokemonImageContainer>
      </Container>
    </>
  );
};

export default Summary;
