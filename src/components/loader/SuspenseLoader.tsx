// import * as Sentry from '@sentry/react';
import React, { Suspense } from "react";
import { Loader } from "./Loader";
import { Box } from "@chakra-ui/react";
// import { LoaderErrorMessage } from './LoaderErrorMessage';

type Props = {
  fallback?: React.ReactNode;
};

export const SuspenseLoader: React.FC<React.PropsWithChildren<Props>> = ({
  fallback,
  children,
}) => {
  return (
    // <Sentry.ErrorBoundary fallback={<LoaderErrorMessage />} showDialog>
    <Suspense fallback={fallback ?? <FullLoader />}>{children}</Suspense>
    // </Sentry.ErrorBoundary>
  );
};

const FullLoader: React.FC = () => {
  return (
    <Box h={`calc(100vh)`}>
      <Loader />
    </Box>
  );
};
