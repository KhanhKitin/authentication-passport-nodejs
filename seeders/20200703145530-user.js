'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    await queryInterface.bulkInsert('User', [
      {
        id: 'caf370b7-af1e-43e0-85f4-b30333af7725',
        email: 'khanhdeptrai@gmail.com',
        password: '123456789',
        name: 'khanh',
        is2FA: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'b4a60868-84b3-43e3-8c7b-8e177ad8ccfd',
        email: 'hongnhung@gmail.com',
        password: 'doembietlagi',
        name: 'Nhung',
        is2FA: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('User', null, {});
  }
};
