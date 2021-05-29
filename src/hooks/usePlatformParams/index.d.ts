import { RouteParams } from './../../types';

export { RouteParams };

declare function usePlatformParams<
  PathParms,
  AdditionalQueryParams
>(): RouteParams<PathParams, AdditionalQueryParams>;

export default usePlatformParams;
