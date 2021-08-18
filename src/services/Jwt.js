import JWT from 'jsonwebtoken';
import Configs from '../configs/index';

class Jwt {
  constructor() {
    this.secret = process.env.JWT_SECRET || Configs.getServerConfigs().jwtSecret;
    this.expiresIn = process.env.JWT_EXPIRATION || '7d';
  }

  issue(payload, expires) {
    return JWT.sign(payload, this.secret, {
      expiresIn: expires || this.expiresIn,
    });
  }

  verify(token) {
    return JWT.verify(token, this.secret);
  }
}

export default new Jwt();
