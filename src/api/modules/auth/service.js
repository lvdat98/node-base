import Boom from '@hapi/boom';
import Service from '../../core/Service';
import User from '../../../database/model/User';
import JWT from '../../../services/Jwt';
import Bcrypt from '../../../services/Bcrypt';
import ROLE from '../../../constants/role';

export default class AuthService extends Service {
  async register(payload) {
    const { username, image, password, email } = payload;
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      throw Boom.badRequest('EMAIL_IS_EXISTED');
    }
    const user = await User.create({
      username,
      image,
      password,
      email,
    });
    return { token: JWT.issue({ id: user.id, scope: user.role }), user };
  }

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
