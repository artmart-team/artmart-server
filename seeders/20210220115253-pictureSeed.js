'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const picts = [
      {
        name : "delId picture testing",
        description: "",
        price : 100000,
        link : "google.com",
        hidden : false,
        CategoryId : 1,
        ArtistId : 1,
        UserId : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name : "getId picture testing",
        description: "",
        price : 100000,
        link : "google.com",
        hidden : false,
        CategoryId : 1,
        ArtistId : 1,
        UserId : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name : "editId picture testing",
        description: "",
        price : 100000,
        link : "google.com",
        hidden : false,
        CategoryId : 1,
        ArtistId : 1,
        UserId : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
   await queryInterface.bulkInsert('Pictures', picts)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Pictures')
  }
};
