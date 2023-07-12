import React, {useState, useMemo, useEffect, useCallback} from 'react';
import {Container, PokemonsList} from './style';
import Header from '../../components/Header';
import Text from '../../components/Text';
import {View, Animated, Alert} from 'react-native';
import Loading from '../../components/Loader';
import {fetchData} from '../../helpers/helper';
import {API_OFFSET} from '../../constants';
import PokemonCard from './PokemonCard/PokemonCard';
import FloatingButton from './FloatingButton';
import SearchModal from './SearchModal';
import useSearch from '../../hooks/search';

const Home = () => {
    const { isSearching } = useSearch();
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [counter, setCounter] = useState(1);
  const [loadingInitalData, setLoadingInitialData] = useState(true);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const opacity = useMemo(() => new Animated.Value(0), []);
  const translateY = useMemo(() => new Animated.Value(50), []);

  const loadPokemons = useCallback(
    async (offsetValue = offset, shouldRefresh = false) => {
      try {
        setLoading(true);
        const response = await fetchData(offset);
        if (loadingInitalData) {
          setLoadingInitialData(false);
        }
        setPokemons(shouldRefresh ? response : [...pokemons, ...response]);
        setOffset(shouldRefresh ? API_OFFSET : API_OFFSET * counter);
        setCounter(shouldRefresh ? 2 : counter + 1);
        setLoading(false);

        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),

          Animated.timing(translateY, {
            toValue: 0,
            duration: 700,
            useNativeDriver: true,
          }),
        ]).start();
      } catch (err) {
        console.log('this is the error', err);
        Alert.alert(
          'Fail to get Pokémons',
          'An error has ocurred when try to load the Pokémons, please try again.',
        );
      }
    },
    [pokemons, loadingInitalData, offset, counter, opacity, translateY],
  );

  useEffect(() => {
    loadPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ListFooterComponent = useMemo(
    () => (loading ? <Loading style={{marginVertical: 8}} /> : <></>),
    [loading],
  );

  const refreshList = useCallback(async () => {
    setRefreshing(true);

    await loadPokemons(0, true);

    setRefreshing(false);
  }, [loadPokemons]);

  if (loadingInitalData) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Loading />
      </View>
    );
  }
  return (
    <Container>
      <Header>
        <Text variant="title">Pokedex</Text>
      </Header>
      <PokemonsList
        data={pokemons}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 24, paddingHorizontal: 24}}
        onEndReached={() => loadPokemons()}
        onEndReachedThreshold={0.1}
        onRefresh={refreshList}
        refreshing={refreshing}
        ListFooterComponent={ListFooterComponent}
        keyExtractor={pokemon => String(pokemon.id)}
        numColumns={2}
        renderItem={({item: pokemon, index}) => {
          return (
            <PokemonCard
              pokemon={pokemon}
              afterThirdCard={!!(index + 2)}
              rightCard={!!(index % 2)}
              opacity={opacity}
            />
          );
        }}
      />

      <FloatingButton />

      {isSearching && <SearchModal />}
    </Container>
  );
};

export default Home;
