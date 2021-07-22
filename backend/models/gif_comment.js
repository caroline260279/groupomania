"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Gif_comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(Gif) {
            this.belongsTo(Gif), { foreignKey: "gifid" };
        }
        static associate(User) {
            this.belongsTo(User), { foreignKey: "userid" };
        }
    }
    Gif_comment.init(
        {
            comment: DataTypes.STRING,
            userid: DataTypes.NUMBER,
            gifid: DataTypes.NUMBER,
        },
        {
            sequelize,
            modelName: "Gif_comment",
        }
    );
    return Gif_comment;
};
