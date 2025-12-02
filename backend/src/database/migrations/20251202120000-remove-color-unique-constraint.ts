import { QueryInterface } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.removeConstraint("Queues", "Queues_color_key");
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.addConstraint("Queues", {
      fields: ["color", "companyId"],
      name: "Queues_color_key",
      type: "unique"
    });
  }
};
