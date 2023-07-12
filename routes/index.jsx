import React from 'react'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { useTheme } from 'styled-components';
import { SCREEN_NAMES } from '../constants';
import Home from '../pages/Home/Home';
import Pokemon from '../pages/Pokemon/Pokemon';
import Splash from '../pages/Splash/Splash';


const Stack = createSharedElementStackNavigator();

const Routes = () => {
    const { colors } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
        cardStyle: {
          backgroundColor: colors.white,
        },
      }}
      initialRouteName={SCREEN_NAMES.splash}
    >
        <Stack.Screen name={SCREEN_NAMES.splash} component={Splash} />
        <Stack.Screen name={SCREEN_NAMES.home} component={Home} />
        <Stack.Screen
        name="Pokemon"
        component={Pokemon}
        options={{
          cardStyleInterpolator: ({ current }) => ({
            cardStyle: {
              opacity: current.progress,
            },
          }),
        }}
        sharedElements={(route) => {
          const { pokemon, from } = route.params;
          if (from === 'card') {
            const sharedArray = [
              {
                id: `pokemon.${pokemon.id}.image`,
              },
              {
                id: `pokemon.${pokemon.id}.name`,
              },
            ];

            pokemon.types.forEach(type => {
              return sharedArray.push({
                id: `pokemon.${pokemon.id}.type.${type.url}`,
              });
            });

            return sharedArray;
          }

          return undefined;
        }}
      />

        </Stack.Navigator>
  )
}

export default Routes