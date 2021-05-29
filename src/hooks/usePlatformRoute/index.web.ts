import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

import RoutesContext from './RoutesContext';
import { PlatformRoute } from './types';

const usePlatformRoute = (): PlatformRoute => {
  const routes = useContext(RoutesContext);
  const webLocation = useLocation();

  const currentRoute = routes.find(
    (route) => route.path === webLocation.pathname
  ) || {
    path: webLocation.pathname,
    name: '',
    View: () => null,
  };

  return { currentRoute };
};

export default usePlatformRoute;
