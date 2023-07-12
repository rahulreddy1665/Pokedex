import React from 'react';
import { useTheme } from 'styled-components';
import Icon from 'react-native-vector-icons/Feather';

import { Container, TextInput } from './styles';



const Input = ({ setValue, icon, ...rest }) => {
  const { colors } = useTheme();

  return (
  
   <Container> 
       <Icon name={'search'} style={{marginRight:12}} size={24} color={colors.black} />

      <TextInput
        keyboardAppearance="light"
        placeholderTextColor={`${colors.black}75`}
        onChangeText={setValue}
        {...rest}
      />
    </Container>
  
  );
};

export default Input;
