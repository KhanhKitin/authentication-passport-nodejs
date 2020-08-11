'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    await queryInterface.bulkInsert('User', [
      {
        id: '38248cb0-ade4-44ce-84b4-ccdbff1f1c48',
        email: 'khanhdeptrai@gmail.com',
        password: '123456789',
        name: 'khanh',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '15d2e833-398f-4374-bc77-f7d70e4ea4f6',
        email: 'hongnhung@gmail.com',
        password: 'doembietlagi',
        name: 'Nhung',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('User', null, {});
  }
};
