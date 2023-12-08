const typeDefs = `
type Book {
    _id: ID
    author: [String]
    description: String!
    bookId: String
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
    author: [String]
    description: String!
    title: String!
    bookId:String!
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
    book(bookId: ID!): Book
}

type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): Auth
    removeBook(bookId: String): User
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(book: BookInput): User
    deleteBook(bookId: String): User
    loginUser(email: String!, password: String!): Auth
}
`

module.exports = typeDefs;