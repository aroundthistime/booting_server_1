export default {
  Query: {
    userById: async (_, { id }, { prisma }) => await prisma.user({ id }),
  },
};
