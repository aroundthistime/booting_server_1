import { MESSAGE_FRAGMENT } from '../../../fragments';

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
      }).node().$fragment(MESSAGE_FRAGMENT),
      resolve: (payload) => payload,
    },
  },
};
