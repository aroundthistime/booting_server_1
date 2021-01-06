import { CHAT_FRAGMENT_DETAIL } from '../../../fragments';
import { isAuthenticated } from '../../../middlewares';

export default {
  Query: {
    getChat: async (_, { id }, { request, prisma }) => {
      isAuthenticated(request);
      const { user } = request;
      const chat = await prisma.chat({ id }).$fragment(CHAT_FRAGMENT_DETAIL);
      if (chat && chat.participants.some((participant) => participant.id === user.id)) {
        return chat;
      }
      throw Error('Wrong access');
    },
  },
};
