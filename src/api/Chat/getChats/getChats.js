import { CHAT_FRAGMENT_SIMPLE } from '../../../fragments';

export default {
  Query: {
    getChats: (_, __, { request, prisma }) => {
      try {
        // const { user } = request;
        const user = {
          id: 'ckkh2i4bksl1o0928o5xjhff8',
        };
        return prisma.chats({
          where: {
            participants_some: {
              id: user.id,
            },
          },
          orderBy: 'updatedAt_DESC',
        }).$fragment(CHAT_FRAGMENT_SIMPLE);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
