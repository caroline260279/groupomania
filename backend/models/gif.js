const Sequelize = require("sequelize");
const db = require("../config/config");

const Gifs = db.define("gifs", {
    userid: {
        type: Sequelize.NUMBER,
        allowNull: false,
        defaultValue: 1,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = Gifs;
