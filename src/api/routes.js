/* eslint-disable import/prefer-default-export */
import _flattenDeep from 'lodash/flattenDeep';
import AuthRoutes from './modules/auth/routes';
import UserRoutes from './modules/users/routes';

export const bind = (server) => {
  const routes = [new AuthRoutes(server), new UserRoutes(server)];
  return _flattenDeep(routes);
};
