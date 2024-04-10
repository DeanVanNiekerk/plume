import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system';
import { mode } from '@chakra-ui/theme-tools';

type AccessibleColor = {
  bg?: string;
  color?: string;
  hoverBg?: string;
  activeBg?: string;
};

/** Accessible color overrides for less accessible colors. */
const accessibleColorMap: { [key: string]: AccessibleColor } = {
  yellow: {
    bg: 'yellow.400',
    color: 'black',
    hoverBg: 'yellow.500',
    activeBg: 'yellow.600',
  },
  cyan: {
    bg: 'cyan.400',
    color: 'black',
    hoverBg: 'cyan.500',
    activeBg: 'cyan.600',
  },
};

const variantSolid = defineStyle((props) => {
  const { colorScheme: c } = props;

  if (c === 'gray') {
    const bg = mode(`gray.100`, `whiteAlpha.200`)(props);

    return {
      bg,
      color: mode(`gray.800`, `whiteAlpha.900`)(props),
      _hover: {
        bg: mode(`gray.200`, `whiteAlpha.300`)(props),
        _disabled: {
          bg,
        },
      },
      _active: { bg: mode(`gray.300`, `whiteAlpha.400`)(props) },
    };
  }

  if (c === 'primary') {
    const bg = mode(`brand.normal`, `brand.offset`)(props);

    return {
      bg,
      color: mode(`brand.offset`, `brand.normal`)(props),
      _hover: {
        bg,
        _disabled: {
          bg,
        },
      },
      _active: { bg },
    };
  }

  const { bg = `${c}.500`, color = 'white', hoverBg = `${c}.600`, activeBg = `${c}.700` } = accessibleColorMap[c] ?? {};

  const background = mode(bg, `${c}.200`)(props);

  return {
    bg: background,
    color: mode(color, `gray.800`)(props),
    _hover: {
      bg: mode(hoverBg, `${c}.300`)(props),
      _disabled: {
        bg: background,
      },
    },
    _active: { bg: mode(activeBg, `${c}.400`)(props) },
  };
});

const variants = {
  solid: variantSolid,
};

const sizes = {
  xl: {
    gap: '4',
    h: '14',
    minW: '14',
    borderRadius: 'lg',
    fontSize: 'lg',
    px: '8',
  },
  lg: {
    gap: '3',
    h: '12',
    minW: '12',
    borderRadius: 'lg',
    fontSize: 'md',
    px: '6',
  },
  md: {
    gap: '2',
    h: '10',
    minW: '10',
    borderRadius: 'md',
    fontSize: 'sm',
    px: '4',
  },
  sm: {
    gap: '2',
    h: '8',
    minW: '8',
    fontSize: 'sm',
    borderRadius: 'sm',
    px: '3',
  },
  xs: {
    gap: '1',
    h: '6',
    minW: '6',
    fontSize: 'xs',
    borderRadius: 'sm',
    px: '2',
  },
};

export const buttonTheme = defineStyleConfig({
  variants,
  sizes,
  defaultProps: {
    variant: 'solid',
    size: 'md',
    colorScheme: 'gray',
  },
});
