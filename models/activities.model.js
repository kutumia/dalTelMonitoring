var Upazilla = require('./upazilla.model');
module.exports = (sequelize, Sequelize) => {
    const activities = sequelize.define("activities", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        field_exhibition: {
            type: Sequelize.INTEGER
        },
        field_exhibition_done: {
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
        agricultural_fair: {
            type: Sequelize.INTEGER
        },
        agricultural_fair_done: {
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
        llP_distribution : {
            type: Sequelize.INTEGER
        },
        llP_distribution_done : {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        solarlight_trap : {
            type: Sequelize.INTEGER
        },
        solarlight_trap_done : {
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
        dd_id:{
            type: Sequelize.INTEGER
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