import { Enviroment } from './types';
import { Platform } from 'react-native';
import resolveEnv from './resolveEnv';

const nativeClients = {
  [Enviroment.DEV]: 'TODO: GET_DEV_KEY',
  [Enviroment.STAGING]: 'TODO: GET_STAGING_KEY',
  [Enviroment.PRE]: 'TODO: GET_PRE_KEY',
  [Enviroment.PROD]: 'TODO: GET_PROD_KEY',
};

const webClients = {
  [Enviroment.DEV]: 'TODO: GET_DEV_KEY',
  [Enviroment.STAGING]: 'TODO: GET_STAGING_KEY',
  [Enviroment.PRE]: 'TODO: GET_PRE_KEY',
  [Enviroment.PROD]: 'TODO: GET_PROD_KEY',
};

const mapping = Platform.select({
  default: nativeClients,
  web: webClients,
});

const resolveAuth0ClientId = (): string => {
  return process.env.REACT_NATIVE_AUTH0_CLIENT_ID || mapping[resolveEnv()];
};

export default resolveAuth0ClientId;
