import dotenv from 'dotenv';

dotenv.config();

const assignConfig = (baseConfig, envConfig) => {
  const config = { ...baseConfig };
  return Object.assign(config, envConfig);
};

const config = {
  server: {
    host: '0.0.0.0',
    port: 3000,
    jwtSecret: 'base-api',
    jwtExpiration: '1h',
  },
  bcrypt: {
    saltRounds: 5,
  },
};

const developmentConfig = assignConfig(config, {
  database: {
    connectionString: process.env.DATABASE_URL_DEV,
  },
});

const stagingConfig = assignConfig(config, {
  database: {
    connectionString: process.env.DATABASE_URL_STAGING,
  },
});

const productionConfig = assignConfig(config, {
  database: {
    connectionString: process.env.DATABASE_URL_PRODUCTION,
  },
});

const testingConfig = assignConfig(config, {
  server: {
    host: '0.0.0.0',
    port: 4000,
    jwtSecret: 'base-test',
    jwtExpiration: '1h',
  },
  database: {
    connectionString: process.env.DATABASE_URL_TESTING,
  },
});

export default {
  developmentConfig,
  stagingConfig,
  testingConfig,
  productionConfig,
};
