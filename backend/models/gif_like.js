const Sequelize = require("sequelize");
const db = require("../config/config");

const Gif_likes = db.define("gif_likes", {
    jaime: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    jaimepas: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
});

module.exports = Gif_likes;
