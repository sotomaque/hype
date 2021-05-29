import { ExtendedQueryParams, RouteParams } from '../types';

function getProperty(params: RouteParams<unknown, unknown>, key: string) {
  return (params as any)[key] || '';
}

export const getPathFromParams = <PathParams, AdditionalQueryParams>(
  path: string,
  params?: RouteParams<PathParams, AdditionalQueryParams>
): string => {
  if (!params) return path;

  const parsedPath = path
    .split('/')
    .map((segment) => {
      const matchParam = segment.match(/^:(.*)$/);
      if (!matchParam) return segment;
      return getProperty(params, matchParam[1]);
    })
    .join('/');

  return parsedPath;
};

export const getPathQueryString = <AdditionalQueryParams>(
  queryParams: ExtendedQueryParams<AdditionalQueryParams>
): string => {
  if (!queryParams || typeof queryParams !== 'object') return '';
  const queryStrings = Object.entries(queryParams).map(
    ([key, value]) => `${key}=${value}`
  );
  return queryStrings.length ? `?${queryStrings.join('&')}` : '';
};

export const getPathAndQueryString = <PathParams, AdditionalQueryParams>(
  path: string,
  params?: RouteParams<PathParams, AdditionalQueryParams>
): string => {
  const newPath = getPathFromParams(path, params);
  const newQueryString = params ? getPathQueryString(params.queryParams) : '';
  return `${newPath}${newQueryString}`;
};
