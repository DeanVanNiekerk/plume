import { SuspenseLoader } from '@/components/loader/SuspenseLoader';
import React, { lazy } from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { RouteWrapper } from './RouteWrapper';
import { getHomePath } from './paths';

const HomePage = lazy(() => import('@/pages/Home/HomePage'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route
        path={getHomePath()}
        element={
          <RouteWrapper pageName="home">
            <HomePage />
          </RouteWrapper>
        }
      />
      <Route
        path="*"
        element={
          <RouteWrapper pageName="not-found">
            <HomePage />
          </RouteWrapper>
        }
      />
    </Route>,
  ),
);

export const AppRoutes: React.FC = () => {
  return (
    <SuspenseLoader>
      <RouterProvider router={router} />
    </SuspenseLoader>
  );
};
