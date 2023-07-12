import React, { useEffect, useState } from 'react';

import Text from '../../../../../components/Text';
import Loading from '../../../../../components/Loader/index';



import {
  Container,
  Header,
  EffectivenessList,
  EffectivenessItem,
} from './styles';
import { TypesEffectiveness } from '../../../../../helpers/helper';
import getColorByPokemonType from '../../../../../utils/getColorByPokemonType';



const Effectiveness = ({ pokemon }) => {
  const [effectiveness, setEffectiveness] = useState([]);
  const [loading, setLoading] = useState(true);

  const pokemonPrimaryType = pokemon.types[0].name.toLowerCase();

  useEffect(() => {
    async function loadPokemonEffectiveness() {
      const response = await TypesEffectiveness(pokemonPrimaryType);

      setEffectiveness(response);
      setLoading(false);
    }

    loadPokemonEffectiveness();
  }, [pokemonPrimaryType]);

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header>
            <Text variant="body1" bold>
              Type defenses
            </Text>
            <Text color="grey" style={{ marginTop: 8 }}>
              The effectiveness of each type on {pokemon.name}.
            </Text>
          </Header>

          <EffectivenessList>
            {effectiveness.map(effect => {
              const backgroundColor = getColorByPokemonType(effect.type);

              return (
                <EffectivenessItem
                  key={effect.type}
                  style={{ backgroundColor: `${backgroundColor}30` }}
                >
                  <Text
                    variant="caption"
                    bold
                    style={{ color: backgroundColor }}
                  >
                    {effect.type} {effect.multiplier}
                  </Text>
                </EffectivenessItem>
              );
            })}
          </EffectivenessList>
        </>
      )}
    </Container>
  );
};

export default Effectiveness;
