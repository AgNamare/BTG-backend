const dotenv = require('dotenv');

dotenv.config();

const secretKey = process.env.SECRET_KEY;

if (!secretKey) {
  throw new Error('SECRET_KEY is not defined in the environment variables');
}

module.exports = secretKey;
