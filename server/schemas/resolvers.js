const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({});
    },
    // // Add a query to get a specific user by ID
    // user: async (_, { userId }) => {
    //   return User.findById(userId);
    // },
  },
  Mutation: {
    createUser: async (_, args) => {
      try {
        const user = await User.create(args);
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        throw new Error('User creation failed');
      }
    },
    login: async (_, args) => {
      try {
        const user = await User.findOne({ email: args.email });

        if (!user || !(await user.isCorrectPassword(args.password))) {
          throw new Error('Invalid credentials');
        }

        const token = signToken(user);
        return { token, user };
      } catch (error) {
        throw new Error('Login failed');
      }
    },
    // Add a mutation to delete a book from user's savedBooks
    removeBook: async (_, { userId, bookId }) => {
      try {
        // Implement logic to delete a book from the user's savedBooks
        const user = await User.findByIdAndUpdate(
          userId,
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );

        if (!user) {
          throw new Error('User not found');
        }

        return user;
      } catch (error) {
        // Handle error, e.g., user not found or book not found
        throw new Error('Remove book failed');
      }
    },
    // Add a mutation to save a book
    saveBook: async (_, { userId, book }) => {
      try {
        // Assuming userId is passed in, you can customize this based on your authentication logic
        const user = await User.findByIdAndUpdate(
          userId,
          { $addToSet: { savedBooks: book } },
          { new: true, runValidators: true }
        );

        if (!user) {
          throw new Error('User not found');
        }

        return user;
      } catch (error) {
        // Handle error, e.g., user not found or validation error
        throw new Error('Save book failed');
      }
    },
  },
};

module.exports = resolvers;
