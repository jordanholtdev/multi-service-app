const ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({ path: `.env.${ENV}` });

console.log('MongoDB URI:', process.env.DB_URI);

if (!process.env.DB_URI) {
  console.error('MongoDB URI is not defined in the .env file.');
  process.exit(1);
}

const config = {
  development: {
    dbUri: process.env.DB_URI,
    clientId: process.env.CLIENT_ID,
    logLevel: 'debug',
    port: process.env.PORT || 3000,
  },
  production: {
    dbUri: process.env.PROD_DB_URI,
    clientId: process.env.PROD_CLIENT_ID,
    logLevel: 'info',
  },
};

module.exports = config[ENV];
