import { Home, Onboarding, Login, Signup } from '@screens';
import {
  RouteDefinition,
  PrimaryRoutes,
  RenderRouteDefinition,
  HomeRoutes,
} from '../types';

const defaultPath = '/';

const routes: RouteDefinition[] = [
  // DEFAULT
  {
    path: '/index.html',
    redirectTo: defaultPath,
  },
  // AUTH ROUTES
  {
    path: '/onboarding',
    name: 'Onboarding',
    primary: PrimaryRoutes.Auth,
    View: Onboarding,
    allowAnonymous: true,
  },
  {
    path: '/login',
    name: 'Login',
    primary: PrimaryRoutes.Auth,
    View: Login,
    allowAnonymous: true,
  },
  {
    path: '/signup',
    name: 'Signup',
    primary: PrimaryRoutes.Auth,
    View: Signup,
    allowAnonymous: true,
  },
  // HOME ROUTES
  {
    path: '/',
    name: 'HomeScreen',
    primary: PrimaryRoutes.Home,
    secondary: HomeRoutes.Dashboard,
    View: Home,
  },
];

const findByPathname =
  (pathname = '/') =>
  (r: RouteDefinition): r is RenderRouteDefinition => {
    // ignore redirects
    if ('redirectTo' in r) return false;

    return r.path === pathname;
  };

export default routes;
export { defaultPath, findByPathname };
