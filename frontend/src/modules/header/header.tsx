import React from 'react';
// import { useState } from 'react';
import Title from '../../components/title';
import ColorModeSwitcher from '../../components/colorSwitcher';
import { IconButton, Flex, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { MdMenu } from 'react-icons/md';
// import MultiPerson from '../../components/multiPersonMenu/';

import styles from './header.module.scss';

type Props = {
  resetQuestions: () => void;
};

const Header = ({ resetQuestions }: Props) => {
  // const [multiPersonOpen, setMultiPersonOpen] = useState(false);
  return (
    <Flex className={styles.header} justify='space-between' data-testid='Header'>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label='Menu'
          icon={<MdMenu />}
          variant='outline'
          data-testid='menuButton'
        />
        <MenuList>
          <MenuItem onClick={resetQuestions} data-testid='menuButton-reset'>
            Reset Questions
          </MenuItem>
          {/* <MenuItem onClick={() => setMultiPersonOpen(true)}>Multi person mode</MenuItem> */}
          <MenuItem>Help</MenuItem>
        </MenuList>
      </Menu>
      <Title size='3xl' bold value={'Answer Me This?'} />
      <ColorModeSwitcher />
      {/* <MultiPerson handleOpen={multiPersonOpen} handleClose={setMultiPersonOpen} /> */}
    </Flex>
  );
};

export default Header;
