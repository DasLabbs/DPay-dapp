import React, { lazy } from 'react';

import routes from './routes';

type Route = {
  path: string;
  title?: string;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  layout?: React.LazyExoticComponent<React.ComponentType<any>>;
};

const signUpPage: Route = {
  path: routes.SIGN_UP,
  title: 'Sign Up',
  component: lazy(() => import('../pages/sign-up')),
};

const homePage: Route = {
  path: routes.HOME,
  title: 'Home',
  component: lazy(() => import('../pages/home')),
  layout: lazy(() => import('../components/layouts/main-layout')),
};

const scanPage: Route = {
  path: routes.SCAN,
  title: 'Scan',
  component: lazy(() => import('../pages/scan')),
};

const historyPage: Route = {
  path: routes.HISTORY,
  title: 'History',
  component: lazy(() => import('../pages/history')),
  layout: lazy(() => import('../components/layouts/main-layout')),
};

const txStatusPage: Route = {
  path: routes.TX_STATUS,
  title: 'Transaction Status',
  component: lazy(() => import('../pages/tx-status')),
};

const profilePage: Route = {
  path: routes.PROFILE,
  title: 'Profile',
  component: lazy(() => import('../pages/profile')),
  layout: lazy(() => import('../components/layouts/main-layout')),
};

const publicRoutes: Route[] = [signUpPage];
const privateRoutes: Route[] = [homePage, scanPage, historyPage, txStatusPage, profilePage];

export { privateRoutes, publicRoutes };
