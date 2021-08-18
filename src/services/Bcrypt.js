import Bcrypt from 'bcrypt';
import Configs from '../configs/index';

const bcryptConfigs = Configs.getBcryptConfigs();

class BcryptUtils {
  constructor() {
    this.saltRounds = parseInt(process.env.SALT_ROUNDS, 10) || bcryptConfigs.saltRounds;
  }

  hash(password) {
    return Bcrypt.hash(password, this.saltRounds);
  }

  hashSync(password) {
    return Bcrypt.hashSync(password, this.saltRounds);
  }

  compare(password, hash) {
    return Bcrypt.compare(password, hash);
  }

  compareSync(password, hash) {
    return Bcrypt.compareSync(password, hash);
  }
}

export default new BcryptUtils();
