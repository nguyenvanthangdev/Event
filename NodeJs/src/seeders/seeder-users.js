module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Event", [{}]);
  },

  down: async (queryInterface, Sequelize) => {},
};
