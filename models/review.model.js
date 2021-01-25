module.exports = (sequelize, Sequelize) => {
    const review = sequelize.define("review", {
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
      upazilla_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return review;
  };