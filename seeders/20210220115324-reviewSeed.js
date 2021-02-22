'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const reviews = [
      {
        title : "testingForReview",
        description : "testing",
        UserId : 1,
        ArtistId : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title : "deleteReviewTesting",
        description : "testing",
        UserId : 1,
        ArtistId : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title : "editReviewTesting",
        description : "testing",
        UserId : 1,
        ArtistId : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title : "getIdReviewTesting",
        description : "testing",
        UserId : 1,
        ArtistId : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
   await queryInterface.bulkInsert('Reviews', reviews)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Reviews')
  }
};
