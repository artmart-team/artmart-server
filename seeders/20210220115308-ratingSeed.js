'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {


    const rating = [
      {
        score : 2,
        ArtistId : 1,
        UserId : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        score : 2,
        ArtistId : 1,
        UserId : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        score : 3,
        ArtistId : 2,
        UserId : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        score : 4,
        ArtistId : 1,
        UserId : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
   await queryInterface.bulkInsert('Ratings', rating)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Ratings')
  }
};
