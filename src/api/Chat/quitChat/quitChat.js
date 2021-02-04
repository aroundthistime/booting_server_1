import { CHAT_FRAGMENT_PARTICIPANTS } from '../../../fragments';

export default {
  Mutation: {
    quitChat: async (_, { id }, { request, prisma }) => {
      try {
        const { user } = request;
        const chat = await prisma.updateChat({
          where: {
            id,
          },
          data: {
            participants: {
              disconnect: {
                id: user.id,
              },
            },
          },
        }).$fragment(CHAT_FRAGMENT_PARTICIPANTS);
        if (chat.participants.length === 0) {
          await prisma.deleteChat({ id });
        }
        return true;
      } catch {
        return false;
      }
    },
  },
};
