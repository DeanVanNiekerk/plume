import { useIpfsPinListQuery } from '@/hooks/queries/useIpfsPinListQuery';
import { Box } from '@chakra-ui/react';
import { GeolocationType, Map, MapStyle, Popup, config } from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { Feature, FeatureCollection } from 'geojson';
import React, { useEffect, useMemo, useRef } from 'react';

config.apiKey = 'axxigm7Qg7HBulWFQTBu';

const PHOTO_SOURCE_ID = 'photo_source';
const PHOTO_POINT_LAYER_ID = 'photo_point';
const PHOTO_HEATMAP_LAYER_ID = 'photo_heapmap';

export const MapView: React.FC = () => {
  const query = useIpfsPinListQuery();

  // const { position } = useCurrentPosition();

  const geojson = useMemo(() => {
    const features =
      query.data?.rows
        .filter((item) => item.metadata?.keyvalues?.latitude && item.metadata?.keyvalues?.longitude)
        .map((item) => {
          const feature: Feature = {
            type: 'Feature',
            properties: {
              thumbnail: `https://ivory-reasonable-earwig-410.mypinata.cloud/ipfs/${item.ipfs_pin_hash}?img-width=120&img-height=120`,
            },
            geometry: {
              type: 'Point',
              coordinates: [item.metadata?.keyvalues?.longitude ?? 0, item.metadata?.keyvalues?.latitude ?? 0],
            },
          };
          return feature;
        }) ?? [];

    const featureCollection: FeatureCollection = {
      type: 'FeatureCollection',
      features,
    };

    return featureCollection;
  }, [query.data?.rows]);

  const mapRef = useRef<Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mapRef.current) return; // stops map from intializing more than once

    if (!mapContainerRef.current) return;

    console.log('map2 init');

    mapRef.current = new Map({
      container: mapContainerRef.current,
      // https://docs.maptiler.com/sdk-js/api/map-styles/#mapstylelist
      style: MapStyle.BACKDROP.DARK,
      geolocate: GeolocationType.COUNTRY,
      attributionControl: {
        compact: true,
      },
    });
  }, [mapContainerRef.current]);

  // useEffect(() => {
  //   if (!position) return;
  //   console.log('map2 position', position);
  //   onMapReady(mapRef.current, (map) => {
  //     // console.log('map2 flyTo', position);
  //     // map.flyTo({ speed: 1.6, zoom: 16, center: { lat: position.latitude, lng: position.longitude } });
  //   });
  // }, [position, mapRef.current]);

  useEffect(() => {
    onMapReady(mapRef.current, (map) => {
      console.log('map2 geojson', geojson);

      if (map.getLayer(PHOTO_POINT_LAYER_ID)) map.removeLayer(PHOTO_POINT_LAYER_ID);
      if (map.getLayer(PHOTO_HEATMAP_LAYER_ID)) map.removeLayer(PHOTO_HEATMAP_LAYER_ID);
      if (map.getSource(PHOTO_SOURCE_ID)) map.removeSource(PHOTO_SOURCE_ID);

      map.addSource(PHOTO_SOURCE_ID, {
        type: 'geojson',
        data: geojson,
      });

      map.addLayer({
        id: PHOTO_HEATMAP_LAYER_ID,
        type: 'heatmap',
        source: PHOTO_SOURCE_ID,
        maxzoom: 14,
        paint: {
          // Increase the heatmap color weight weight by zoom level
          // heatmap-intensity is a multiplier on top of heatmap-weight
          'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 12, 3],

          // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
          // Begin color ramp at 0-stop with a 0-transparancy color
          // to create a blur-like effect.
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0,
            'rgba(68, 1, 84, 0)',
            0.01,
            'rgba(68, 1, 84, 0.2)',
            0.13,
            'rgba(71, 44, 122, 1)',
            0.25,
            'rgba(59, 81, 139, 1)',
            0.38,
            'rgba(44, 113, 142, 1)',
            0.5,
            'rgba(33, 144, 141, 1)',
            0.63,
            'rgba(39, 173, 129, 1)',
            0.75,
            'rgba(92, 200, 99, 1)',
            0.88,
            'rgba(170, 220, 50, 1)',
            1,
            'rgba(253, 231, 37, 1)',
          ],

          // Adjust the heatmap radius by zoom level
          'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, 9, 20],
          // Transition from heatmap to circle layer by zoom level
          'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 7, 1, 18, 0],
        },
      });

      map.addLayer({
        id: PHOTO_POINT_LAYER_ID,
        type: 'circle',
        source: PHOTO_SOURCE_ID,
        minzoom: 8,
        paint: {
          'circle-pitch-alignment': 'map',
          'circle-radius': 11,
          'circle-color': '#F3DFFF',
          // 'circle-stroke-color': '#bcb2c2',
          'circle-stroke-width': 0,
          // Transition from heatmap to circle layer by zoom level
          'circle-opacity': ['interpolate', ['linear'], ['zoom'], 8, 0, 12, 0.8],
        },
      });

      map.on('click', PHOTO_POINT_LAYER_ID, function (e) {
        const coordinates = (e.features?.[0].geometry as unknown as { coordinates: [number, number] }).coordinates // typing is wrong, manually cast
          ?.slice() as [number, number];
        const thumbnail = e.features?.[0].properties.thumbnail;

        console.log('map2 click props', e.features?.[0].properties);
        console.log('map2 click geometry', e.features?.[0].geometry);

        if (!coordinates || !thumbnail) return;

        // // Ensure that if the map is zoomed out such that multiple
        // // copies of the feature are visible, the popup appears
        // // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new Popup()
          .setLngLat(coordinates)
          .setHTML(`<img src="${thumbnail}" width="120px" height="120px" />`)
          .addTo(map);
      });

      // Change the cursor to a pointer when the mouse is over the places layer.
      map.on('mouseenter', PHOTO_POINT_LAYER_ID, function () {
        map.getCanvas().style.cursor = 'pointer';
      });

      // Change it back to a pointer when it leaves.
      map.on('mouseleave', PHOTO_POINT_LAYER_ID, function () {
        map.getCanvas().style.cursor = '';
      });
    });
  }, [geojson, mapRef.current]);

  return (
    <Box position="relative" w="full" h="full">
      <Box ref={mapContainerRef} position="absolute" w="full" h="full" />
    </Box>
  );
};

const onMapReady = async (map: Map | null, run: (map: Map) => void) => {
  if (!map) return;
  const loadedMap = await map.onLoadAsync();
  run(loadedMap);
};
