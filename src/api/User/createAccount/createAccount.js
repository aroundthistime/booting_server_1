export default {
  Mutation: {
    createAccount: async (_, {
      username, email, name,
    }, { prisma }) => {
      try {
        await prisma.createUser({
          username,
          email,
          name,
        });
        return true;
      } catch {
        return false;
      }
    },
  },
};
