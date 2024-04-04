import React from 'react';
import { ContainerLayout } from './ContainerLayout';

type Props = {
  pageName: string;
  layout?: React.FC<React.PropsWithChildren<unknown>>;
};

export const RouteWrapper: React.FC<React.PropsWithChildren<Props>> = ({
  layout: Layout = ContainerLayout,
  children,
  // pageName,
}) => {
  // useWatchGrowthbook();

  // const navigate = useNavigate();

  // const { pathname, search } = useLocation();

  // const { authenticated } = usePrivy();

  // const userProfile = useStore(userProfileStore, (s) => s.userProfile);

  // const userOrganisations = useStore(organisationsStore, (s) => s.organisations);

  // const trackPage = useStore(analyticsStore, (s) => s.trackPage);

  // const activeOrganisation = useStore(organisationsStore, (s) => s.getActiveOrganisation());

  // const notAuthenticated = requireAuth && !authenticated;

  // const notAuthorized = !requirementMet(require, activeOrganisation);

  // const isLoading = notAuthenticated || notAuthorized;

  // useEffect(() => {
  //   trackPage(pageName, pathname, search);
  // }, [pageName]);

  // useEffect(() => {
  //   if (notAuthenticated) {
  //     navigate(StudioRoutes.signIn({ redirect: `${pathname}${search}` }));
  //   } else if (notAuthorized) {
  //     navigate(StudioRoutes.root());
  //   }
  // }, [notAuthenticated, pathname, search, notAuthorized]);

  // useEffect(() => {
  //   if (!authenticated || !userProfile) return;

  //   // if the user is already on the onboarding page, don't redirect them
  //   if (StudioRoutes.onboarding() === pathname) return;

  //   if (requiresOnboarding(activeOrganisation)) {
  //     navigate(StudioRoutes.onboarding());
  //   }
  // }, [authenticated, userProfile, userOrganisations, activeOrganisation]);

  // return <Layout>{isLoading ? <Loader /> : children}</Layout>;

  return <Layout>{children}</Layout>;
};
