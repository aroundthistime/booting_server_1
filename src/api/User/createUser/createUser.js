import bcrypt from 'bcrypt';

export default {
  Mutation: {
    createUser: async (_, { email, password }, { prisma }) => {
      try {
        const passwordHash = bcrypt.hashSync(password, 10);
        await prisma.createUser({
          email,
          password: passwordHash,
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
