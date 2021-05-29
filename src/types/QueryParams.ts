export enum GlobalContextParams {
  USER_ID = 'userId',
  PLAD_ID = 'pladId',
  EXAMPLE_QUERY_PARAM = 'exampleQueryParam',
}

export type GlobalParams = {
  [GlobalContextParams.USER_ID]?: string;
  [GlobalContextParams.PLAD_ID]?: string;
  [GlobalContextParams.EXAMPLE_QUERY_PARAM]?: string;
};

export type QueryParams = GlobalParams;

export type ExtendedQueryParams<T> = QueryParams & T;
