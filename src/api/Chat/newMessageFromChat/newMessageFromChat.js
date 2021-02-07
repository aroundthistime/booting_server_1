import { MESSAGE_FRAGMENT } from '../../../fragments';

export default {
  Subscription: {
    newMessageFromChat: {
      subscribe: (_, { id }, { prisma }) => prisma.$subscribe.message({
        AND: [
          { mutation_in: 'CREATED' },
          {
            node: {
              chat: { id },
            },
          },
        ],
      }).node().$fragment(MESSAGE_FRAGMENT),
      resolve: (payload) => payload,
    },
  },
};
