import { generateToken } from '../../../utils';

export default {
  Query: {
    login: async (_, { email, password }, { prisma }) => {
      const user = await prisma.user({
        email,
      });
      try {
        if (user.password === password) {
          return generateToken(user.id);
        }
      } catch {
        return '';
      }
    },
  },
};
