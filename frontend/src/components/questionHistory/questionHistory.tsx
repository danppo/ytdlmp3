import { useEffect, useState } from 'react';
import QuestionCard from '../questionCard';
import { VStack } from '@chakra-ui/react';
import styles from './questionHistory.module.scss';
import { Question } from '../../types';

type Props = {
  questionList: Question[];
  skippedList: number[];
  answeredNow: (id: number) => void;
};

const QuestionHistory = ({ questionList, skippedList, answeredNow }: Props) => {
  const [orderedList, setOrderedList] = useState<Question[]>([]);

  useEffect(() => {
    const list = [...questionList];
    list.shift();
    setOrderedList(list);
  }, [questionList]);

  return (
    <VStack
      spacing={4}
      w='100%'
      className={styles.questionHistory}
      style={{ overflow: 'auto', maxHeight: 'calc(100vh - 150)' }}
    >
      {orderedList.map((item, index) => (
        <QuestionCard
          question={item}
          key={index}
          isSkipped={skippedList.includes(item.id)}
          answeredNow={() => answeredNow(item.id)}
        />
      ))}
    </VStack>
  );
};

export default QuestionHistory;
