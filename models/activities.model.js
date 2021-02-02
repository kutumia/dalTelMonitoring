var Upazilla = require('./upazilla.model');
var District = require('./dd.model');
module.exports = (sequelize, Sequelize) => {
    const activities = sequelize.define("activities", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        saao_training: {
            type: Sequelize.INTEGER
        },
        saao_training_done: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        field_day: {
            type: Sequelize.INTEGER
        },
        field_day_done: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        farmer_training: {
            type: Sequelize.INTEGER
        },
        farmer_training_done: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        review: {
            type: Sequelize.INTEGER
        },
        review_done: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        farmer_awards: {
            type: Sequelize.INTEGER
        },
        farmer_awards_done: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        bij : {
            type: Sequelize.INTEGER
        },
        bij_done : {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        motivational : {
            type: Sequelize.INTEGER
        },
        motivational_done : {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        upazillaId : {
            type: Sequelize.INTEGER,
            reference:{
                model: Upazilla,
                key: 'id'
            }
        },
        ddId:{
            type: Sequelize.INTEGER,
            reference:{
                model: District,
                key: 'id'
            }
        },
        start_time : {
            type: Sequelize.STRING
        },
        end_time : {
            type: Sequelize.STRING
        }
    });

    return activities;
};