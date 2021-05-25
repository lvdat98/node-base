import _get from 'lodash/get';
import dotenv from 'dotenv';
import Config from './config';

dotenv.config();
// Read Configurations
const configs = _get(Config, `${process.env.NODE_ENV || 'development'}Config`);

const getServerConfigs = () => _get(configs, 'server');

const getBcryptConfigs = () => _get(configs, 'bcrypt');

const getDatabaseConfigs = () => _get(configs, 'database');

export default {
  getServerConfigs,
  getBcryptConfigs,
  getDatabaseConfigs,
};
