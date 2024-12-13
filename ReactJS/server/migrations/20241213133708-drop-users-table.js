module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('Users');
  },
  down: async (queryInterface, Sequelize) => {
      // Optionally recreate the table here
      await queryInterface.createTable('Users', {
          id: {
              type: Sequelize.INTEGER,
              autoIncrement: true,
              primaryKey: true,
          },
          Name: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          // ... Other columns
      });
  },
};
