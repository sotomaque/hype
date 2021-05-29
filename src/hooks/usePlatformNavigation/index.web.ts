import { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router';

import { RouteParams, GlobalParams } from '@types';
import useGlobalParams from '../useGlobalParams';
import usePlatformParams from '../usePlatformParams';
import { getPathAndQueryString } from '../../utils/paths';
import { NavigationOptions, PlatformNavigation } from './types';

const isEmpty = (value?: string | number) =>
  value === '' || (value ?? null) === null;

export default function usePlatformNavigation<
  PathParams,
  AdditionalQueryParams
>(): PlatformNavigation<PathParams, AdditionalQueryParams> {
  const currentParams = usePlatformParams<PathParams, AdditionalQueryParams>();
  const globalParams = useGlobalParams();
  const webLocation = useLocation();
  const currentPath = webLocation.pathname;
  const history = useHistory();
  const { goBack } = history;

  const _mergeGlobalParams = useCallback(
    (params, clearGlobalParams) => {
      const nextParams = {
        queryParams: {
          ...(clearGlobalParams ? {} : globalParams.queryParams),
          ...params?.queryParams,
        },
      } as RouteParams<PathParams, GlobalParams>;
      return nextParams;
    },
    [globalParams]
  );

  const _mergeParams = useCallback(
    (params, clearAllParams, clearGlobalParams) => {
      const mergedParams = Object.assign({}, currentParams, params);
      mergedParams.queryParams = {
        ...(clearAllParams ? {} : currentParams.queryParams),
        ...(clearGlobalParams ? {} : globalParams?.queryParams),
        ...params.queryParams,
      };
      const queryParams: any = mergedParams.queryParams;
      Object.entries(params.queryParams || {}).forEach(([key, value]) => {
        if (isEmpty(value as string | number | undefined)) {
          delete queryParams[key];
          return;
        }
        queryParams[key] = value;
      });
      return mergedParams;
    },
    [currentParams, globalParams]
  );

  const push = useCallback(
    (
      path: string,
      params?: RouteParams<PathParams, AdditionalQueryParams>,
      options?: NavigationOptions
    ) => {
      const clearGlobalParams = options?.clearGlobalParams;
      const nextParms = _mergeGlobalParams(params, clearGlobalParams);
      const newPath = getPathAndQueryString(path, nextParms);
      history.push(newPath, nextParms);
    },
    [history, _mergeGlobalParams]
  );

  const replace = useCallback(
    (
      path: string,
      params?: RouteParams<PathParams, AdditionalQueryParams>,
      options?: NavigationOptions
    ) => {
      const clearGlobalParams = options?.clearGlobalParams;
      const nextParms = _mergeGlobalParams(params, clearGlobalParams);
      const newPath = getPathAndQueryString(path, nextParms);
      history.replace(newPath, nextParms);
    },
    [history, _mergeGlobalParams]
  );

  const replaceParams = useCallback(
    (
      params: RouteParams<PathParams, AdditionalQueryParams>,
      options?: NavigationOptions
    ) => {
      const clearAllParams = options?.clearAllParams;
      const clearGlobalParams = options?.clearGlobalParams;
      const mergedParams = _mergeParams(
        params,
        clearAllParams,
        clearGlobalParams
      );
      const newPath = getPathAndQueryString(currentPath, mergedParams);
      history.replace(newPath, params);
    },
    [currentPath, _mergeParams, history]
  );

  const pushParams = useCallback(
    (
      params: RouteParams<PathParams, AdditionalQueryParams>,
      options?: NavigationOptions
    ) => {
      const clearAllParams = options?.clearAllParams;
      const clearGlobalParams = options?.clearGlobalParams;
      const mergedParams = _mergeParams(
        params,
        clearAllParams,
        clearGlobalParams
      );
      const newPath = getPathAndQueryString(currentPath, mergedParams);
      history.push(newPath, mergedParams);
    },
    [currentPath, _mergeParams, history]
  );

  return {
    push,
    replace,
    replaceParams,
    pushParams,
    goBack,
  };
}
