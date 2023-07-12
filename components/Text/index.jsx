import React from 'react';
import theme from '../../styles/theme';

import {Container} from './styles';

const Text = ({variant, color, bold, children, ...rest}) => {
  return (
    <Container variant={variant} color={color} bold={bold} {...rest}>
      {children}
    </Container>
  );
};

Text.defaultProps = {
  variant: 'body3',
  color: theme.colors.black,
  bold: false,
};

export default Text;
