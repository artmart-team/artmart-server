'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Artist.hasMany(models.Picture)
      Artist.hasMany(models.Order)
      Artist.hasMany(models.Rating)
      Artist.hasMany(models.Comment)
      Artist.hasMany(models.Review)
      Artist.hasMany(models.Option)
    }
  };
  Artist.init({
    username: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    completeDuration: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Artist',
  });
  return Artist;
};