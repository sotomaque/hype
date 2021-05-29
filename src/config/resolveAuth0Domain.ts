import resolveEnv from './resolveEnv';
import { Enviroment } from './types';

export const mapping = {
  [Enviroment.DEV]: 'auth.dev.eco.com',
  [Enviroment.STAGING]: 'auth.staging.eco.com',
  [Enviroment.PRE]: 'auth.pre.eco.com',
  [Enviroment.PROD]: 'auth.eco.com',
};

const resolveAuth0Domain = (): string => {
  return process.env.REACT_NATIVE_AUTH0_DOMAIN || mapping[resolveEnv()];
};

export default resolveAuth0Domain;
