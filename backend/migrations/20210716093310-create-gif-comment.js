"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Gif_comments", {
            comment: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable("Gif_comments");
    },
};
