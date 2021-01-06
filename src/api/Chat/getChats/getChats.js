import { CHAT_FRAGMENT_SIMPLE } from '../../../fragments';
import { isAuthenticated } from '../../../middlewares';

export default {
  Query: {
    getChats: (_, __, { request, prisma }) => {
      isAuthenticated(request);
      const { user } = request;
      return prisma.chats({
        where: {
          participants_some: {
            id: user.id,
          },
        },
      }).$fragment(CHAT_FRAGMENT_SIMPLE);
    },
  },
};
