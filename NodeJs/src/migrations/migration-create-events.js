module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("event", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nameEvent: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      date: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("event");
  },
};
