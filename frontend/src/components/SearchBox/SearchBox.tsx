import {
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
  Stack,
} from '@chakra-ui/react';
import { useState, useEffect, useRef } from 'react';

type Props = {
  fetchItem: (url: string) => void;
  isError: string;
  setIsError: (value: string) => void;
  isLoading: boolean;
};

const SearchBox = ({ fetchItem, isError, isLoading, setIsError }: Props) => {
  const [link, setLink] = useState('https://www.youtube.com/watch?v=e_s49nGBrgQ');
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!!isError && !isLoading) {
      setLink('');
    }
  }, [isError, isLoading]);

  const handleClear = () => {
    setLink('');
    setIsError('');
    if (ref && ref.current) {
      ref.current.focus();
    }
  };

  return (
    <Stack spacing={4} pb='2' direction='column' align='center'>
      <FormControl isInvalid={!!isError}>
        <FormLabel>Youtube Link</FormLabel>
        <InputGroup size='md'>
          <Input
            ref={ref}
            pr='4.5rem'
            value={link}
            onChange={(e) => {
              setLink(e.target.value);
              setIsError('');
            }}
            type='text'
            autoFocus
          />
          <InputRightElement width='4.5rem'>
            {!!link && (
              <Button h='1.75rem' size='sm' onClick={handleClear}>
                Clear
              </Button>
            )}
          </InputRightElement>
        </InputGroup>
        {!isError ? (
          <FormHelperText>
            Copy the URL from the address bar or copy the link in the share option
          </FormHelperText>
        ) : (
          <FormErrorMessage>There was an error: {isError}</FormErrorMessage>
        )}
      </FormControl>
      <Button isLoading={isLoading} colorScheme='teal' size='lg' onClick={() => fetchItem(link)}>
        Find Video
      </Button>
    </Stack>
  );
};

export default SearchBox;
