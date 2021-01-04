export default {
  Query: {
    getUser: (_, { id }, { prisma }) => prisma.user({ id }),
  },
};
