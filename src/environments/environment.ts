import { typeorm } from './typeorm.enviroment';
import { mailerConfig } from './mailer.enviroment'

export const environment = {
  production: false,
  typeorm,
  mailerConfig,
};
