const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: "0",
  logging: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.pd = require("./pd.model.js")(sequelize, Sequelize);
db.dd = require("./dd.model.js")(sequelize, Sequelize);
db.upazilla = require("./upazilla.model.js")(sequelize, Sequelize);
db.bij = require("./bij.model.js")(sequelize, Sequelize);
db.fieldDay = require("./fieldDay.model.js")(sequelize, Sequelize);
db.farmerTraining = require("./farmerTraining.model.js")(sequelize, Sequelize);
db.motivational = require("./motivational.model.js")(sequelize, Sequelize);
db.farmerPrize = require("./farmerPrize.model.js")(sequelize, Sequelize);
db.review = require("./review.model.js")(sequelize, Sequelize);
db.saaoTraining = require("./saaoTraining.model.js")(sequelize, Sequelize);
db.activities = require("./activities.model")(sequelize,Sequelize);

db.activities.belongsTo(db.upazilla);
db.dd.hasMany(db.upazilla,{ foreignKey: 'ddId' }, {onDelete: 'CASCADE'});
db.upazilla.belongsTo(db.dd);

module.exports = db;