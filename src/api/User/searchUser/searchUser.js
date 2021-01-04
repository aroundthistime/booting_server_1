export default {
  Query: {
    searchUser: async (_, { term }, { prisma }) => prisma.users({
      where: {
        OR: [
          { username_contains: term },
          { name_contains: term },
        ],
      },
    }),
  },
};
