import {
  Auth0Context,
  Auth0Provider,
  Auth0ProviderOptions,
} from '@auth0/auth0-react';

import React from 'react';

// import useLoginType from ''

export const AuthContext = Auth0Context;

export const AuthProvider = (props: Auth0ProviderOptions): JSX.Element => {
  const redirectUri = window.location.origin;
  // const [, setLoginType] = useLoginType();

  return (
    <Auth0Provider
      redirectUri={redirectUri}
      {...props}
      onRedirectCallback={(appState) => {
        // setLoginType('hard')
        window.history.replaceState(
          {},
          document.title,
          appState?.returnTo || redirectUri
        );
      }}
    />
  );
};
