'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const opts = [
      {
        title : "editOptionTesting",
        extraPrice : 20000,
        ArtistId : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title : "deleteOptionTestng",
        extraPrice : 20000,
        ArtistId : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title : "byIdOptionTesting",
        extraPrice : 20000,
        ArtistId : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    await queryInterface.bulkInsert('Options', opts)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Options')
  }
};
