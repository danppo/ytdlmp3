import {
  Checkbox,
  Stack,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  IconButton,
  Text,
} from '@chakra-ui/react';

import { MdFilterList, MdCheckCircle } from 'react-icons/md';
import { useEffect, useState } from 'react';
import styles from './filter.module.scss';
import classNames from 'classnames';

type Props = {
  categories: string[];
  noQuestionsLeftCats: string[];
  selectedCats: string[];
  setSelectedCats: (s: string[]) => void;
  onCloseModal: () => void;
};

const Filter = ({
  categories,
  selectedCats,
  setSelectedCats,
  onCloseModal,
  noQuestionsLeftCats,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const allChecked = categories.length === selectedCats.length;
  const [isInvalid, setIsInvalid] = useState(false);

  const handleSelectAllClose = () => {
    setSelectedCats(categories);
    setTimeout(() => {
      setIsInvalid(false);
      onClose();
    }, 200);
  };

  const handleSingleChecked = (name: string, checked: boolean) => {
    if (checked) {
      setSelectedCats([...selectedCats, name]);
    } else {
      const tempCats = selectedCats;
      setSelectedCats(tempCats.filter((cat) => cat !== name));
    }
  };

  useEffect(() => {
    if (selectedCats.length > 0) {
      setIsInvalid(false);
    } else {
      setIsInvalid(true);
    }
  }, [selectedCats]);

  const handleClose = () => {
    if (!isInvalid) {
      onClose();
      onCloseModal();
    }
  };

  const FilterIcon = () => {
    return (
      <>
        <MdFilterList />
        {!allChecked && <MdCheckCircle className={styles.check} />}
      </>
    );
  };

  return (
    <>
      <IconButton
        onClick={onOpen}
        aria-label='Search database'
        icon={<FilterIcon />}
        height='56px'
        width='74px'
        data-testid='FilterButton'
      />

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Choose Categories</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack px={6} spacing={1}>
              <>
                {categories.map((i, key) => {
                  return (
                    <Checkbox
                      key={key}
                      colorScheme='teal'
                      disabled={noQuestionsLeftCats.includes(i)}
                      className={classNames([isInvalid && styles.checkboxInvalid, styles.checkbox])}
                      name={i}
                      isInvalid={isInvalid}
                      isChecked={
                        !noQuestionsLeftCats.includes(i) ? selectedCats.includes(i) : false
                      }
                      onChange={(e) => handleSingleChecked(e.target.name, e.target.checked)}
                      data-testid='catCheckbox'
                    >
                      {i}
                    </Checkbox>
                  );
                })}
                <Text fontSize='xs' color='red.300' height='18px' data-testid='noCats'>
                  {isInvalid && <>One category must be selected</>}
                </Text>
              </>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme='teal'
              mr={3}
              onClick={handleSelectAllClose}
              variant='outline'
              data-testid='selectAll'
            >
              Select All and Close
            </Button>
            <Button
              disabled={isInvalid}
              colorScheme='teal'
              onClick={handleClose}
              data-testid='catClose'
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Filter;
