import { Position } from '@/schema';
import { useEffect, useState } from 'react';
import { useGeolocated } from 'react-geolocated';

export const useCurrentPosition = () => {
  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
  });

  const [position, setPosition] = useState<Position | null>(null);

  // const ipapiQuery = useQuery({
  //   queryKey: ['ipapi-location'],
  //   queryFn: async () => {
  //     const result = await fetch('https://ipapi.co/json');
  //     const data = await result.json();
  //     return data;
  //   },
  // });

  // useEffect(() => {
  //   if (!position && ipapiQuery.data) {
  //     // console.log('Setting locatidon from ipapi', ipapiQuery.data);
  //     setPosition({
  //       longitude: ipapiQuery.data.longitude,
  //       latitude: ipapiQuery.data.latitude,
  //     });
  //   }
  // }, [position, ipapiQuery.data]);

  useEffect(() => {
    if (coords) {
      setPosition(() => {
        // if (oldPosition) return oldPosition;
        console.log('Setting location from geolocation', coords);
        return {
          longitude: coords.longitude,
          latitude: coords.latitude,
        };
      });
    }
  }, [coords]);

  return {
    position,
  };
};
