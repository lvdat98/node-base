import mongoose from 'mongoose';
import Configs from '../configs/index';
import logger from '../utils/Logging';

const dbConfigs = Configs.getDatabaseConfigs();

const db = async () => {
  try {
    await mongoose.connect(dbConfigs.connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    logger.info('> Connection with database succeeded.');
  } catch (err) {
    logger.error(err);
  }
};

export default db();
