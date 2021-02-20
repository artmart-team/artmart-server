'use strict';
const { hashPassword } =  require ('../helpers/bcrypt')

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
      Artist.belongsToMany(models.User, {
        through: models.Order
      })
      Artist.hasMany(models.Picture)
      Artist.hasMany(models.Rating)
      Artist.hasMany(models.Comment)
      Artist.hasMany(models.Review)
      Artist.hasMany(models.Option)
    }
  };
  Artist.init({
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
    completeDuration: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Complete Commission Duration required'
        }
      }
    },
    profilePicture: DataTypes.STRING,
    bankAccount: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Bank Account Number required'
        }
      }
    },
    defaultPrice: {
      type: DataTypes.DOUBLE,
      validate: {
        notEmpty: {
          msg: 'Default Price required'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Artist',
    hooks: {
      beforeCreate: (artist, options) => {
        artist.password = hashPassword (artist.password)
        if (!artist.profilePicture) {
          artist.profilePicture = `https://ui-avatars.com/api/?name=${artist.firstName}+${artist.lastName}`
        }
      }
    }
  });
  return Artist;
};