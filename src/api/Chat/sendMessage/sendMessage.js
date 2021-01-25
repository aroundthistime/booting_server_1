export default {
  Mutation: {
    sendMessage: async (_, { chatId, opponentId, text }, { request, prisma }) => {
      const { user } = request;
      return prisma.createMessage({
        text,
        from: {
          connect: { id: user.id },
        },
        to: {
          connect: { id: opponentId },
        },
        chat: {
          connect: { id: chatId },
        },
      });
    },
  },
};
