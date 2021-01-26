const dotenv = require('dotenv');
dotenv.config()
const { DBHOST, DBUSER, DBPASSWORD, DB } = process.env;
module.exports = {
    HOST: DBHOST,
    USER: DBUSER,
    PASSWORD: DBPASSWORD,
    DB: DB,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };