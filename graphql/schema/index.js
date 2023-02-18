const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type UpdatedTodo {
    id: Int
    completed: Boolean
  }

  type Todo {
    id: Int
    title: String
    completed: Boolean
    userId: Int
    createdAt: String
    updatedAt: String
  }

  type User {
    id: Int
    name: String
    email: String
    password: String
    createdAt: String
    updatedAt: String
  }
  
  type Query {
    listTodos(userId:Int!): [Todo]
  }

  type Mutation {
    signUp(name: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
    createTodo(title: String!, userId: Int!): Todo
    markTodoUncompleted(id: Int!): UpdatedTodo
    markTodoCompleted(id: Int!): UpdatedTodo
    deleteTodo(id: Int!): Boolean
  }

  schema {
    query: Query
    mutation: Mutation
  }
`);
