export default {
  Mutation: {
    createAccount: async (_, {
      username, email, name, avatar,
    }, { prisma }) => {
      const user = await prisma.createUser({
        username,
        email,
        name,
        avatar,
      });
      return user;
    },
  },
};
