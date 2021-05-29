import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCallback } from 'react';

import { GlobalParams } from '@types';
import useGlobalParams from '../useGlobalParams';
import usePlatformParams, { RouteParams } from '../usePlatformParams';
import { NavigationOptions, PlatformNavigation } from './types';

const isEmpty = (value?: string | number) =>
  value === '' || (value ?? null) === null;

export default function usePlatformNavigation<
  PathParams,
  AdditionalQueryParams
>(): PlatformNavigation<PathParams, AdditionalQueryParams> {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const currentParams = usePlatformParams<PathParams, AdditionalQueryParams>();
  const globalParams = useGlobalParams();
  const { push, setParams, goBack, replace } = navigation;

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

  const platformPush = useCallback(
    (
      path: string,
      params?: RouteParams<PathParams, AdditionalQueryParams>,
      options?: NavigationOptions
    ) => {
      const clearGlobalParams = options?.clearGlobalParams;
      const nextParams = _mergeGlobalParams(params, clearGlobalParams);
      push(path, nextParams);
    },
    [push, _mergeGlobalParams]
  );

  const platformReplace = useCallback(
    (
      path: string,
      params?: RouteParams<PathParams, AdditionalQueryParams>,
      options?: NavigationOptions
    ) => {
      const clearGlobalParams = options?.clearGlobalParams;
      const nextParams = _mergeGlobalParams(params, clearGlobalParams);
      replace(path, nextParams);
    },
    [replace, _mergeGlobalParams]
  );

  const platformSetParams = useCallback(
    (newParams, options) => {
      const clearAllParams = options?.clearAllParams;
      const clearGlobalParams = options?.clearGlobalParams;
      const params = _mergeParams(newParams, clearAllParams, clearGlobalParams);
      return setParams(params);
    },
    [setParams, _mergeParams]
  );

  return {
    push: platformPush,
    replace: platformReplace,
    pushParams: platformSetParams,
    replaceParams: platformSetParams,
    goBack,
  };
}
