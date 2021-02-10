export default {
  Mutation: {
    activateUser: async (_, __, { request, prisma }) => {
      const { user } = request;
      try {
        await prisma.updateUser({
          where: { id: user.id },
          data: {
            isDeactivated: false,
          },
        });
        return true;
      } catch {
        return false;
      }
    },
  },
};
