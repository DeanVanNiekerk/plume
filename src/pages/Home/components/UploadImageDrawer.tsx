import { Loader } from '@/components/loader';
import { uploadToIpfs } from '@/utils/ipfs';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Image,
  useBoolean,
  useToast,
} from '@chakra-ui/react';
import ExifReader from 'exifreader';
import React, { useEffect, useState } from 'react';

type Props = {
  file: File | null;
  onClose: () => void;
  onSuccess: () => void;
};

export const UploadImageDrawer: React.FC<Props> = ({ file, onClose, onSuccess }) => {
  const isOpen = !!file;

  const toast = useToast();

  const [isSaving, setIsSaving] = useBoolean();
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  useEffect(() => {
    const load = async () => {
      if (!file) return;
      const tags = await ExifReader.load(file);
      console.log('EXIF Data:', tags);
    };
    load();
  }, [file]);

  const save = async () => {
    if (!file) return;

    setIsSaving.on();

    try {
      const response = await uploadToIpfs(file);
      if (response) {
        toast({
          title: 'Success!',
          status: 'success',
        });
        onSuccess();
      } else {
        toast({
          title: 'Failed to upload to IPFS',
          status: 'error',
        });
      }
    } finally {
      setIsSaving.off();
    }
  };

  return (
    <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Upload Photo</DrawerHeader>

        <DrawerBody>
          <Box h="full" w="full">
            {!url && <Loader />}
            {url && (
              <Box borderRadius="md" overflow="hidden">
                <Image w="full" src={url} />
              </Box>
            )}
          </Box>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose} isDisabled={isSaving}>
            Cancel
          </Button>
          <Button colorScheme="primary" onClick={save} isLoading={isSaving}>
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
