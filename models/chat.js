'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Chat.belongsTo(models.User)
      Chat.belongsTo(models.Artist)
    }
  };
  Chat.init({
    messages: DataTypes.STRING,
    from: DataTypes.STRING,
    ArtistId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'ArtistId required'
        }
      },
    },
    UserId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'UserId required'
        }
      },
    }
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};