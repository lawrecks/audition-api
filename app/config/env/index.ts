/* eslint-disable @typescript-eslint/no-explicit-any */
import rootPath from 'app-root-path';
import development from './development';
import test from './test';

interface Environment {
  rootPath?: rootPath;
  PORT?: string;
  NODE_ENV?: string;
  HOST?: string;
  API_VERSION?: string;
}

const { APP_PORT: PORT, NODE_ENV } = process.env;

// Set current environmental variables based on the current environment
const currentEnv: any = {
  development,
  test,
}[NODE_ENV || 'development'];

const envs: Environment = {
  rootPath,
  PORT,
  NODE_ENV,
  ...currentEnv,
};

export default envs;
