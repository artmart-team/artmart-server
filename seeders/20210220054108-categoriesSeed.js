'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const categories = [
      {
        name: "Others",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Abstract",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Anime",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Cartoon",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Design",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Realism",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Ukiyo-e",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    await queryInterface.bulkInsert('Categories', categories)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     await queryInterface.bulkDelete('Categories')
  }
};
