import { generateToken } from '../../../utils';

export default {
  Mutation: {
    confirmSecret: async (_, { secret, email }, { prisma }) => {
      const user = await prisma.user({ email });
      if (user.loginSecret === secret) {
        await prisma.updateUser({
          where: {
            id: user.id,
          },
          data: {
            loginSecret: '',
          },
        });
        return generateToken(user.id);
      }
      throw Error('Please check your secret key');
    },
  },
};
