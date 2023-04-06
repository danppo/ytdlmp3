import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';

import MainWrapper from './modules/MainWrapper';

export const App = () => (
  <ChakraProvider theme={theme}>
    <MainWrapper />
  </ChakraProvider>
);
