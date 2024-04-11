import { Loader } from '@/components/loader';
import { Position } from '@/schema';
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
  coords: GeolocationCoordinates | null;
};

export const UploadImageDrawer: React.FC<Props> = ({ file, onClose, onSuccess, coords }) => {
  const isOpen = !!file;

  const toast = useToast();

  const [isSaving, setIsSaving] = useBoolean();

  const [url, setUrl] = useState<string | null>(null);

  const [position, setPosition] = useState<Position | null>(null);

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

      setPosition(null);

      const tags = await ExifReader.load(file, { expanded: true });

      const result = Position.safeParse({
        latitude: tags.gps?.Latitude,
        longitude: tags.gps?.Longitude,
      });

      if (result.success) {
        setPosition(result.data);
      }

      console.log('EXIF Data:', tags);
      console.log('coords:', coords);
    };
    load();
  }, [file]);

  const save = async () => {
    if (!file) return;

    setIsSaving.on();

    try {
      let finalPosition = position;
      let finalAccuracy = 0;

      if (!finalPosition && coords) {
        finalPosition = {
          latitude: coords.latitude,
          longitude: coords.longitude,
        };
        finalAccuracy = coords.accuracy;
      }

      if (!finalPosition) {
        toast({
          title: 'Failed to get location browser or from EXIF data',
          status: 'error',
        });
        return;
      }

      if (finalAccuracy > 100) {
        toast({
          title: `Accuracy on location is not low enough. Accuracy: ${Math.round(finalAccuracy)}m, should  100m or less.`,
          status: 'error',
        });
        return;
      }

      const response = await uploadToIpfs(file, finalPosition, finalAccuracy);

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
