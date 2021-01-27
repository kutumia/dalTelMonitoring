var Upazilla = require('./upazilla.model');
module.exports = (sequelize, Sequelize) => {
    const activities = sequelize.define("activities", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        field_exhibition: {
            type: Sequelize.STRING
        },
        field_day: {
            type: Sequelize.STRING
        },
        farmer_training: {
            type: Sequelize.STRING
        },
        agricultural_fair: {
            type: Sequelize.STRING
        },
        farmer_awards: {
            type: Sequelize.STRING
        },
        llP_distribution : {
            type: Sequelize.STRING
        },
        solarlight_trap : {
            type: Sequelize.STRING
        },
        upazilla_id : {
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