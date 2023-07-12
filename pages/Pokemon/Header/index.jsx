import React, { useCallback } from 'react';
import { Animated } from 'react-native';
import { useTheme } from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome'; // Replace 'FontAwesome' with the icon library you are using (e.g., 'MaterialIcons', 'Ionicons', etc.)
import { useNavigation } from '@react-navigation/native';


import Text from '../../../components/Text';
import Pokeball from '../../../components/Pokeball';

import { Container, GoBackButton } from './styles';



const Header = ({ pokemon, translateY }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const handleGoBack = useCallback(() => navigation.goBack(), [navigation]);

  const fadeStyle = {
    opacity: translateY.interpolate({
      inputRange: [-300, -200],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
  };

  return (
    <Container>
      <GoBackButton onPress={handleGoBack}>
        <Icon name="arrow-left" color={colors.white} size={24} />
      </GoBackButton>

      <Animated.View style={fadeStyle}>
        <Text variant="body1" color="white" bold>
          {pokemon.name}
        </Text>
      </Animated.View>

      <Animated.View style={fadeStyle}>
        <Text variant="body3" color="white" bold>
          #{pokemon.pokedex_number}
        </Text>
      </Animated.View>

      <Pokeball
        width={150}
        height={150}
        withRotate
        style={{
          position: 'absolute',
          right: -32,
          ...fadeStyle,
        }}
      />
    </Container>
  );
};

export default Header;
