const Sequelize = require("sequelize");
const db = require("../config/config");

const Gif_likes = db.define("gif_likes", {
    jaime: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    userid: {
        type: Sequelize.NUMBER,
        allowNull: false,
    },
    gifid: {
        type: Sequelize.NUMBER,
        allowNull: false,
    },
});

module.exports = Gif_likes;
