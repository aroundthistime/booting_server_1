import { MESSAGE_FRAGMENT } from '../fragments';

export default {
  Chat: {
    lastMessage: async ({ id }, _, { prisma }) => {
      const messages = await prisma.messages({
        where: {
          chat: { id },
        },
        last: 1,
      }).$fragment(MESSAGE_FRAGMENT);
      return messages[0];
    },
  },
  Message: {
    isChecked: async ({ id }, _, { prisma }) => prisma.$exists.read({ message: { id } }),
  },
};
