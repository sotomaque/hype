import { Auth0ContextInterface, useAuth0 } from '@auth0/auth0-react';

const useAuthWeb = (): Auth0ContextInterface => {
  const auth0 = useAuth0();
  return {
    ...auth0,
    logout: () => {
      auth0.logout({ federated: true, returnTo: window.location.origin });
    },
  };
};

export default useAuthWeb;
