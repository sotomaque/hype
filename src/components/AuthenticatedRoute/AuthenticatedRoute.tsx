import React, { useEffect } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import { Login } from '@screens';
import { useAuth, useLoginType } from '@hooks';
import { UserIdentity } from '@types';

const AuthenticatedRoute = (props: RouteProps): JSX.Element | null => {
  const { isAuthenticated, isLoading, user = {}, getIdTokenClaims } = useAuth();
  // const [loginType, setLoginType] = useLoginType();
  console.log('isAuthenticated', isAuthenticated);
  console.log('isLoading', isLoading);
  console.log('user', user);
  useEffect(() => {
    (async function getClaims() {
      // if (!loginType) return;

      const claims = await getIdTokenClaims();

      if (user && isAuthenticated && claims && claims.__raw) {
        const decoded: UserIdentity = jwtDecode(claims.__raw);
        // trackLogin(decoded, loginType);
        // setLoginType(undefined);
      }
    })();
  }, [isAuthenticated]);

  if (isLoading) return null;
  if (!isAuthenticated) return <Login />;
  return <Route {...props} />;
};

export default AuthenticatedRoute;
