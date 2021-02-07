export default {
  Mutation: {
    setUserToken: async (_, { token }, { request, prisma }) => {
      try {
        console.log('GOT TOKEN');
        const { user } = request;
        await prisma.updateUser({
          where: { id: user.id },
          data: {
            token,
          },
        });
        console.log(token);
        return true;
      } catch (error) {
        return false;
      }
    },
  },
};
