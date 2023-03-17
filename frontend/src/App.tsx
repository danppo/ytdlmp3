import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';

import QuestionWrapper from './modules/questionPage';

export const App = () => (
  <ChakraProvider theme={theme}>
    <QuestionWrapper />
  </ChakraProvider>
);
