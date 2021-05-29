import { RouteParams } from './../../types';

export type NavigationOptions = {
  clearGlobalParams?: boolean;
  clearAllParams?: boolean;
};

export interface PlatformNavigation<PathParams, AdditionalQueryParams> {
  push: (
    path: string,
    params?: RouteParams<PathParams, AdditionalQueryParams>,
    options?: NavigationOptions
  ) => void;
  pushParams: (
    params: RouteParams<PathParams, AdditionalQueryParams>,
    options?: NavigationOptions
  ) => void;
  replace: (
    path: string,
    params?: RouteParams<PathParams, AdditionalQueryParams>,
    options?: NavigationOptions
  ) => void;
  replaceParams: (
    params: RouteParams<PathParams, AdditionalQueryParams>,
    options?: NavigationOptions
  ) => void;
  goBack: () => void;
}
