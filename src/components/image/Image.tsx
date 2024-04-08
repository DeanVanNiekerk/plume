import { Box, Center, Image as ImageChakra, ImageProps, useBoolean } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { Loader, LoaderProps } from '../loader';

type Props = ImageProps & {
  loaderProps?: LoaderProps;
};

export const Image: React.FC<Props> = ({ loaderProps, ...props }) => {
  const [isLoading, setIsLoading] = useBoolean(true);
  const [hasError, setHasError] = useBoolean(false);

  const fallback = useMemo(() => {
    if (isLoading) {
      return <Loader loaderSize="lg" py={16} {...loaderProps} />;
    } else if (hasError) {
      return <ErrorOverlay />;
    }
    return undefined;
  }, [isLoading, hasError]);

  return (
    <ImageChakra
      h="full"
      w="full"
      onLoad={setIsLoading.off}
      onError={() => {
        setIsLoading.off();
        setHasError.on();
      }}
      fallback={fallback}
      {...props}
    />
  );
};

const ErrorOverlay: React.FC = () => {
  return (
    <Box position="absolute" zIndex={100} w="full" h="full" backgroundColor="gray.50">
      <Center h="full" w="full" color="error">
        Error
      </Center>
    </Box>
  );
};
