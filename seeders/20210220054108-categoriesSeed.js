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
        id: 1,
        name: "Others",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: "Realism",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: "Design",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: "Anime",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        name: "Abstract",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        name: "Cartoon",
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
