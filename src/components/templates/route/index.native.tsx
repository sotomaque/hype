import React from 'react';
import { NavigationContainer, Route } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Login } from '@screens';
import routes, { defaultPath, findByPathname } from '@routes';
import {
  PrimaryRoutes,
  RenderRouteDefinition,
  RenderViewProperty,
  RouteDefinition,
} from '@types';
import Layout from '../layout';

const Stack = createStackNavigator();
const isViewRoute = (route: RouteDefinition) => 'View' in route;
const viewRoutes = routes.filter(isViewRoute) as RenderRouteDefinition[];

// gets the current screen from navigation state
function getCurrentRoute(
  stackRoute: Route<string>
): RenderRouteDefinition | undefined {
  if (!stackRoute) {
    return;
  }

  // The stack uses the pathname as the "name" of routes.
  const route = routes.find(findByPathname(stackRoute.name));
  return route;
}

// Enable hooks that need to be inside NavigationContainer in Route component
const withNavigationContainer =
  <P extends Record<string, unknown>>(Component: React.ComponentType<P>) =>
  (props: P): JSX.Element => {
    const routeNameRef = React.useRef(null);
    const navigationRef = React.useRef(null);
    const previousPrimaryRef =
      React.useRef<PrimaryRoutes | undefined | null>(null);

    return (
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          const currentRoute = navigationRef.current?.getCurrentRoute();
          previousPrimaryRef.current = getCurrentRoute(currentRoute)?.primary;
          routeNameRef.current = currentRoute;
        }}
        onStateChange={() => {
          const previousRouteName = routeNameRef.current;
          const currentRoute = navigationRef.current?.getCurrentRoute();
          const currentPrimaryRoute = getCurrentRoute(currentRoute)?.primary;
          if (
            previousRouteName !== currentRoute.name &&
            currentPrimaryRoute !== previousPrimaryRef.current
          ) {
          }

          // Save the current route name / primary route name for later comparision
          routeNameRef.current = currentRoute.name;
          previousPrimaryRef.current = currentPrimaryRoute;
        }}
      >
        <Component {...props} />
      </NavigationContainer>
    );
  };

// react-navigation doesn't seem to define the component render props
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ScreenProps = any;

const withLayout =
  (
    isAuthenticated: boolean,
    isLoading: boolean,
    ViewComponent: RenderViewProperty
  ) =>
  (props: ScreenProps) => {
    return isLoading ? null : !isAuthenticated ? (
      <Login />
    ) : (
      <Layout>
        <ViewComponent {...props} />
      </Layout>
    );
  };

const StackNavigator = () => {
  const isAuthenticated = true;
  const isLoading = false;

  return (
    <Stack.Navigator initialRouteName={defaultPath} headerMode="screen">
      {viewRoutes.map((route) => {
        return (
          <Stack.Screen
            name={route.path}
            options={{
              animationEnabled: false,
            }}
            key={route.path}
          >
            {withLayout(isAuthenticated, isLoading, route.View)}
          </Stack.Screen>
        );
      })}
    </Stack.Navigator>
  );
};

export default withNavigationContainer(StackNavigator);
