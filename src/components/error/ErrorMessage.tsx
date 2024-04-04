import { Alert, AlertDescription, AlertIcon, AlertTitle, Box } from '@chakra-ui/react';
import React from 'react';

type Props = {
  title: string;
  message: string;
};

export const ErrorMessage: React.FC<Props> = ({ title, message }) => {
  return (
    <Alert status="error" fontSize="md">
      <AlertIcon />
      <Box flex="1">
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Box>
    </Alert>
  );
};
