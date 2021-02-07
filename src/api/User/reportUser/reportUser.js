export default {
  Mutation: {
    reportUser: async (_, { id, chatId, reason }, { request, prisma }) => {
      try {
        const { user } = request;
        await prisma.createReport({
          from: {
            connect: {
              id: user.id,
            },
          },
          to: {
            connect: {
              id,
            },
          },
          reason,
        });
        if (chatId) {
          await prisma.updateChat({
            where: {
              id: chatId,
            },
            data: {
              participants: {
                disconnect: { id: user.id },
              },
            },
          });
        }
        return true;
      } catch {
        return false;
      }
    },
  },
};
