export default {
  Mutation: {
    createChat: async (_, { opponentId }, { request, prisma }) => {
      const { user } = request;
      return prisma.createChat({
        participants: {
          connect: [
            {
              id: user.id,
            },
            {
              id: opponentId,
            },
          ],
        },
      });
    },
  },
};
