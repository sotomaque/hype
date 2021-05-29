import { useRoute } from '@react-navigation/native';
import { useContext } from 'react';

import RoutesContext from './RoutesContext';
import { PlatformRoute } from './types';

const usePlatformRoute = (): PlatformRoute => {
  const routes = useContext(RoutesContext);
  const nativeRoute = useRoute();
  const currentRoute = routes.find(
    (route) => route.path === nativeRoute.name
  ) || {
    name: nativeRoute.name,
    path: nativeRoute.name,
    View: () => null,
  };
  return { currentRoute };
};

export default usePlatformRoute;
