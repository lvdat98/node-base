import Boom from '@hapi/boom';
import HapiProvider from '../providers/HapiProvider';
import banner from './banner';
import logger from '../utils/Winston';
// eslint-disable-next-line no-unused-vars

export default class ServerLoader {
  static async boot() {
    try {
      const [server] = await Promise.all([new HapiProvider().register()]);
      // Config logging
      server.events.on('response', (request) => {
        const { response } = request;
        const info = {
          ip: request.info.remoteAddress,
          machine: request.info.id,
          method: request.method.toUpperCase(),
          route: request.path,
          uri: request.info.uri,
          statusCode: request.response.statusCode,
        };
        if (process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'staging') {
          if (response._error) {
            if (response._error.isServer) {
              info.error = response._error.toString();
              logger.error(JSON.stringify(info));
            }
          } else {
            logger.verbose(JSON.stringify(info));
          }
        } else if (response._error) {
          if (response._error.isServer) {
            info.error = response._error.toString();
            logger.error(JSON.stringify(info));
          }
        }
      });
      // config filter
      server.ext({
        type: 'onPreHandler',
        method(request, h) {
          try {
            if (request.method === 'get' && request.query.filter) {
              const filter = JSON.parse(JSON.parse(request.query.filter));
              request.query.filter = filter || {};
            }
            return h.continue;
          } catch (error) {
            throw Boom.badRequest('FILTER_MUST_BE_STRINGTIFY_OF_OBJECT');
          }
        },
      });
      server.ext({
        type: 'onPreResponse',
        method(request, h) {
          try {
            const { response } = request;
            if (response.isBoom) {
              response.output.payload.status = false;
            }
            return h.continue;
          } catch (error) {
            throw Boom.badRequest('FILTER_MUST_BE_STRINGTIFY_OF_OBJECT');
          }
        },
      });
      server.start();
      banner();
    } catch (error) {
      logger.error('Server is crashed !');
    }
  }
}
