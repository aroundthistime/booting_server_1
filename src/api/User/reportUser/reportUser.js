export default {
  Mutation: {
    reportUser: async (_, { id, reason }, { request, prisma }) => {
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
        const chatRooms = await prisma.chats({
          where: {
            AND: [
              {
                participants_some: {
                  id,
                },
              },
              {
                participants_some: {
                  id: user.id,
                },
              },
            ],
          },
        });
        chatRooms.forEach(async (chat) => {
          await prisma.updateChat({
            where: {
              id: chat.id,
            },
            data: {
              isExpired: true,
            },
          });
        });
        return true;
      } catch {
        return false;
      }
    },
  },
};
