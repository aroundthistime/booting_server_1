export default {
  Mutation: {
    setUserToken: async (_, { token }, { request, prisma }) => {
      try {
        const { user } = request;
        await prisma.updateUser({
          where: { id: user.id },
          data: {
            token,
          },
        });
        return true;
      } catch (error) {
        return false;
      }
    },
  },
};