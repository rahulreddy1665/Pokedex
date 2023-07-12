import styled from 'styled-components/native';
import { FlatList } from 'react-native';


export const Container = styled.View`
  flex: 1;
  position: relative;
`;

export const PokemonsList = styled(FlatList)`
  flex: 1;
  margin-top: 8px;
`;
