import { CHAT_FRAGMENT_SIMPLE } from '../../../fragments';

export default {
  Subscription: {
    newChat: {
      subscribe: (_, { id }, { prisma }) => prisma.$subscribe.chat({
        AND: [
          { mutation_in: 'CREATED' },
          {
            node: {
              participants_some: {
                id,
              },
            },
          },
        ],
      }).node().$fragment(CHAT_FRAGMENT_SIMPLE),
      resolve: (payload) => payload,
    },
  },
};
