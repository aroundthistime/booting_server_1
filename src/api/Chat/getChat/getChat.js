import { CHAT_FRAGMENT } from '../../../fragments';

export default {
  Query: {
    getChat: async (_, { id }, { request, prisma }) => {
      const chat = await prisma.chat({ id }).$fragment(CHAT_FRAGMENT);
      if (chat.participants.some((participant) => participant.id === request.user.id)) {
        return chat;
      }
      throw Error; // no authories for the room
    },
  },
};
