import AuthHandler from './handler';

export default class AuthRouter {
  constructor(server) {
    this.handler = new AuthHandler(server);
    const routes = this.bindRoutes();
    server.route(routes);
  }

  bindRoutes() {
    const routes = [
      {
        method: 'POST',
        path: '/api/v1/auth/login',
        options: this.handler.login,
      },
    ];
    return routes;
  }
}
