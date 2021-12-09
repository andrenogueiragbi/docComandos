'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('commands', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      commands_name: {
        type:Sequelize.STRING,
        aloowNull: false,
        
      },

      make: {
        type:Sequelize.STRING,
        aloowNull: false,
        
      },

      obs: {
        type:Sequelize.STRING,
        
      },
      autor: {
        type:Sequelize.STRING,
        
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'categories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.dropTable('commands');

  }
};
