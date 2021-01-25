import { MESSAGE_FRAGMENT } from '../../../fragments';

export default {
  Subscription: {
    newMessage: {
      subscribe: (_, __, { request, prisma }) => prisma.$subscribe.message({
        AND: [
          { mutation_in: 'CREATED' },
          {
            node: {
              OR: [
                {
                  from: { id: request.user.id },
                },
                {
                  to: { id: request.user.id },
                },
              ],
            },
          },
        ],
      }).node().$fragment(MESSAGE_FRAGMENT),
      resolve: (payload) => payload,
    },
  },
};
