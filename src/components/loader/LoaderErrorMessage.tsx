import React from 'react';
import { ErrorMessage } from '../error';

type Props = {
  title?: string;
  message?: string;
};

export const LoaderErrorMessage: React.FC<Props> = ({ title, message }) => {
  return (
    <ErrorMessage
      title={title || `Error`}
      message={message || `An unexpected error occurred, please reload the page`}
    />
  );
};
