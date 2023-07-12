import React from 'react';

import { Container, Content } from './styles';

const Header = ({ children }) => {
  return (
    <Container>
      <Content>{children}</Content>
    </Container>
  );
};

export default Header;
