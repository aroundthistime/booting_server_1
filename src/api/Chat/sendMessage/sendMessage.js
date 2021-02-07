import axios from 'axios';

export default {
  Mutation: {
    sendMessage: async (_, { chatId, opponentId, text }, { request, prisma }) => {
      const { user } = request;
      const opponent = await prisma.user({ id: opponentId });
      try {
        axios.post('https://exp.host/--/api/v2/push/send', {
          to: opponent.token,
          title: `${user.name}님으로부터 메시지가 도착했습니다`,
          body: text,
        });
        return prisma.createMessage({
          text,
          from: {
            connect: { id: user.id },
          },
          to: {
            connect: { id: opponentId },
          },
          chat: {
            connect: { id: chatId },
          },
        });
      } catch {
      }
    },
  },
};
