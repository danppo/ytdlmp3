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
} from "@chakra-ui/react";
import { VideoItem } from "../../modules/Downloader/Downloader";

type Props = {
  details: VideoItem;
  getDownload: () => void;
  removeItem: (item: string) => void;
};

const ItemCard = ({ details, getDownload, removeItem }: Props) => {
  const background = useColorModeValue("gray.100", "gray.700");
  const shadow = useColorModeValue("xl", "dark-lg");
  const inProgress =
    details.status === "Starting" || details.status === "Downloading";

  return (
    <Flex
      pos="relative"
      w="100%"
      h="170px"
      borderRadius="lg"
      overflow="hidden"
      p="6"
      py="26px"
      boxShadow={shadow}
      justifyContent="space-between"
      bg={background}
      data-testid="historyQuestionCard"
      direction="row"
    >
      <img src={details.thumbnail[2].url} alt="thumbnail from video" />
      <Stack pl="4" direction="column" flexGrow={1} maxWidth="70%">
        <Text
          fontSize="xl"
          data-testid="questionCardContent"
          textOverflow={"ellipsis"}
          overflow="hidden"
          whiteSpace="nowrap"
        >
          {details.title}
        </Text>
        {details.status !== "Finished" && (
          <Button
            colorScheme="teal"
            variant="solid"
            disabled={inProgress}
            onClick={getDownload}
          >
            {inProgress ? `Downloading ${details.progress}%` : "Download"}
          </Button>
        )}
        {details.status === "Finished" && (
          <ButtonGroup isAttached colorScheme="teal" variant="solid">
            <Button flexGrow={1} onClick={() => removeItem(details.videoId)}>
              Clear
            </Button>
            <Button variant="outline" onClick={getDownload}>
              Redownload
            </Button>
          </ButtonGroup>
        )}
        {inProgress && (
          <Progress hasStripe colorScheme="teal" value={details.progress} />
        )}
        {details.status === "Finished" && (
          <Text fontSize="sm"> {details.fileName}</Text>
        )}
        {details.status === "Error" && (
          <Text fontSize="sm" color="red.600">
            An Error happened, try again or try another video
          </Text>
        )}
      </Stack>
      <Box pos="absolute" right="1" top="1">
        <CloseButton onClick={() => removeItem(details.videoId)} />
      </Box>
    </Flex>
  );
};

export default ItemCard;
