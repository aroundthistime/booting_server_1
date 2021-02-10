import { MESSAGE_FRAGMENT } from '../../../fragments';

export default {
  Mutation: {
    readMessage: async (_, { messageId }, { request, prisma }) => {
      try {
        // const { user } = request;
        // const message = await prisma.message({ id: messageId }).$fragment(MESSAGE_FRAGMENT);
        // if (message.to.id !== user.id) {
        //   throw Error;
        // }
        const alreadyRead = await prisma.$exists.read({
          message: {
            id: messageId,
          },
        });
        if (!alreadyRead) {
          await prisma.createRead({
            message: {
              connect: {
                id: messageId,
              },
            },
          });
        }
        return true;
      } catch {
        return false;
      }
    },
  },
};
