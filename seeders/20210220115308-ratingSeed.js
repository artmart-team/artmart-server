'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {


    const rating = [
      {
        score: 4.5,
        ArtistId: 1,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        score: 5,
        ArtistId: 1,
        UserId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        score: 4,
        ArtistId: 2,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        score: 5,
        ArtistId: 2,
        UserId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        score: 4.5,
        ArtistId: 3,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        score: 4.5,
        ArtistId: 3,
        UserId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        score: 5,
        ArtistId: 4,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        score: 3,
        ArtistId: 4,
        UserId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        score: 4,
        ArtistId: 5,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        score: 4,
        ArtistId: 5,
        UserId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        score: 5,
        ArtistId: 6,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        score: 5,
        ArtistId: 6,
        UserId: 2,
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
