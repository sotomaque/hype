import { ExtendedQueryParams } from './QueryParams';

export type RouteParams<PathParams, AdditionalQueryParams> = PathParams & {
  queryParams: ExtendedQueryParams<AdditionalQueryParams>;
};
