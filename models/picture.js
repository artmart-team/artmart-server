'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Picture extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Picture.belongsTo(models.Category)
      Picture.belongsTo(models.Artist)
      Picture.belongsTo(models.User)
    }
  };
  Picture.init({
    name: {
      type: DataTypes.STRING,
      allowNull : false,
      validate: {
        notEmpty: {
          msg: 'Picture Name required'
        }
      },
    },
    description: DataTypes.STRING,
    price: {
      type: DataTypes.DOUBLE,
      allowNull : falses,
      validate: {
        notEmpty: {
          msg: 'Price required'
        }
      },
    },
    link: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'URL required'
        }
      },
    },
    hidden: DataTypes.BOOLEAN,
    CategoryId: DataTypes.INTEGER,
    ArtistId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'ArtistId required'
        }
      },
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Picture',
  });
  return Picture;
};