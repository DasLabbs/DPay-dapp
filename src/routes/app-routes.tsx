import React from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PrivateRoute from './private-route';
import { privateRoutes, publicRoutes } from '.';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <main className="flex h-dvh w-dvw justify-center bg-[linear-gradient(33deg,#004CAD_31.46%,#1166D5_91.7%)]">
        <div id="container" className="relative flex h-full w-full overflow-hidden bg-white sm:max-w-[414px]">
          <Routes>
            {publicRoutes.map((route) => {
              const Component = route.component;
              return <Route key={route.path} path={route.path} element={<Component />} />;
            })}

            <Route element={<PrivateRoute />}>
              {privateRoutes.map((route) => {
                const Component = route.component;
                const Layout = route.layout || React.Fragment;
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={
                      <Layout>
                        <Component />
                      </Layout>
                    }
                  />
                );
              })}
            </Route>
          </Routes>
        </div>
      </main>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            fontSize: '14px',
          },
        }}
      />
    </BrowserRouter>
  );
};

export default AppRoutes;
