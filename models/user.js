'use strict';
const { hashPassword } =  require ('../helpers/bcrypt')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Artist, {
        through: models.Order
      })
      User.belongsToMany(models.Review, {
        through: models.Order
      })
      User.belongsToMany(models.Rating, {
        through: models.Order
      })
      User.hasMany(models.Order)
      User.hasMany(models.Picture)
      User.hasMany(models.Comment)
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'Username required'
        }
      },
    },
    firstName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'First Name required'
        }
      },
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Last Name required'
        }
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email format'
        },
        notEmpty: {
          msg: 'Email required'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Password required'
        }
      }
    },
    profilePicture: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hashPassword (user.password)
        if (!user.profilePicture) {
          user.profilePicture = `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`
        }
      }
    }
  });
  return User;
};