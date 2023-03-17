import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useEffect } from "react";

type Props = {
  handleOpen: boolean;
  handleClose: (value: boolean) => void;
};

const MultiPerson = ({ handleOpen, handleClose }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (handleOpen) {
      onOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleOpen]);

  const closeModal = () => {
    onClose();
    handleClose(false);
  };
  const handleSave = () => {
    onClose();
    handleClose(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Names</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* <Stack px={6} spacing={1}>
            <>
              {categories.map((i, key) => {
                return (
                  <Checkbox
                    key={key}
                    colorScheme="teal"
                    disabled={noQuestionsLeftCats.includes(i)}
                    className={classNames([
                      isInvalid && styles.checkboxInvalid,
                      styles.checkbox,
                    ])}
                    name={i}
                    isInvalid={isInvalid}
                    isChecked={
                      !noQuestionsLeftCats.includes(i)
                        ? selectedCats.includes(i)
                        : false
                    }
                    onChange={(e) =>
                      handleSingleChecked(e.target.name, e.target.checked)
                    }
                  >
                    {i}
                  </Checkbox>
                );
              })}
              <Text fontSize="xs" color="red.300" height="18px">
                {isInvalid && <>One category must be selected</>}
              </Text>
            </>
          </Stack> */}
        </ModalBody>

        <ModalFooter>
          {/* <Button
            colorScheme="teal"
            mr={3}
            onClick={onClose}
            variant="outline"
          >
            Select All and Close
          </Button> */}
          <Button colorScheme="teal" onClick={closeModal}>
            Close
          </Button>
          <Button colorScheme="teal" onClick={handleSave}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MultiPerson;
