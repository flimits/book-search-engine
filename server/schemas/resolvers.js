const { User } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      return User.find({});
    },
    // Add a query to get a specific user by ID
    user: async (_, { userId }) => {
      return User.findById(userId);
    },
  },
  Mutation: {
    createUser: async (_, args) => {
      const user = await User.create(args);
      return user;
    },
    loginUser: async (_, args) => {
      const user = await User.findOne({ email: args.email });

      if (!user || !(await user.isCorrectPassword(args.password))) {
        throw new Error('Invalid credentials');
      }

      return user;
    },
    // Add a mutation to delete a book from user's savedBooks
    deleteBook: async (_, { userId, bookId }) => {
      // Implement logic to delete a book from the user's savedBooks
      const user = await User.findByIdAndUpdate(
        userId,
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );

      return user;
    },
  },
};

module.exports = resolvers;
