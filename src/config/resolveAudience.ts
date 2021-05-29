import resolveEnv from './resolveEnv';
import { Enviroment } from './types';

export const mapping = {
  [Enviroment.DEV]: 'eco-dev',
  [Enviroment.STAGING]: 'eco-staging',
  [Enviroment.PRE]: 'eco-pre',
  [Enviroment.PROD]: 'eco-prod',
};

const resolveAuth0Audience = (): string => {
  return process.env.REACT_NATIVE_AUTH0_AUDIENCE || mapping[resolveEnv()];
};

export default resolveAuth0Audience;
