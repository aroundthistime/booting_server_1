export default {
  Query: {
    checkIsBanned: (_, __, { prisma, request }) => {
      const { user } = request;
      return prisma.user({ id: user.id }).isBanned;
    },
  },
};
