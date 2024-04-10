import { Image } from '@/components/image/Image';
import { Loader } from '@/components/loader';
import { useIpfsPinListQuery } from '@/hooks/queries/useIpfsPinListQuery';
import { useCurrentPosition } from '@/hooks/utils/useCurrentPosition';
import React, { useEffect, useMemo } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

const DEFAULT_ZOOM = 16;
const IMAGE_MAX_SIZE = 70;

export const MapLeaflet: React.FC = () => {
  const query = useIpfsPinListQuery();

  const { position } = useCurrentPosition();

  const markers = useMemo(
    () =>
      query.data?.rows
        .filter((item) => item.metadata?.keyvalues?.latitude && item.metadata?.keyvalues?.longitude)
        .map((item) => {
          return {
            ...item,
            position: [item.metadata?.keyvalues?.latitude ?? 0, item.metadata?.keyvalues?.longitude ?? 0],
          };
        }) ?? [],
    [query.data?.rows],
  );

  if (!position) return <Loader />;

  return (
    <MapContainer
      center={[position.latitude, position.longitude]}
      zoom={DEFAULT_ZOOM}
      scrollWheelZoom={true}
      style={{ width: '100%', height: '100%' }}
    >
      <RecenterMap />
      <TileLayer
        attribution={'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}
        url={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
      />
      {markers.map((marker) => {
        const [latitude, longitude] = marker.position;
        return (
          <Marker key={marker.id} position={[latitude, longitude]}>
            <Popup>
              <Image
                src={`https://ivory-reasonable-earwig-410.mypinata.cloud/ipfs/${marker.ipfs_pin_hash}?img-width=${IMAGE_MAX_SIZE}&img-heigh=${IMAGE_MAX_SIZE}`}
                loaderProps={{ loaderSize: 'sm', py: 6 }}
              />
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

const RecenterMap: React.FC = () => {
  const map = useMap();

  const { position } = useCurrentPosition();

  useEffect(() => {
    if (position)
      map.flyTo([position.latitude, position.longitude], DEFAULT_ZOOM, {
        animate: false,
      });
  }, [position]);

  return null;
};
