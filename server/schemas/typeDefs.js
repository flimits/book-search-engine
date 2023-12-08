const typeDefs = `
type Book {
    bookId: ID
    author: [String]
    description: String!
    image: String
    link: String
    title: String!
}

type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
    bookCount: Int
}

input BookInput {
    authors: [String]
    description: String!
    title: String!
    bookId: String!
    image: String
    link: String
}

type Auth {
    token: ID!
    user: User
  }

  type Query {
    user: User
    users: [User]
}

type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): Auth
    removeBook(userId: ID, bookId: String): User
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(userId: ID!, book: BookInput): User
    deleteBook(bookId: String): User
    loginUser(email: String!, password: String!): Auth
}
`

module.exports = typeDefs;