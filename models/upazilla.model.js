var DD = require('./dd.model');
var PD = require('./pd.model');
module.exports = (sequelize, Sequelize) => {
    const upazilla = sequelize.define("upazilla", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      uname: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      ddId: {
        type: Sequelize.INTEGER,
        reference:{
          model: DD,
          key: 'id'
        }
      },
      pdId: {
        type: Sequelize.INTEGER,
        reference:{
          model: PD,
          key: 'id'
        }
      }
      
      
    });
  
    return upazilla;
  };