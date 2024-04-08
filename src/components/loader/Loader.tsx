import { Center, CenterProps, Spinner, SpinnerProps, Text, VStack } from '@chakra-ui/react';
import React from 'react';

export type LoaderProps = CenterProps & {
  loaderSize?: SpinnerProps['size'];
  loadingText?: string;
};

export const Loader: React.FC<LoaderProps> = ({ loaderSize = 'xl', loadingText, ...rest }) => {
  return (
    <Center h="full" {...rest}>
      <VStack w="full" spacing={6}>
        <Spinner size={loaderSize} color="primary" thickness="4px" />
        {loadingText && <Text color="textSubtle">{loadingText}</Text>}
      </VStack>
    </Center>
  );
};
