var Upazilla = require('./upazilla.model');
module.exports = (sequelize, Sequelize) => {
    const saaotraining = sequelize.define("saaotraining", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.INTEGER
      },
      upazillaId: {
        type: Sequelize.INTEGER,
        reference:{
          model: Upazilla,
          key: 'id'
        }
      }
    });
  
    return saaotraining;
  };