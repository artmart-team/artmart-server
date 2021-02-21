'use strict';

const { hashPassword } = require('../helpers/bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const artists = [
    {
      username : "usernameTestingForArtist",
      firstName : "user",
      lastName : "name",
      email : "user@mail.com",
      password : hashPassword('123456'),
      profilePicture : "link.google.com",
      completeDuration : 48,
      bankAccount : 230230230,
      defaultPrice : 100000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username : "testinguser",
      firstName : "testing",
      lastName : "user",
      email : "testing@mail.com",
      password : hashPassword('123456'),
      profilePicture : "link.google.com",
      completeDuration : 48,
      bankAccount : 230230230,
      defaultPrice : 100000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username : "testingforedit",
      firstName : "testing",
      lastName : "edit",
      email : "testingedit@mail.com",
      password : hashPassword('123456'),
      profilePicture : "link.google.com",
      completeDuration : 48,
      bankAccount : 230230230,
      defaultPrice : 100000,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]
   await queryInterface.bulkInsert('Artists', artists)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Artists')
  }
};
