'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.User)
      Review.belongsTo(models.Artist)
    }
  };
  Review.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    ArtistId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};