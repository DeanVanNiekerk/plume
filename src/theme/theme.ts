import { ColorMode, extendTheme, ThemeConfig } from '@chakra-ui/react';
// import '@fontsource/inter/400.css';
// import '@fontsource/inter/500.css';
// import '@fontsource/inter/600.css';
// import '@fontsource/inter/700.css';
// import '@fontsource/montserrat/100.css';
// import '@fontsource/montserrat/200.css';
// import '@fontsource/montserrat/300.css';
// import '@fontsource/montserrat/400.css';
// import '@fontsource/montserrat/500.css';
// import '@fontsource/montserrat/600.css';
// import '@fontsource/montserrat/700.css';
// import '@fontsource/montserrat/900.css';
// import '@fontsource/poppins/400.css';
// import '@fontsource/poppins/500.css';
// import '@fontsource/poppins/700.css';
// import '@fontsource/poppins/900-italic.css';
import { colors, semanticTokens } from './colors';
import { buttonTheme, drawerTheme } from './components';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const themeBase: Record<string, any> = {
  config: config,
  // fonts: {
  //   body: 'Inter, Montserrat',
  //   heading: 'Poppins, Montserrat',
  // },
  // fontSizes: {
  //   xxs: '0.625rem', // 10px
  //   xs: '0.75rem', // 12px
  //   sm: '0.875rem', // 14px
  //   md: '1rem', // 16px
  //   lg: '1.125rem', // 18px
  //   xl: '1.25rem', // 20px
  //   '2xl': '1.5rem', // 24px
  //   '3xl': '1.875rem', // 30px
  //   '4xl': '2.25rem', // 36px
  //   '5xl': '3rem', // 48px
  //   '6xl': '3.75rem', // 60px
  // },
  // fontWeights: {
  //   hairline: 100,
  //   thin: 200,
  //   light: 300,
  //   normal: 400,
  //   medium: 500,
  //   semibold: 600,
  //   bold: 700,
  //   extrabold: 800,
  //   black: 900,
  // },
  styles: {
    global: ({ colorMode }: { colorMode: ColorMode }) => ({
      'html, body': {
        color: colorMode === 'dark' ? 'white' : 'black',
        backgroundColor: colorMode === 'dark' ? 'black' : 'white',
      },
    }),
  },
  colors: colors,
  semanticTokens: {
    colors: semanticTokens,
  },
  components: {
    Button: buttonTheme,
    Drawer: drawerTheme,
  },
};

export const theme = extendTheme(themeBase);
