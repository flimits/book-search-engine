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

type Query {
    book: [Book]
    user: [User]
}

type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    loginUser(email: String!, password: String!): User
    deleteBook(bookId: String): User
}
`

module.exports = typeDefs;