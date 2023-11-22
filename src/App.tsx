import React from 'react';
import {useRoutes } from 'react-router-dom';
import {routes} from "./globals/routing/routes";

const App = () => {
  const renderRoutes = useRoutes(routes);

  return (
      <>
        {renderRoutes}
      </>
  );
}
export default App;
