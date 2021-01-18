import { generateSecret, sendSecretMail } from '../../../utils.js';

const AUTHENTICATE_TIME_LIMIT = 300000; // 5minutes

const deleteUnauthenticated = (prisma, id) => {
  setTimeout(async () => {
    const user = await prisma.user({ id });
    if (user && !user.isAuthenticated) {
      await prisma.deleteUser({ id });
    }
  }, AUTHENTICATE_TIME_LIMIT);
};

export default {
  Mutation: {
    requestSecret: async (_, { email }, { prisma }) => {
      const loginSecret = generateSecret();
      try {
        await sendSecretMail(email, loginSecret);
        await prisma.updateUser({ data: { loginSecret }, where: { email } });
        const users = await prisma.users({ where: { email } });
        const user = users[0];
        if (!user.isAuthenticated) {
          deleteUnauthenticated(prisma, user.id);
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
