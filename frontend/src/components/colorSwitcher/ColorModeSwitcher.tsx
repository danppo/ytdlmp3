import React from 'react';
import { useColorMode, useColorModeValue, IconButton, IconButtonProps } from '@chakra-ui/react';
import { MdLightMode, MdModeNight } from 'react-icons/md';

type ColorModeSwitcherProps = Omit<IconButtonProps, 'aria-label'>;

const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = (props) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');

  const SwitchIcon = useColorModeValue(MdModeNight, MdLightMode);

  return (
    <div className='colorSwitcher' data-testid='colorSwitcher'>
      <IconButton
        size='md'
        fontSize='lg'
        variant='ghost'
        color='current'
        marginLeft='2'
        onClick={toggleColorMode}
        icon={<SwitchIcon />}
        aria-label={`Switch to ${text} mode`}
        {...props}
        data-testid='switcherButton'
      />
    </div>
  );
};

export default ColorModeSwitcher;
