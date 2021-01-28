export default {
  Query: {
    checkEmailUsing: async (_, { email }, { prisma }) => prisma.$exists.user({
      email,
    }),
  },
};
