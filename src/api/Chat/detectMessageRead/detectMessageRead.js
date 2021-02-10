import { READ_FRAGMENT } from '../../../fragments';

export default {
  Subscription: {
    detectMessageRead: {
      subscribe: (_, { chatId }, { prisma }) => prisma.$subscribe.read({
        AND: [
          { mutation_in: 'CREATED' },
          {
            node: {
              message: {
                chat: {
                  id: chatId,
                },
              },
            },
          },
        ],
      }).node().$fragment(READ_FRAGMENT),
      resolve: (payload) => payload,
    },
  },
};
