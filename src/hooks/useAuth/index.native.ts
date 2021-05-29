import { useContext } from 'react';
import { Auth0Context, Auth0ContextInterface } from '@auth0/auth0-react';

const useAuthNative = (): Auth0ContextInterface => useContext(Auth0Context);

export default useAuthNative;
