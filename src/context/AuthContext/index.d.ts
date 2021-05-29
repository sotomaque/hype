import {
  Auth0ContextInterface,
  Auth0ProviderOptions,
} from '@auth0/auth0-react';

export declare const AuthContext: React.Context<Auth0ContextInterface>;
export declare function AuthProvider(props: Auth0ProviderOptions): JSX.Element;
