import mongoose from 'mongoose';
import User from '../models/User';
import ROLE from '../../constants/role';
import Configs from '../../configs/index';
import logger from '../../utils/Logging';

const dbConfigs = Configs.getDatabaseConfigs();

const seed = async () => {
  try {
    mongoose.connect(dbConfigs.connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    await User.create([
      {
        fullname: 'lê văn admin',
        email: 'admin@gmail.com',
        password: '123456',
        role: ROLE.ADMIN,
      },
    ]);
  } catch (err) {
    logger.error(err);
  }
  process.exit();
};

seed();
