'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const comment = [
      {
        description : "I would like to have some too!",
        UserId : 4,
        ArtistId : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description : "Can you do this style for me tho? Looks good!",
        UserId : 3,
        ArtistId : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description : "Incredibly minimalist, simple but deep! I like it, boss!",
        UserId : 3,
        ArtistId : 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description : "This, gentlement, is what I called a magnum opus! Love it ❤ !",
        UserId : 5,
        ArtistId : 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description : "Dali never fail to amuse me! 👍👍",
        UserId : 5,
        ArtistId : 2,
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
