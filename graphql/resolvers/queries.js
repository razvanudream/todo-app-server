const items = require("../../models/item");

module.exports = {
  listTodos: async ({ userId }) => {
    try {
      const foundItems = await items.findAll({
        where: { userId: userId },
        order: [["createdAt", "DESC"]],
      });

      const todos = foundItems.map((items) => items.dataValues);

      return todos;
    } catch (err) {
      // handle error
    }
  },
};
