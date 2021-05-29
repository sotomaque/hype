import { RouteParams, GlobalContextParams, GlobalParams } from '@types';
import usePlatformParams from '../usePlatformParams';

const useGlobalParams = (): RouteParams<
  Record<string, string | GlobalParams>,
  GlobalParams
> => {
  const params =
    usePlatformParams<Record<string, string | GlobalParams>, GlobalParams>();
  const newQueryParams: GlobalParams = {};

  Object.values(GlobalContextParams).forEach((p) => {
    const paramValue = params.queryParams[p];
    if (paramValue) {
      newQueryParams[p] = paramValue;
    }
  });

  return { ...params, queryParams: newQueryParams };
};

export default useGlobalParams;
