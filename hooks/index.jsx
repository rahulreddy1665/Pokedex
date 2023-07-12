import React from 'react';

import { SearchProvider } from './search';

const AppProvider = ({ children }) => {
  return <SearchProvider>{children}</SearchProvider>;
};

export default AppProvider;
