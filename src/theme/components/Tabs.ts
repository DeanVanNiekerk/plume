import { tabsAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, cssVar, defineStyle } from '@chakra-ui/styled-system';
import { mode } from '@chakra-ui/theme-tools';

const $fg = cssVar('tabs-color');
const $bg = cssVar('tabs-bg');

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(parts.keys);

const baseStyleRoot = defineStyle((props) => {
  const { orientation } = props;
  return {
    display: orientation === 'vertical' ? 'flex' : 'block',
  };
});

const baseStyleTab = defineStyle((props) => {
  const { isFitted } = props;

  return {
    flex: isFitted ? 1 : undefined,
    transitionProperty: 'common',
    transitionDuration: 'normal',
    _focusVisible: {
      zIndex: 1,
      boxShadow: 'outline',
    },
    _disabled: {
      cursor: 'not-allowed',
      opacity: 0.4,
    },
  };
});

const baseStyleTablist = defineStyle((props) => {
  const { align = 'start', orientation } = props;

  const alignments: Record<string, string> = {
    end: 'flex-end',
    center: 'center',
    start: 'flex-start',
  };

  return {
    justifyContent: alignments[align],
    flexDirection: orientation === 'vertical' ? 'column' : 'row',
  };
});

const baseStyleTabpanel = defineStyle({
  p: 4,
});

const baseStyle = definePartsStyle((props) => ({
  root: baseStyleRoot(props),
  tab: baseStyleTab(props),
  tablist: baseStyleTablist(props),
  tabpanel: baseStyleTabpanel,
}));

const sizes = {
  sm: definePartsStyle({
    tab: {
      py: 1,
      px: 1,
      fontSize: 'sm',
      mx: 2,
    },
  }),
  md: definePartsStyle({
    tab: {
      fontSize: 'md',
      py: 2,
      px: 3,
    },
  }),
  lg: definePartsStyle({
    tab: {
      fontSize: 'lg',
      py: 3,
      px: 4,
    },
  }),
};

const variantLine = definePartsStyle((props) => {
  const { orientation, colorScheme } = props;
  const isVertical = orientation === 'vertical';
  const borderProp = isVertical ? 'borderStart' : 'borderBottom';
  const marginProp = isVertical ? 'marginStart' : 'marginBottom';

  let color = mode(`colors.brand.normal`, `colors.brand.offset`)(props);
  if (colorScheme === 'white') color = 'colors.white';
  if (colorScheme === 'black') color = 'colors.black';

  return {
    tablist: {
      border: 0,
    },
    tab: {
      fontWeight: 600,
      [borderProp]: '2px solid',
      borderColor: 'transparent',
      [marginProp]: '-2px',
      _selected: {
        [$fg.variable]: color,
        _dark: {
          [$fg.variable]: color,
        },
        borderColor: 'currentColor',
      },
      _active: {
        [$bg.variable]: 'colors.gray.200',
        _dark: {
          [$bg.variable]: 'colors.whiteAlpha.300',
        },
      },
      _disabled: {
        _active: { bg: 'none' },
      },
      [$fg.variable]: 'colors.gray.500',
      bg: $bg.reference,
    },
  };
});

const variants = {
  line: variantLine,
};

export const tabsTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps: {
    size: 'md',
    variant: 'line',
    colorScheme: 'primary',
  },
});
