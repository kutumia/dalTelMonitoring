var PD = require('./pd.model');
module.exports = (sequelize, Sequelize) => {
  const dd = sequelize.define("dd", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    uname: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    pdId: {
      type: Sequelize.INTEGER,
      reference:{
        model: PD,
        key: 'id'
      }
    },
  });
  return dd;
};
