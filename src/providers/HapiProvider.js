import Hapi from '@hapi/hapi';
import Configs from '../configs';
import { bind } from '../api/routes';
import logger from '../utils/Winston';
import AuthPlugin from '../plugins/AuthPlugin';
import SwaggerPlugin from '../plugins/SwaggerPlugin';

export default class HapiProvider {
  constructor() {
    this.port = process.env.APP_PORT || Configs.getServerConfigs().port;
    this.host = process.env.APP_HOST || Configs.getServerConfigs().host;
  }

  /**
   * Setting initial feature and plugins
   */
  setting(server) {
    const routes = bind(server);
    Promise.all(routes);
  }

  // eslint-disable-next-line consistent-return
  async register() {
    try {
      const server = new Hapi.Server({
        host: this.host,
        port: this.port,
        routes: {
          cors: {
            origin: ['*'],
          },
          validate: {
            failAction: (request, h, err) => {
              err.output.payload.details = err.details;
              throw err;
            },
          },
        },
      });

      await new AuthPlugin().register(server);
      await new SwaggerPlugin().register(server);
      await this.setting(server);
      logger.info('> Hapi OK');
      return server;
    } catch (error) {
      logger.error('Hapi provider error: ', error);
    }
  }
}
