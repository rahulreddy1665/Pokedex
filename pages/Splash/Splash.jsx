import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {SCREEN_NAMES} from '../../constants';
import {Container, SplashImage} from './styles';

const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setTimeout(() => {
        navigation.replace(SCREEN_NAMES.home);
      }, 3000);
    }
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Container>
      <SplashImage source={require('../../assets/splash.png')} />
    </Container>
  );
};

export default Splash;
