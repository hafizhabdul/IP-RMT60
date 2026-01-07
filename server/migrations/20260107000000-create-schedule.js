'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Schedules', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            method: {
                type: Sequelize.STRING,
                allowNull: false
            },
            startDate: {
                type: Sequelize.DATEONLY,
                allowNull: false
            },
            endDate: {
                type: Sequelize.DATEONLY,
                allowNull: true
            },
            time: {
                type: Sequelize.STRING,
                allowNull: true
            },
            location: {
                type: Sequelize.STRING,
                allowNull: true
            },
            image: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Schedules');
    }
};
