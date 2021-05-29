import { IdToken } from '@auth0/auth0-react';

export enum Claims {
  // universal
  EMAIL = 'email',
  NAME = 'name',
  NICKNAME = 'nickname',
  SESSION_ID = 'TODO.com/session_id',
  VERSION = 'TODO.com/version',
  COUNTRY = 'TODO.com/country',
  IS_IMPERSONATED = 'TODO.com/is_impersonated',
  // custom claims
  USER_ID = 'TODO.com/user_id',
}

export interface IdentityBase {
  [Claims.EMAIL]: string;
  [Claims.NAME]: string;
  [Claims.SESSION_ID]: string;
  [Claims.VERSION]: string;

  [Claims.IS_IMPERSONATED]?: boolean;
  [Claims.COUNTRY]?: string;
}

export interface User extends IdentityBase {
  [Claims.USER_ID]: string;
}

export type UserIdentity = IdentityBase | User | IdToken;
