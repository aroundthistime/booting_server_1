export default {
  Mutation: {
    createUser: async (_, { email, password }, { prisma }) => {
      try {
        await prisma.createUser({
          email,
          password,
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
