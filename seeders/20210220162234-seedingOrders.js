'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const orders = [
      {
        title :"testingforOrder",
        description: "",
        refImageId : 1,
        duration: 48,
        price :100000,
        totalPrice : 120000,
        accepted : false,
        done : false,
        paid : false,
        imageURL : 'link.google.com',
        UserId : 1,
        ArtistId : 1,
        ReviewId : 1,
        RatingId : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title :"orderIdTesting",
        description: "",
        refImageId : 1,
        duration: 48,
        price :100000,
        totalPrice : 120000,
        accepted : false,
        done : false,
        paid : false,
        imageURL : 'link.google.com',
        UserId : 1,
        ArtistId : 1,
        ReviewId : 1,
        RatingId : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title :"patchForOrderTesting",
        description: "",
        refImageId : 1,
        duration: 48,
        price :100000,
        totalPrice : 120000,
        accepted : false,
        done : false,
        paid : false,
        imageURL : 'link.google.com',
        UserId : 1,
        ArtistId : 1,
        ReviewId : 1,
        RatingId : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

   await queryInterface.bulkInsert('Orders', orders)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Orders')
  }
};
