import Title from '../../components/title';
import ColorModeSwitcher from '../../components/colorSwitcher';
import { IconButton, Flex, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { MdMenu } from 'react-icons/md';

type Props = {
  resetQuestions: () => void;
};

const Header = ({ resetQuestions }: Props) => {
  return (
    <Flex mb='8' width='100%' justify='space-between' data-testid='Header'>
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
          <MenuItem>Help</MenuItem>
        </MenuList>
      </Menu>
      <Title size='3xl' bold value={'Youtube To MP3 Downloader'} />
      <ColorModeSwitcher />
    </Flex>
  );
};

export default Header;
