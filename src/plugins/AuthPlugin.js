import HapiAuthJwt2 from 'hapi-auth-jwt2';
import logger from '../utils/Winston';
import Configs from '../configs';

const serverConfigs = Configs.getServerConfigs();
export default class AuthPlugin {
  async setAuthStrategy(server, { config, validate }) {
    server.auth.strategy('jwt', 'jwt', {
      validate,
      key: process.env.JWT_SECRET || config.jwtSecret,
      verifyOptions: {
        algorithms: ['HS256'],
      },
    });

    server.auth.default('jwt');
  }

  async register(server) {
    /**
     * Validate user
     */
    try {
      const validateUser = async () => ({ isValid: true });
      await server.register(HapiAuthJwt2);

      await this.setAuthStrategy(server, {
        config: serverConfigs,
        validate: validateUser,
      });
      logger.info('> Authorization Plugin OK');
    } catch (error) {
      logger.error('Error registering hapi-auth-jwt2 plugin : ', error);
    }
  }
}
