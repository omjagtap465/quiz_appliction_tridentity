'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     * 
     */


    await queryInterface.createTable('jwts', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      status: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: 'ACTIVE',
      },
      token: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      expire: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      customerId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'customers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: Sequelize.DATE, // Enables soft deletes
        allowNull: true,
      },

    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('jwts');
  }
};
