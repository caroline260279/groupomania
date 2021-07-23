const Sequelize = require("sequelize");
const db = require("../config/config");

const Gifs = db.define("gifs", {
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
