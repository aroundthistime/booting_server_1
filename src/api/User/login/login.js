import bcrypt from 'bcrypt';
import { generateToken } from '../../../utils';

export default {
  Query: {
    login: async (_, { email, password }, { prisma }) => {
      const user = await prisma.user({
        email,
      });
      try {
        const match = await bcrypt.compareSync(password, user.password);
        if (match) {
          return generateToken(user.id);
        }
        return '';
      } catch {
        return '';
      }
    },
  },
};
