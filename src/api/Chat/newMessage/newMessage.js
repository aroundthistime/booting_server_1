import { MESSAGE_FRAGMENT_WITH_CHAT } from '../../../fragments';

export default {
  Subscription: {
    newMessage: {
      subscribe: (_, { id }, { prisma }) => prisma.$subscribe.message({
        AND: [
          { mutation_in: 'CREATED' },
          {
            node: {
              OR: [
                {
                  from: { id },
                },
                {
                  to: { id },
                },
              ],
            },
          },
        ],
      }).node().$fragment(MESSAGE_FRAGMENT_WITH_CHAT),
      resolve: (payload) => payload,
    },
  },
};
