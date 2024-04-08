import { Position } from '@/schema';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useGeolocated } from 'react-geolocated';

export const useCurrentPosition = () => {
  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
  });

  const [position, setPosition] = useState<Position | null>(null);

  const ipapiQuery = useQuery({
    queryKey: ['ipapi-location'],
    queryFn: async () => {
      const result = await fetch('https://ipapi.co/json');
      const data = await result.json();
      return data;
    },
  });

  useEffect(() => {
    if (!position && ipapiQuery.data) {
      // console.log('Setting locatidon from ipapi', ipapiQuery.data);
      setPosition({
        longitude: ipapiQuery.data.longitude,
        latitude: ipapiQuery.data.latitude,
      });
    }
  }, [position, ipapiQuery.data]);

  useEffect(() => {
    if (coords) {
      // console.log('Setting location from geolocation', coords);
      setPosition({
        longitude: coords.longitude,
        latitude: coords.latitude,
      });
    }
  }, [coords]);

  return {
    position,
  };
};
