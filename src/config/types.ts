export enum Enviroment {
  DEV = 'dev',
  STAGING = 'staging',
  PRE = 'pre',
  PROD = 'prod',
}

export type ResolveEnv = () => Enviroment;
