import { PlatformNavigation } from './types';

declare function usePlatformNavigation<
  PathParams,
  AdditionalQueryParams
>(): PlatformNavigation<PathParams, AdditionalQueryParams>;

export default usePlatformNavigation;
