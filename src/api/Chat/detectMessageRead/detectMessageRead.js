export default {
  Subscription: {
    detectMessageRead: {
      subscribe: (_, { chatId }, { prisma }) => prisma.$subscribe.message({
        AND: [
          { mutation_in: 'UPDATED' },
          {
            node: {
              chat: {
                id: chatId,
              },
            },
          },
        ],
      }).node(),
      resolve: (payload) => payload,
    },
  },
};
