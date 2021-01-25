export default {
  Chat: {
    lastMessage: async ({ id }, _, { prisma }) => {
      const messages = await prisma.messages({
        where: {
          chat: { id },
        },
        last: 1,
      });
      return messages[0];
    },
  },
};
