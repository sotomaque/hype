import { createContext, useCallback, useMemo, useRef, useState } from 'react';
import {
  Auth0ContextInterface,
  Auth0ProviderOptions,
} from '@auth0/auth0-react';
import * as ExpoAppAuth from 'expo-app-auth';
import jwtDecode from 'jwt-decode';

// import { useSecureStoreItem } from '@hooks';
import { UserIdentity } from '@types';
import useSecureStoreItem from 'src/hooks/useSecureStoreItem';
// import { trackLogin } from '@utils/analytics'

const AUTH0_ID_TOKEN_KEY = 'Auth0IdToken';
const AUTH0_REFRESH_TOKEN_KEY = 'Auth0RefreshToken';

const stub = () => {
  throw new Error('You forgot to wrap your component in <Auth0Provider>.');
};

const initialContext = {
  isAuthenticated: false,
  isLoading: false,
  getAccessTokenSilently: stub,
  getAccessTokenWithPopup: stub,
  getIdTokenClaims: stub,
  loginWithRedirect: stub,
  loginWithPopup: stub,
  logout: stub,
  buildAuthorizeUrl: stub,
  buildLogoutUrl: stub,
};

export const AuthContext = createContext<Auth0ContextInterface>(initialContext);

export const AuthProvider = ({
  audience,
  children,
  clientId,
  domain,
}: Auth0ProviderOptions): JSX.Element => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [accessTokenExpiresAt, setAccessTokenExpiresAt] =
    useState<Date | null>(null);
  const accessTokenRequest = useRef<Promise<string> | null>(null);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [idToken, updateIdToken] = useSecureStoreItem<UserIdentity | null>(
    AUTH0_ID_TOKEN_KEY,
    {
      initalValue: null,
    }
  );
  const [isLoading, setIsLoading] = useState(false);
  const [refreshToken, updateRefreshToken] = useSecureStoreItem<string>(
    AUTH0_REFRESH_TOKEN_KEY
  );

  const authRequestConfig = useMemo(
    () => ({
      additionalParameters: {
        audience,
        prompt: 'login',
      },
      clientId,
      issuer: `https://${domain}`,
      scopes: ['offline_access', 'email', 'openid', 'profile'],
      serviceConfiguration: {
        authorizationEndpoint: `https://${domain}/authorize`,
        revocationEndpoint: `https://${domain}/oauth/revoke`,
        tokenEndpoint: `https://${domain}/oauth/token`,
      },
    }),
    [audience, clientId, domain]
  );

  const handleTokenRequest = useCallback(
    async (request): Promise<string> => {
      const response = await request;
      setAccessToken(response.accessToken);
      setAccessTokenExpiresAt(new Date(response.accessTokenExpirationDate));
      await Promise.all([
        updateIdToken(jwtDecode(response.idToken)),
        updateRefreshToken(response.refreshToken),
      ]);
      accessTokenRequest.current = null;
      return response.accessToken;
    },
    [updateIdToken, updateRefreshToken]
  );
  const login = useCallback(async () => {
    setError(undefined);
    try {
      setIsLoading(true);
      const authRequest = handleTokenRequest(
        ExpoAppAuth.authAsync(authRequestConfig as ExpoAppAuth.OAuthProps)
      );
      accessTokenRequest.current = authRequest;
      // const token = await authRequest;
      // const decodedToken: UserIdentity = jwtDecode(token);
      // trackLogin(decodedToken, 'hard');
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }, [authRequestConfig, handleTokenRequest, setIsLoading]);
  const logout = useCallback(async () => {
    setAccessToken(null);
    await Promise.all([updateIdToken(null), updateRefreshToken('')]);
    await ExpoAppAuth.revokeAsync(authRequestConfig, {
      isClientIdProvided: true,
      token: refreshToken,
    });
    setError(undefined);
  }, [authRequestConfig, refreshToken, updateIdToken, updateRefreshToken]);
  const refreshAccessToken = useCallback(async () => {
    const refreshTokenRequest = handleTokenRequest(
      ExpoAppAuth.refreshAsync(
        authRequestConfig as ExpoAppAuth.OAuthProps,
        refreshToken
      )
    );
    accessTokenRequest.current = refreshTokenRequest;
    return refreshTokenRequest;
  }, [authRequestConfig, handleTokenRequest, refreshToken]);
  const getAccessToken = useCallback(async () => {
    if (accessTokenRequest.current) return accessTokenRequest.current;

    const accessTokenIsExpired =
      !accessTokenExpiresAt || Date.now() >= accessTokenExpiresAt.getTime();

    if (accessToken && !accessTokenIsExpired) {
      return accessToken;
    }

    if (!refreshToken)
      throw new Error('login required to request access token');

    return refreshAccessToken();
  }, [accessToken, accessTokenExpiresAt, refreshAccessToken, refreshToken]);

  return (
    <AuthContext.Provider
      value={{
        error,
        getAccessTokenSliently: getAccessToken,
        getAccessTokenWithPopup: getAccessToken,
        isAuthenticated: !!idToken,
        user: idToken,
        isLoading: idToken === undefined || isLoading,
        loginWithRedirect: login,
        loginWithPopup: login,
        logout,
        buildAuthorizedUrl: stub,
        buildLogoutUrl: stub,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
