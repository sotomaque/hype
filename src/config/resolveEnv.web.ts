import { Enviroment } from './types';
import parseEnv from './parseEnv';

const mapping: { [key: string]: Enviroment } = {
  localhost: Enviroment.DEV,
  'TODO.subdomain: i.e. dev.eco.com': Enviroment.DEV,
  'TODO.subdomain: i.e. staging.eco.com': Enviroment.STAGING,
  'TODO.subdomain: i.e. pre.eco.com': Enviroment.PRE,
  'TODO.subdomain: i.e. eco.com': Enviroment.PROD,
};

const resolveEnv = (): Enviroment => {
  const env =
    process.env.REACT_NATIVE_ENVIROMENT?.toLowerCase() ||
    mapping[global.location.hostname] ||
    Enviroment.DEV;

  return parseEnv(env);
};

export default resolveEnv;
