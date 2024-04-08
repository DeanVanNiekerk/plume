import React from 'react';
import { ContainerLayout } from './ContainerLayout';

type Props = {
  pageName: string;
  layout?: React.FC<React.PropsWithChildren<unknown>>;
};

export const RouteWrapper: React.FC<React.PropsWithChildren<Props>> = ({
  layout: Layout = ContainerLayout,
  children,
}) => {
  return <Layout>{children}</Layout>;
};
