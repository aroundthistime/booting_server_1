export default {
  Mutation: {
    createAccount: async (_, { username, email, name }, { prisma }) => {
      const user = await prisma.createUser({
        username,
        email,
        name,
      });
      return user;
    },
  },
};
