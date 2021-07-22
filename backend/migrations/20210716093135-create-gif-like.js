"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Gif_likes", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            jaime: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            jaimepas: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            userid: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: "Users",
                    key: "id",
                },
                allowNull: false,
            },
            gifid: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: "Gifs",
                    key: "id",
                },
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Gif_likes");
    },
};
