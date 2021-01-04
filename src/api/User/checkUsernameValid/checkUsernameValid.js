export default {
  Query: {
    checkUsernameValid: async (_, { username }, { prisma }) => {
      const result = await prisma.users({
        where: { username },
      });
      if (result.length > 0) {
        return false;
      }
      return true;
    },
  },
};
