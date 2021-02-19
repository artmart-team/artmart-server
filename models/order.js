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
    refImageId: DataTypes.INTEGER,
    duration: DataTypes.INTEGER,
    accepted: DataTypes.BOOLEAN,
    done: DataTypes.BOOLEAN,
    paid: DataTypes.BOOLEAN,
    imageURL: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    ArtistId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};