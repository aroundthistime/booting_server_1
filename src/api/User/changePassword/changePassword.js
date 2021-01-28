import bcrypt from 'bcrypt';

export default {
  Mutation: {
    changePassword: async (_, { email, password }, { prisma }) => {
      try {
        const passwordHash = bcrypt.hashSync(password, 10);
        await prisma.updateUser({
          where: {
            email,
          },
          data: {
            password: passwordHash,
          },
        });
        return true;
      } catch {
        return false;
      }
    },
  },
};
