import React from 'react';
import { Flex } from '@chakra-ui/react';
import Questions from '../questions';
import Header from '../header';
import Footer from '../footer';
import { useState } from 'react';

const QuestionPage = () => {
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
      <Flex
        minH='100vh'
        w='xl'
        p={3}
        alignItems='center'
        direction='column'
        justify='space-between'
      >
        <Header resetQuestions={() => setResetQuestions(true)} />
        <Questions resetTrigger={resetQuestions} setResetTrigger={() => setResetQuestions(false)} />
        <Footer />
      </Flex>
    </Flex>
  );
};

export default QuestionPage;
