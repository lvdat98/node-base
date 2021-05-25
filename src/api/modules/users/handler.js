import ROLE from '../../../constants/role';
import UserController from './controller';
import UserValidator from './validator';

class UserHandler {
  constructor(server) {
    this.controller = new UserController();
    this.validator = new UserValidator();
    server.bind(this.controller);
  }

  getMany = () => ({
    tags: ['api', 'v1'],
    description: 'Get many users',
    notes: 'Return many users',
    handler: this.controller.getMany,
    auth: {
      strategy: 'jwt',
      scope: ROLE.ADMIN,
    },
    validate: {
      query: this.validator.queryParams,
    },
  });

  getOne = () => ({
    tags: ['api', 'v1'],
    description: 'Get one user',
    notes: 'Return one user',
    handler: this.controller.getOne,
    auth: {
      strategy: 'jwt',
      scope: ROLE.ADMIN,
    },
    validate: {
      params: this.validator.idParam,
    },
  });

  createOne = () => ({
    tags: ['api', 'v1'],
    description: 'create one user',
    notes: 'create one user',
    handler: this.controller.createOne,
    auth: {
      strategy: 'jwt',
      scope: ROLE.ADMIN,
    },
    validate: {
      payload: this.validator.payloadCreateOne,
    },
  });

  updateOne = () => ({
    tags: ['api', 'v1'],
    description: 'update one user',
    notes: 'update one user',
    handler: this.controller.updateOne,
    auth: {
      strategy: 'jwt',
      scope: ROLE.ADMIN,
    },
    validate: {
      params: this.validator.idParam,
      payload: this.validator.payloadUpdateOne,
    },
  });

  deleteOne = () => ({
    tags: ['api', 'v1'],
    description: 'delete one user',
    notes: 'delete one user',
    handler: this.controller.deleteOne,
    auth: {
      strategy: 'jwt',
      scope: ROLE.ADMIN,
    },
    validate: {
      params: this.validator.idParam,
    },
  });
}

export default UserHandler;
