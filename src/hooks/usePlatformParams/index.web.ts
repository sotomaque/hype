import { useLocation, useParams } from 'react-router-dom';
import * as queryString from 'query-string';

import { EmptyObject, ExtendedQueryParams, RouteParams } from '../../types';

const usePlatformParams = <
  PathParams = EmptyObject,
  AdditionalQueryParams = EmptyObject
>(): RouteParams<PathParams, AdditionalQueryParams> => {
  const webLocation = useLocation();
  const queryParams = queryString.parse(
    webLocation.search
  ) as ExtendedQueryParams<AdditionalQueryParams>;
  const pathParams = useParams<PathParams>();
  const params = {
    ...pathParams,
    queryParams,
  };
  return params;
};

export default usePlatformParams;
