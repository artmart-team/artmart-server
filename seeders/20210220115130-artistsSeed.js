'use strict';

const { hashPassword } = require('../helpers/bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const artists = [
    {
      username : "usernameTestingForArtist",
      firstName : "user",
      lastName : "name",
      email : "artist@mail.com",
      password : hashPassword('123456'),
      profilePicture : "link.google.com",
      completeDuration : 48,
      bankAccount : 230230230,
      defaultPrice : 100000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username : "testingartist",
      firstName : "testing",
      lastName : "user",
      email : "testingartist@mail.com",
      password : hashPassword('123456'),
      profilePicture : "link.google.com",
      completeDuration : 48,
      bankAccount : 230230230,
      defaultPrice : 100000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username : "testingforeditArtist",
      firstName : "testing",
      lastName : "edit",
      email : "testingeditartist@mail.com",
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
