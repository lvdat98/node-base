import Boom from '@hapi/boom';
import Service from '../../core/Service';
import User from '../../../database/models/User';
import JWT from '../../../services/Jwt';
import Bcrypt from '../../../services/Bcrypt';

export default class AuthService extends Service {
  async login(payload) {
    const { email, password } = payload;

    const user = await User.findOne({ email });
    if (!user) {
      throw Boom.badRequest('INCORECT_EMAIL');
    }

    if (!user.password) {
      throw Boom.badRequest('INCORECT_PASSWORD');
    }

    const correctPassword = await Bcrypt.compare(password, user.password);
    if (!correctPassword) {
      throw Boom.badRequest('INCORECT_PASSWORD');
    }

    return { token: JWT.issue({ id: user.id, scope: user.role }), user };
  }
}
