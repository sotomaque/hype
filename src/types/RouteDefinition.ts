import { LazyExoticComponent } from 'react';

export enum PrimaryRoutes {
  Auth = 'auth',
  Home = 'home',
}

export enum AuthRoutes {
  Login = 'login',
  Onboarding = 'onboarding',
  Signup = 'signup',
}

export enum HomeRoutes {
  Dashboard = 'dashboard',
}

export type SecondaryRoutes = AuthRoutes | HomeRoutes;

type RenderFn = () => JSX.Element | null;

export type RenderViewProperty =
  | React.FC<unknown>
  | RenderFn
  | LazyExoticComponent<RenderFn>;

export interface RedirectRouteDefinition {
  path: string;
  redirectTo: string;
  primary?: PrimaryRoutes; // primary tab
  secondary?: SecondaryRoutes; // secondary tab
  allowAnonymous?: boolean;
  withoutLayout?: boolean;
}

export interface RenderRouteDefinition {
  path: string;
  name: string; // for analytics
  View: RenderViewProperty;
  primary?: PrimaryRoutes; // primary tab
  secondary?: SecondaryRoutes; // secondary tab
  allowAnonymous?: boolean;
  withoutLayout?: boolean;
}

export type RouteDefinition = RedirectRouteDefinition | RenderRouteDefinition;
