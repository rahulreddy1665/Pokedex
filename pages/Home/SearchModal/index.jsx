import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Alert, Animated, KeyboardAvoidingView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from 'styled-components';
import {useNavigation} from '@react-navigation/native';

import useSearch from '../../../hooks/search';

import Modal from '../../../components/Modal/index';
import Loading from '../../../components/Loader/index';

import {Content, SearchButtonContainer, SearchButton} from './styles';
import Input from '../../../components/Input/index';

const SearchModal = () => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const {handleToggleSearch, searchValue, setSearchValue, handleSearchPokemon} =
    useSearch();

  const [isFocussed, setIsFocussed] = useState(false);
  const [loading, setLoading] = useState(false);

  const width = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    Animated.timing(width, {
      toValue: isFocussed ? 48 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocussed, width]);

  const handleSearch = useCallback(async () => {
    setLoading(true);

    try {
      const pokemon = await handleSearchPokemon(searchValue);
      setLoading(false);

      if (pokemon) {
        navigation.navigate('Pokemon', {
          pokemon,
          from: 'search',
        });
      }else{
        setLoading(false);
      Alert.alert(
        'Fail to get Pokémon', 
        'An error has ocurred when try to load this Pokémon, check if you typed it`s name correct.',
      );
      }
    } catch (error) {
    setLoading(false);
      Alert.alert(
        'Fail to get Pokémon', 
        'An error has ocurred when try to load this Pokémon, check if you typed it`s name correct.',
      );
    }
  }, [handleSearchPokemon, searchValue, navigation]);

  const widthStyle = width.interpolate({
    inputRange: [0, 48],
    outputRange: [0, 48],
    extrapolate: 'clamp',
  });

  return (
    <KeyboardAvoidingView
      style={{zIndex: 10, position: 'absolute', bottom: 0}}
      behavior="position">
      <Modal handleCloseModal={handleToggleSearch}>
        <Content>
          <Input
            icon="search"
            placeholder="Search for a Pokémon name..."
            setValue={setSearchValue}
            onFocus={() => setIsFocussed(true)}
            onBlur={() => setIsFocussed(false)}
            autoCorrect={false}
          />

          {isFocussed && (
            <SearchButtonContainer style={{width: widthStyle}}>
              <SearchButton onPress={handleSearch}>
                {loading ? (
                  <Loading color="white" />
                ) : (
                  <Icon name="send" size={20} color={colors.white} />
                )}
              </SearchButton>
            </SearchButtonContainer>
          )}
        </Content>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default SearchModal;
