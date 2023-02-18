const users = require("../../models/user");
const items = require("../../models/item");
const md5 = require("md5");

module.exports = {
  createTodo: async ({ title, userId }) => {
    try {
      const newItem = await items.create({
        title,
        userId,
      });

      return newItem.dataValues;
    } catch (err) {
      // handle error
    }
  },

  deleteTodo: async ({ id }) => {
    try {
      const deletedItem = await items.destroy({ where: { id: id } });

      return deletedItem === 1;
    } catch (err) {
      // handle error
    }
  },

  markTodoCompleted: async ({ id }) => {
    try {
      const updateItem = await items.update(
        { completed: true },
        { where: { id: id } }
      );

      if (updateItem[0] === 1) {
        return {
          id,
          completed: true,
        };
      } else {
        throw new Error(`Failed to update item with id ${id}`);
      }
    } catch (err) {
      // handle error
    }
  },

  markTodoUncompleted: async ({ id }) => {
    try {
      const updateItem = await items.update(
        { completed: false },
        { where: { id: id } }
      );

      if (updateItem[0] === 1) {
        return {
          id,
          completed: false,
        };
      } else {
        throw new Error(`Failed to update item with id ${id}`);
      }
    } catch (err) {
      // handle error
    }
  },

  signUp: async ({ name, email, password }) => {
    const encrypt = md5(password);

    try {
      const newItem = await users.create({
        name,
        email,
        password: encrypt,
      });

      return newItem.dataValues;
    } catch (err) {
      // handle error
    }
  },

  login: async ({ email, password }) => {
    try {
      const isRegistered = await users.findOne({ where: { email: email } });

      if (!isRegistered?.dataValues) {
        throw new Error(`User not found`);
      }

      if (md5(password) === isRegistered.dataValues.password) {
        return isRegistered.dataValues;
      } else {
        throw new Error(`Email or password is incorrect.`);
      }
    } catch (err) {
      // handle error
    }
  },
};
