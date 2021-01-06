import { isAuthenticated } from '../../../middlewares';

export default {
  Mutation: {
    sendMessage: async (_, { chatId, text, opponentId }, { request, prisma }) => {
      isAuthenticated(request);
      const { user } = request;
      let chat;
      if (chatId) {
        chat = await prisma.chat({ id: chatId });
      } else if (user.id !== opponentId) {
        const searchResult = await prisma.chats({
          where: {
            participants_every: {
              OR: [
                {
                  id: user.id,
                },
                {
                  id: opponentId,
                },
              ],
            },
          },
        });
        if (searchResult.length > 0) {
          chat = searchResult[0];
        } else {
          chat = await prisma.createChat({
            participants: {
              connect: [
                { id: user.id },
                { id: opponentId },
              ],
            },
          });
        }
      }
      if (!chat) {
        throw Error('Chatroom not found');
      }
      if (!opponentId) {
        const participants = await prisma.chat({ id: chat.id }).participants();
        participants.forEach((participant) => {
          if (participant.id !== user.id) {
            opponentId = participant.id;
          }
        });
      }
      return prisma.createMessage({ // new message
        text,
        from: {
          connect: { id: user.id },
        },
        to: {
          connect: { id: opponentId },
        },
        chat: {
          connect: { id: chat.id },
        },
      });
    },
  },
};
