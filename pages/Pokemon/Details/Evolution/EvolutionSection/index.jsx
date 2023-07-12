import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'; // Replace 'FontAwesome' with the icon library you are using (e.g., 'MaterialIcons', 'Ionicons', etc.)
import { useTheme } from 'styled-components';

import Text from '../../../../../components/Text';

import {
  Container,
  Pokemon,
  PokeballBackground,
  PokemonImage,
  MinLevel,
} from './styles';



const EvolutionSection = ({
  firstImage,
  firstName,
  secondImage,
  secondName,
  minLevel,
}) => {
  const { colors } = useTheme();

  return (
    <Container>
      <Pokemon>
        <PokeballBackground />

        <PokemonImage source={{ uri: firstImage }} />
        <Text>{firstName}</Text>
      </Pokemon>

      <MinLevel>
        <Icon name="arrow-right" size={20} color={colors.grey} />
        <Text bold style={{ marginTop: 8 }}>
          Lvl {minLevel}
        </Text>
      </MinLevel>

      <Pokemon>
        <PokeballBackground />

        <PokemonImage source={{ uri: secondImage }} />
        <Text>{secondName}</Text>
      </Pokemon>
    </Container>
  );
};

export default EvolutionSection;
