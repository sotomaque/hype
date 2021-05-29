import Constants from 'expo-constants';

import parseEnv from './parseEnv';
import { Enviroment } from './types';

const resolveEnv = (): Enviroment => {
  // TODO: Block dev if __dev__
  const env =
    process.env.REACT_NATIVE_ENVIROMENT?.toLowerCase() ||
    (__DEV__ && Enviroment.DEV) ||
    Constants.manifest.releaseChannel?.toLowerCase() ||
    Enviroment.DEV;

  return parseEnv(env);
};

export default resolveEnv;
