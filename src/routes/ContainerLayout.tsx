import { Box, Container } from '@chakra-ui/react';
import React from 'react';
import { Navbar } from './Navbar';
import { CONTAINER_MAX_WIDTH } from './constants';

export const ContainerLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Box as="main" h={`calc(100vh)`} display="flex" flexDirection="column" overflow="auto">
      <Navbar />
      <Container maxW={CONTAINER_MAX_WIDTH} p={0} pb={4} flex={1} position="relative">
        {children}
      </Container>
    </Box>
  );
};
