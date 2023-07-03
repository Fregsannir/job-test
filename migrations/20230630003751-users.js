'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return await queryInterface.createTable(
      'users',
      {
        id: {
          type: Sequelize.DataTypes.UUID,
          defaultValue: Sequelize.DataTypes.UUIDV4,
          primaryKey: true,
          unique: true,
          allowNull: false,
        },
        name: Sequelize.DataTypes.STRING(100),
        surname: Sequelize.DataTypes.STRING(100),
        email: {
          type: Sequelize.DataTypes.STRING(256),
          unique: true,
        },
        phone: {
          type: Sequelize.DataTypes.STRING(50),
          unique: true,
        },
        password: {
          type: Sequelize.DataTypes.STRING(100),
          allowNull: false,
        },
        createdAt: Sequelize.DataTypes.DATE,
        updatedAt: Sequelize.DataTypes.DATE,
      },
      {
        timestamps: true,
      },
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return await queryInterface.dropTable('users');
  },
};
