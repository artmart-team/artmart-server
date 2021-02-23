'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {


    const reviews = [
      {
        title: "Magnificient job",
        description: "The result is more than I expected, thanks!",
        UserId: 1,
        ArtistId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "You get what you got!",
        description: "What an incredible job!",
        UserId: 2,
        ArtistId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Magnum Opus!",
        description: "I can't even say anything because the quality is sooooo good",
        UserId: 5,
        ArtistId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Cute and Good",
        description: "I know what am I seeing when it is about a cute pic. Noice job!",
        UserId: 3,
        ArtistId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "かっこういい！！！",
        description: "このアーティストはとても上手です！",
        UserId: 4,
        ArtistId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Too Good!",
        description: "You just pour your soul into your art, minimalist, yet really got my heart! Love the result!",
        UserId: 1,
        ArtistId: 6,
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
