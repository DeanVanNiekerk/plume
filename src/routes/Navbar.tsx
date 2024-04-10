import { Center, Container, Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import { CONTAINER_MAX_WIDTH, NAVBAR_HEIGHT } from './constants';

export const Navbar: React.FC = () => {
  return (
    <Flex
      as="header"
      minH={NAVBAR_HEIGHT}
      boxShadow="sm"
      position="sticky"
      top={0}
      zIndex="banner"
      backdropFilter="blur(7px)"
    >
      <Container maxW={CONTAINER_MAX_WIDTH} h="full" p={0}>
        <Center h="full">
          <Heading color="primary" size="xl">
            Ranger
          </Heading>
        </Center>
      </Container>
    </Flex>
  );
};
