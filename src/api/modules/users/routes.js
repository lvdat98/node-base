import UserHandler from './handler';

export default class UserRoutes {
  constructor(server) {
    this.handler = new UserHandler(server);
    const routes = this.bindRoutes();
    server.route(routes);
  }

  bindRoutes() {
    const routes = [
      {
        method: 'GET',
        path: '/api/v1/users',
        options: this.handler.getMany,
      },
      {
        method: 'GET',
        path: '/api/v1/users/{id}',
        options: this.handler.getOne,
      },
      {
        method: 'POST',
        path: '/api/v1/users',
        options: this.handler.createOne,
      },
      {
        method: 'PUT',
        path: '/api/v1/users/{id}',
        options: this.handler.updateOne,
      },
      {
        method: 'DELETE',
        path: '/api/v1/users/{id}',
        options: this.handler.deleteOne,
      },
    ];
    return routes;
  }
}
