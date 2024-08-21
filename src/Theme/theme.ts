// theme.ts
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    background: '#ffff',
    primary: '#E4A833',
    secondary: '#F3E1AE',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
      },
      variants: {
        solid: {
          bg: 'primary',
          color: 'white',
          _hover: {
            bg: '#D89E2E', // A slightly darker shade for hover
          },
        },
        link: {
          color: 'secondary',
          _hover: {
            textDecoration: 'underline',
          },
        },
      },
    },
    Text: {
      baseStyle: {
        color: 'gray.600',
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: 'background',
      },
    },
  },
});

export default theme;
