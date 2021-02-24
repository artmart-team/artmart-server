'use strict';

const { hashPassword } = require('../helpers/bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const users = [
      {
        username : "usernameTestingForUser",
        firstName : "user",
        lastName : "name",
        email : "user@mail.com",
        password : hashPassword('123456'),
        profilePicture : "link.google.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username : "testinguser",
        firstName : "testing",
        lastName : "user",
        email : "testinguser@mail.com",
        password : hashPassword('123456'),
        profilePicture : "link.google.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username : "testingforeditUser",
        firstName : "testing",
        lastName : "edit",
        email : "testingedituser@mail.com",
        password : hashPassword('123456'),
        profilePicture : "link.google.com",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    await queryInterface.bulkInsert('Users', users)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users')
  }
};
