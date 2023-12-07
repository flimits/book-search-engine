const { Book, User } = require('../models');

const resolvers = {
    Query: {
        users: async () => {
            return User.find({});
        },
        books: async () => {
            return Book.find({});
        },
        book: async ({parent, bookId}) => {
            return Book.findOne({ _id: bookId });
        },
    },
    createUser: async(parent, args) => {
        const user = await User.create(args);
        return user;
    },
    loginUser: async(parent, args) => {
        const user = await User.findOne({args});
    }
}