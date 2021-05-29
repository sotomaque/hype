import React from 'react';
import {
  BrowserRouter,
  Redirect,
  Route as DomRoute,
  RouteProps,
  Switch,
} from 'react-router-dom';

import routes from '@routes';
import { RenderRouteDefinition } from '@types';
import Layout from '../layout';
import AuthenticatedRoute from '@components/AuthenticatedRoute';
import View404 from '@components/404';

/**
 * HOC
 *
 * wraps child with BrowserRouter
 *
 * @param Component
 */
export const withBrowserRouter =
  <P extends Record<string, unknown>>(Component: React.ComponentType<P>) =>
  (props: P): JSX.Element =>
    (
      <BrowserRouter>
        <Component {...props} />
      </BrowserRouter>
    );

/**
 * Function takes route and routeProps
 *
 * will conditionally (and by default) wrap route
 * with Layout component
 *
 * to disable set route.withoutLayout to true
 *
 * @param route
 * @param routeProps
 */
const renderRoute = (route: RenderRouteDefinition, routeProps: RouteProps) =>
  route?.withoutLayout ? (
    React.createElement(route.View, routeProps)
  ) : (
    <Layout>{React.createElement(route.View, routeProps)}</Layout>
  );

/**
 * HOC
 *
 * can be used for analytics
 *
 * @param Component
 */
export const withTracking =
  <P extends Record<string, unknown>>(Component: React.ComponentType<P>) =>
  (props: P): JSX.Element => {
    // const location = useLocation();
    // const route = useMemo(
    //   () => routes.find(findByPathname(location.pathname)),
    //   [location.pathname]
    // );

    // TODO: ANALYTICS
    // console.log('in withTracking', route);

    return <Component {...props} />;
  };

/**
 * Potentially Filter Routes
 *
 * map over routes and return a DomRoute element for each one
 *
 */
const Route = () => {
  console.log('routes', routes);
  return (
    <Switch>
      {routes.map((route) =>
        'redirectTo' in route ? (
          <Redirect from={route.path} to={route.redirectTo} key={route.path} />
        ) : route.allowAnonymous ? (
          <DomRoute
            exact
            path={route.path}
            key={route.path}
            render={(routeProps) =>
              renderRoute(route as RenderRouteDefinition, routeProps)
            }
          />
        ) : (
          <AuthenticatedRoute
            exact
            path={route.path}
            key={route.path}
            render={(routeProps) =>
              renderRoute(route as RenderRouteDefinition, routeProps)
            }
          />
        )
      )}
      <DomRoute component={View404} />
    </Switch>
  );
};

export default withBrowserRouter(withTracking(Route));
