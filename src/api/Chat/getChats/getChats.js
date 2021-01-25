import { CHAT_FRAGMENT } from '../../../fragments';

export default {
  Query: {
    getChats: (_, __, { request, prisma }) => {
      const { user } = request;
      return prisma.chats({
        where: {
          participants_some: {
            id: user.id,
          },
        },
      }).$fragment(CHAT_FRAGMENT);
    },
  },
};
