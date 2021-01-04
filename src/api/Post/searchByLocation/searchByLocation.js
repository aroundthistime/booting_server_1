export default {
  Query: {
    searchByLocation: (_, { location }, { prisma }) => prisma.posts({
      where: {
        location_contains: location,
      },
    }),
  },
};
