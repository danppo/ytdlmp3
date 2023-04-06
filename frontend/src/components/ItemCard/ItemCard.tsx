import {
  Flex,
  Text,
  useColorModeValue,
  Button,
  ButtonGroup,
  Progress,
  Stack,
  CloseButton,
  Box,
} from '@chakra-ui/react';

type Thumbs = {
  url: string;
  width: number;
  height: number;
};
interface VideoItem {
  url: string;
  title: string;
  thumbnail: Thumbs[];
  videoId: string;
  length: string;
  downloaded: 'YES' | 'NO' | 'InProgress';
  status: 'NotStarted' | 'Starting' | 'Downloading' | 'Finished';
  progress: number;
  fileName: string;
  error: any;
}

type Props = {
  details: VideoItem;
  getDownload: () => void;
  removeItem: (item: string) => void;
};

const ItemCard = ({ details, getDownload, removeItem }: Props) => {
  const background = useColorModeValue('gray.100', 'gray.700');
  const shadow = useColorModeValue('xl', 'dark-lg');

  return (
    <Flex
      pos='relative'
      w='100%'
      h='170px'
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
      <img src={details.thumbnail[2].url} alt='thumbnail from video' />
      <Stack pl='4' direction='column' flexGrow={1} maxWidth='70%'>
        <Text
          fontSize='xl'
          data-testid='questionCardContent'
          textOverflow={'ellipsis'}
          overflow='hidden'
          whiteSpace='nowrap'
        >
          {details.title}
        </Text>
        {details.downloaded !== 'YES' && (
          <Button
            colorScheme='teal'
            variant='solid'
            disabled={details.downloaded === 'InProgress'}
            onClick={getDownload}
          >
            {details.downloaded === 'InProgress' ? `Downloading ${details.progress}%` : 'Download'}
          </Button>
        )}
        {details.downloaded === 'YES' && (
          <ButtonGroup isAttached colorScheme='teal' variant='solid'>
            <Button flexGrow={1} onClick={() => removeItem(details.videoId)}>
              Clear
            </Button>
            <Button variant='outline' onClick={getDownload}>
              Redownload
            </Button>
          </ButtonGroup>
        )}
        {details.downloaded === 'InProgress' && (
          <>
            {/* <Text fontSize='sm'> Downloading {details.progress}</Text> */}
            <Progress hasStripe colorScheme='teal' value={details.progress} />
          </>
        )}
        {details.downloaded === 'YES' && (
          <>
            {/* <Text fontSize='sm'> Finished</Text> */}
            <Text fontSize='sm'> {details.fileName}</Text>
          </>
        )}
      </Stack>
      <Box pos='absolute' right='1' top='1'>
        <CloseButton onClick={() => removeItem(details.videoId)} />
      </Box>
    </Flex>
  );
};

export default ItemCard;
