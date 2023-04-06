import { Flex, Text, useColorModeValue, Stack, CloseButton, Box } from '@chakra-ui/react';

type Props = {
  list: string[];
  clearList: () => void;
};

const ItemCard = ({ list, clearList }: Props) => {
  const background = useColorModeValue('gray.100', 'gray.700');
  const shadow = useColorModeValue('xl', 'dark-lg');

  return (
    <Flex
      pos='relative'
      w='100%'
      borderRadius='lg'
      overflow='hidden'
      p='6'
      py='26px'
      boxShadow={shadow}
      justifyContent='space-between'
      bg={background}
      data-testid='historyQuestionCard'
      direction='row'
    >
      <Stack pl='4' direction='column'>
        {list.map((l, index) => (
          <Text key={index} fontSize='xl' data-testid='questionCardContent'>
            {l}
          </Text>
        ))}
      </Stack>

      <Box pos='absolute' right='1' top='1'>
        <CloseButton onClick={clearList} />
      </Box>
    </Flex>
  );
};

export default ItemCard;
