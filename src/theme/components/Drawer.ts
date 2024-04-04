import { drawerAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const baseStyleDialog = defineStyle({
  bg: 'gray.100',
  _dark: {
    bg: 'gray.900',
  },
});

const baseStyle = definePartsStyle(() => ({
  dialog: baseStyleDialog,
}));

export const drawerTheme = defineMultiStyleConfig({
  baseStyle,
});
