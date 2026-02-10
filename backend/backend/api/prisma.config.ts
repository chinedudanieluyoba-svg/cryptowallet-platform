import * as dotenv from 'dotenv';

dotenv.config();

export default {
  datasource: {
    provider: 'postgresql',
    url:
      process.env.DATABASE_URL ||
      process.env.DATABASE_URL_PROD ||
      process.env.DATABASE_URL_STAGING ||
      process.env.DATABASE_URL_DEV,
  },
};
