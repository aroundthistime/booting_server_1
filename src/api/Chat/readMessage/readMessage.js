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
        await prisma.updateMessage({
          where: { id: messageId },
          data: {
            isChecked: true,
          },
        });
        return true;
      } catch {
        return false;
      }
    },
  },
};
