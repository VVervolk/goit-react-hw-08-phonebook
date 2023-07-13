import { modalAnatomy as parts } from '@chakra-ui/anatomy';
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const xs = defineStyle({
  minW: '414px',
});

const sizes = {
  xs: definePartsStyle({ dialogContainer: xs }),
};

export const modalTheme = defineMultiStyleConfig({
  sizes,
});

export const myTheme = {
  components: { Modal: modalTheme },
  colors: {
    transparent: 'transparent',
    black: '#000',
    white: '#fff',
    blue: {
      600: '#24a3ff',
      // ...
    },
    // ...
  },
};
