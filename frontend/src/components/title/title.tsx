import React from 'react';
import { Text } from '@chakra-ui/react';

type Props = {
  value: string;
  size: '3xl' | 'm';
  bold?: boolean;
};

const Title = ({ value, size, bold }: Props) => {
  return (
    <Text as={bold ? 'b' : undefined} fontSize={size} data-testid='title'>
      {value}
    </Text>
  );
};

export default Title;
