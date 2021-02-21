'use strict';

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

var dateDeadline = new Date();

// console.log(date.addDays(2));

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const orders = [
      {
        title :"testingforOrder",
        description: "",
        refPictureId : 1,
        deadline : dateDeadline.addDays(2),
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
        refPictureId : 1,
        deadline : dateDeadline.addDays(2),
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
        refPictureId : 1,
        deadline : dateDeadline.addDays(2),
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
