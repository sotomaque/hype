import { Enviroment } from './types';

const validEnvs = [
  Enviroment.DEV,
  Enviroment.STAGING,
  Enviroment.PRE,
  Enviroment.PROD,
];

export default function parseEnviroment(str: string): Enviroment {
  const lower = str.toLowerCase();
  const env = validEnvs.find((t) => t === lower);
  if (env) return env;

  throw new Error(`Invalid env res ${str} must be in [${validEnvs}]`);
}
