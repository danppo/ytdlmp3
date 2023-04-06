import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
// import Questions from '../questions';
import Downloader from '../Downloader';
import Header from '../header';
import Footer from '../footer';
import { useState } from 'react';

const MainWrapper = () => {
  const [resetQuestions, setResetQuestions] = useState(false);
  return (
    <Flex
      textAlign='center'
      justifyContent='center'
      fontSize='xl'
      style={{ position: 'relative', height: '100vh' }}
      className='AppFlex'
      data-testid='QuestionPage'
    >
      <Flex minH='100vh' w='4xl' p={3} alignItems='center' direction='column'>
        <Header resetQuestions={() => setResetQuestions(true)} />
        <Box flex='1' w='90%'>
          <Downloader />
        </Box>
        <Footer />
      </Flex>
    </Flex>
  );
};

export default MainWrapper;
