export default {
  Query: {
    checkUsernameValid: async (_, { username }, { prisma }) => {
      const result = await prisma.$exists.user({ username });
      return !result;
    },
  },
};
