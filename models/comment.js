'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User)
      Comment.belongsTo(models.Artist)
    }
  };
  Comment.init({
    description: {
      type: DataTypes.STRING,
      allowNull : false,
      validate: {
        notEmpty: {
          msg: 'Description required'
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
    },
    ArtistId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'ArtistId required'
        }
      },
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};