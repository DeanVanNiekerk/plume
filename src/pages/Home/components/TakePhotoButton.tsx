import { ipfsPinListQueryKey } from '@/hooks/queries/useIpfsPinListQuery';
import { useOnFileChange } from '@/hooks/utils/useOnFileChange';
import { Box, Center, Icon, IconButton } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import { UploadImageDrawer } from './UploadImageDrawer';

export const TakePhotoButton: React.FC = () => {
  const client = useQueryClient();

  const ref = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);

  const onOpenCamera = (ev: React.MouseEvent) => {
    setFile(null);

    ev.preventDefault();
    ev.stopPropagation();

    setTimeout(() => {
      ref.current?.click();
    }, 100);
  };

  const onChange = useOnFileChange((files) => setFile(files[0]), 1);

  return (
    <>
      <UploadImageDrawer
        file={file}
        onClose={() => setFile(null)}
        onSuccess={() => {
          setFile(null);
          client.invalidateQueries({
            queryKey: [ipfsPinListQueryKey],
          });
        }}
      />
      <Box pt={2} zIndex={1} boxShadow="1px -15px 24px 15px rgba(23,23,23,1)">
        <Center w="full">
          <input
            ref={ref}
            id={`capture-image-input`}
            onChange={onChange}
            value={undefined}
            style={{ display: 'none' }}
            type="file"
            multiple={false}
            accept="image/*"
            capture="environment"
          />
          <IconButton
            size="xl"
            isRound={true}
            variant="solid"
            colorScheme="primary"
            aria-label="take-photo"
            fontSize="25px"
            icon={<Icon as={FaCamera} boxSize={7} />}
            onClick={onOpenCamera}
          />
        </Center>
      </Box>
    </>
  );
};
