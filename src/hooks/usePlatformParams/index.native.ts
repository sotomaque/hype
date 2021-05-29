import { Route, useRoute } from '@react-navigation/native';

import { EmptyObject, RouteParams } from '../../types';

const usePlatformParams = <
  PathParams = EmptyObject,
  AdditionalQueryParams = EmptyObject
>(): RouteParams<PathParams, AdditionalQueryParams> => {
  const nativeRoute =
    useRoute<Route<string, RouteParams<PathParams, AdditionalQueryParams>>>();
  const params = {
    ...(nativeRoute?.params ?? {}),
    queryParams: {
      ...nativeRoute?.params?.queryParams,
    },
  };
  return params as RouteParams<PathParams, AdditionalQueryParams>;
};

export default usePlatformParams;
