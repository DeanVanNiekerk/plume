import { useIpfsPinListQuery } from '@/hooks/queries/useIpfsPinListQuery';
import { useCurrentPosition } from '@/hooks/utils/useCurrentPosition';
import { Box } from '@chakra-ui/react';
import { GeolocationType, Map, MapStyle, Marker, Popup, config } from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import React, { useEffect, useMemo, useRef } from 'react';

config.apiKey = 'axxigm7Qg7HBulWFQTBu';

export const MapView: React.FC = () => {
  const query = useIpfsPinListQuery();

  const { position } = useCurrentPosition();

  const photos = useMemo(
    () =>
      query.data?.rows
        .filter((item) => item.metadata?.keyvalues?.latitude && item.metadata?.keyvalues?.longitude)
        .map((item) => {
          return {
            ...item,
            latitude: item.metadata?.keyvalues?.latitude ?? 0,
            longitude: item.metadata?.keyvalues?.longitude ?? 0,
          };
        }) ?? [],
    [query.data?.rows],
  );

  const map = useRef<Map | null>(null);
  const mapContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    if (!mapContainer.current) return;

    console.log('map2 init');

    map.current = new Map({
      container: mapContainer.current,
      // https://docs.maptiler.com/sdk-js/api/map-styles/#mapstylelist
      style: MapStyle.BACKDROP.DARK,
      geolocate: GeolocationType.COUNTRY,
      attributionControl: {
        compact: true,
      },
    });
  }, [mapContainer.current]);

  useEffect(() => {
    setTimeout(() => {
      if (!map.current || !position) return;
      console.log('map2 flyTo', position);
      map.current.flyTo({ speed: 1.6, zoom: 16, center: { lat: position.latitude, lng: position.longitude } });
    }, 500);
  }, [position, map.current]);

  useEffect(() => {
    if (!map.current) return;

    const markers = photos.map((photo) => {
      if (!map.current) throw new Error('Map is not initialized');

      const popup = new Popup();
      popup.setHTML(
        `<img src="https://ivory-reasonable-earwig-410.mypinata.cloud/ipfs/${photo.ipfs_pin_hash}?img-width=120&img-height=120" />`,
      );

      const marker = new Marker();
      marker.setLngLat([photo.longitude, photo.latitude]);
      marker.addTo(map.current);
      marker.setPopup(popup);

      console.log('map2 marker', photo);
      return marker;
    });

    return () => {
      console.log('map2 cleanup');
      markers.forEach((marker) => marker.remove());
    };
  }, [photos]);

  return (
    <Box position="relative" w="full" h="full">
      <Box ref={mapContainer} position="absolute" w="full" h="full" />
    </Box>
  );
};
