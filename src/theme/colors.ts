// Based off of: https://github.com/chakra-ui/chakra-ui/blob/main/packages/components/theme/src/foundations/colors.ts

export const colors = {
  transparent: 'transparent',
  black: '#171717',
  white: '#FDFCFD',

  brand: {
    normal: '#0B26B5',
    offset: '#F3DFFF',
  },

  whiteAlpha: {
    50: 'rgba(253, 253, 253, 0.04)',
    100: 'rgba(253, 253, 253, 0.06)',
    200: 'rgba(253, 253, 253, 0.08)',
    300: 'rgba(253, 253, 253, 0.16)',
    400: 'rgba(253, 253, 253, 0.24)',
    500: 'rgba(253, 253, 253, 0.36)',
    600: 'rgba(253, 253, 253, 0.48)',
    700: 'rgba(253, 253, 253, 0.64)',
    800: 'rgba(253, 253, 253, 0.80)',
    900: 'rgba(253, 253, 253, 0.92)',
  },

  blackAlpha: {
    50: 'rgba(23, 23, 23, 0.04)',
    100: 'rgba(23, 23, 23, 0.06)',
    200: 'rgba(23, 23, 23, 0.08)',
    300: 'rgba(23, 23, 23, 0.16)',
    400: 'rgba(23, 23, 23, 0.24)',
    500: 'rgba(23, 23, 23, 0.36)',
    600: 'rgba(23, 23, 23, 0.48)',
    700: 'rgba(23, 23, 23, 0.64)',
    800: 'rgba(23, 23, 23, 0.80)',
    900: 'rgba(23, 23, 23, 0.92)',
  },

  gray: {
    50: '#F7FAFC',
    100: '#F1F2F3',
    200: '#D9DBDE',
    300: '#C0C4C8',
    400: '#A1ABB1',
    500: '#8F959D',
    600: '#5F656D',
    700: '#474B52',
    800: '#303236',
    900: '#212326',
  },

  red: {
    50: 'rgba(255, 61, 61, 0.2)',
    100: '#FFE5D8',
    200: '#FFC5B1',
    300: '#FF9E8A',
    400: '#FF7A6D',
    500: '#FF3D3D',
    600: '#DB2C3B',
    700: '#B71E39',
    800: '#931334',
    900: '#7A0B32',
  },

  orange: {
    50: 'rgba(221, 107, 32, 0.2)',
    100: '#FDEDD1',
    200: '#FBD6A5',
    300: '#F4B777',
    400: '#EA9854',
    500: '#DD6B20',
    600: '#BE4F17',
    700: '#9F3710',
    800: '#80240A',
    900: '#6A1606',
  },

  yellow: {
    50: 'rgba(252, 190, 71, 0.2)',
    100: '#FEF7DA',
    200: '#FEEDB5',
    300: '#FEE090',
    400: '#FDD374',
    500: '#FCBE47',
    600: '#D89A33',
    700: '#B57923',
    800: '#925A16',
    900: '#78450D',
  },

  green: {
    50: 'rgba(62, 201, 39, 0.2)',
    100: '#E6FCD3',
    200: '#C7F9A9',
    300: '#9DEE7B',
    400: '#75DE58',
    500: '#3EC927',
    600: '#25AC1C',
    700: '#139015',
    800: '#0C7416',
    900: '#076016',
  },

  purple: {
    50: 'rgba(112, 95, 242, 0.2)',
    100: '#E4DFFE',
    200: '#C9C0FD',
    300: '#AC9FFB',
    400: '#9486F7',
    500: '#705FF2',
    600: '#5345D0',
    700: '#3B2FAE',
    800: '#271E8C',
    900: '#181274',
  },

  blue: {
    50: 'rgba(42, 133, 255, 0.2)',
    100: '#D4EDFF',
    200: '#A9D9FF',
    300: '#7FC0FF',
    400: '#5FAAFF',
    500: '#2A85FF',
    600: '#1E67DB',
    700: '#154CB7',
    800: '#0D3593',
    900: '#08257A',
  },
};

export const semanticTokens = {
  // Chakra Overrides
  'chakra-body-bg': {
    default: 'white',
    _dark: 'black',
  },
  'chakra-subtle-bg': {
    default: 'gray.100',
    _dark: 'gray.900',
  },
  'chakra-border-color': {
    default: 'gray.200',
    _dark: 'gray.800',
  },
  // Custom Tokens
  primary: {
    default: 'brand.normal',
    _dark: 'brand.offset',
  },
  // this color should be clearly visible on top of the primary color
  primaryOffset: {
    default: 'brand.offset',
    _dark: 'brand.normal',
  },
  text: {
    default: 'black',
    _dark: 'white',
  },
  textSubtle: {
    default: 'gray.600',
    _dark: 'gray.400',
  },
  textDisabled: {
    default: 'gray.400',
    _dark: 'gray.600',
  },
  error: {
    default: 'red.500',
    _dark: 'red.500',
  },
  success: {
    default: 'green.500',
    _dark: 'green.500',
  },
  warning: {
    default: 'orange.500',
    _dark: 'orange.500',
  },
  background: {
    default: 'white',
    _dark: 'black',
  },
  cardBackground: {
    default: 'gray.100',
    _dark: 'gray.900',
  },
  cardBackgroundNested: {
    default: 'blackAlpha.50',
    _dark: 'whiteAlpha.50',
  },
  stickyBackground: {
    default: 'whiteAlpha.800',
    _dark: 'blackAlpha.800',
  },
};
