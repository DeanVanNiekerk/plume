import React, { useEffect } from 'react';
import { useGeolocated } from 'react-geolocated';
import { useNavigate } from 'react-router-dom';
import { ContainerLayout } from './ContainerLayout';
import { getLocationPath } from './paths';

type Props = {
  pageName: string;
  layout?: React.FC<React.PropsWithChildren<unknown>>;
};

export const RouteWrapper: React.FC<React.PropsWithChildren<Props>> = ({
  layout: Layout = ContainerLayout,
  children,
}) => {
  const navigate = useNavigate();

  const { isGeolocationAvailable, isGeolocationEnabled, coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
  });

  useEffect(() => {
    console.log({
      isGeolocationAvailable,
      isGeolocationEnabled,
      coords,
    });
    if (!isGeolocationAvailable || !isGeolocationEnabled || !coords) navigate(getLocationPath());
  }, [isGeolocationAvailable, isGeolocationEnabled, coords]);

  return <Layout>{children}</Layout>;
};
