'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rating.belongsToMany(models.User, {
        through: models.Order
      })
      Rating.belongsTo(models.Artist)
    }
  };
  Rating.init({
    score: {
      type: DataTypes.FLOAT,
      validate: {
        notEmpty: {
          msg: 'Rating Score required'
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
    modelName: 'Rating',
  });
  return Rating;
};