import { AspectRatio, AspectRatioProps, Box, BoxProps, HStack, useColorModeValue } from '@chakra-ui/react';
import React, { LegacyRef, NamedExoticComponent, PropsWithChildren } from 'react';

const DEFAULT_CARD_MIN_W = '200px';
const DEFAULT_CARD_MAX_W = '350px';

type Props = {
  ref?: LegacyRef<HTMLDivElement> | undefined;
} & BoxProps;

const Card: React.FC<Props> = (boxProps) => {
  const backgroundColor = useColorModeValue('gray.100', 'gray.900');
  return (
    <Box
      minW={DEFAULT_CARD_MIN_W}
      maxW={DEFAULT_CARD_MAX_W}
      display="flex"
      flexDir="column"
      borderRadius="xl"
      overflow="hidden"
      backgroundColor={backgroundColor}
      h="full"
      {...boxProps}
    />
  );
};

const Image = React.memo(function BaseCardImage({ children, ...aspectRatioProps }: AspectRatioProps) {
  const backgroundColor = useColorModeValue('gray.300', 'gray.800');
  return (
    <Box w="full" borderRadius="xl" overflow="hidden">
      <AspectRatio flex="1" ratio={1} backgroundColor={backgroundColor} {...aspectRatioProps}>
        {children}
      </AspectRatio>
    </Box>
  );
});

const Content = React.memo(function BaseCardContent({ children, ...boxProps }: Props) {
  return (
    <Box w="full" {...boxProps}>
      {children}
    </Box>
  );
});

const Footer = React.memo(function BaseCardFooter({ children, ...boxProps }: Props) {
  return (
    <HStack w="full" justifyContent="space-between" {...boxProps}>
      {children}
    </HStack>
  );
});

type MemoizedCardCompose = {
  Image: NamedExoticComponent<AspectRatioProps>;
  Content: NamedExoticComponent<Props>;
  Footer: NamedExoticComponent<Props>;
};

export const BaseCard = React.memo(Card) as NamedExoticComponent<PropsWithChildren<Props>> & MemoizedCardCompose;

// Composition must come after memoization, otherwise `.displayName` in BaseCard will throw errors.
BaseCard.Image = Image;
BaseCard.Content = Content;
BaseCard.Footer = Footer;
