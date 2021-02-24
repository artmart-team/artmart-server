'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const opts = [
      {
        title : "HD Resolution",
        extraPrice : 20000,
        ArtistId : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title : "HD Resolution",
        extraPrice : 20000,
        ArtistId : 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title : "Commercial use",
        extraPrice : 25000000,
        ArtistId : 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title : "HD Resolution",
        extraPrice : 20000,
        ArtistId : 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title : "Commercial use",
        extraPrice : 25000000,
        ArtistId : 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title : "HD Resolution",
        extraPrice : 20000,
        ArtistId : 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title : "Full Body",
        extraPrice : 40000,
        ArtistId : 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title : "HD Resolution",
        extraPrice : 20000,
        ArtistId : 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title : "Custom Design Background",
        extraPrice : 20000,
        ArtistId : 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title : "HD Resolution",
        extraPrice : 20000,
        ArtistId : 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title : "Custom Color Palette",
        extraPrice : 10000,
        ArtistId : 6,
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
