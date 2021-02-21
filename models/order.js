'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User)
      Order.belongsTo(models.Artist)
      Order.belongsTo(models.Review)
      Order.belongsTo(models.Rating)
    }
  };
  Order.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Title required'
        }
      },
    },
    description: DataTypes.STRING,
    refPictureId: DataTypes.INTEGER,
    deadline: DataTypes.DATE,
    price: {
      type: DataTypes.DOUBLE,
      validate: {
        notEmpty: {
          msg: 'Price required'
        }
      },
    },
    totalPrice: {
      type: DataTypes.DOUBLE,
      validate: {
        notEmpty: {
          msg: 'Total Price required'
        }
      },
    },
    accepted: DataTypes.BOOLEAN,
    done: DataTypes.BOOLEAN,
    paid: DataTypes.BOOLEAN,
    imageURL: DataTypes.STRING,
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
    modelName: 'Order',
  });
  return Order;
};