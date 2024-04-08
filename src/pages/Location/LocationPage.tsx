import { getHomePath } from '@/routes/paths';
import { Center, Heading, Text, VStack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useGeolocated } from 'react-geolocated';
import { useNavigate } from 'react-router-dom';

const LocationPage: React.FC = () => {
  const navigate = useNavigate();

  const { isGeolocationAvailable, isGeolocationEnabled, coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
  });

  useEffect(() => {
    if (isGeolocationAvailable && isGeolocationEnabled && !!coords) navigate(getHomePath());
  }, [isGeolocationAvailable, isGeolocationEnabled, coords]);

  return (
    <Center h="full">
      <VStack>
        <Heading size="xl">Let&apos;s put you on the map</Heading>
        <Text fontSize="lg" pb={12}>
          Enable location on your device
        </Text>
      </VStack>
    </Center>
  );
};

export default LocationPage;
