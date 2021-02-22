'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const comment = [
      {
        description : "buat test delete comment",
        UserId : 1,
        ArtistId : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description : "buat test edit comment",
        UserId : 1,
        ArtistId : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description : "buat test get comment by id",
        UserId : 1,
        ArtistId : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
   await queryInterface.bulkInsert('Comments', comment)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Comments')
  }
};
