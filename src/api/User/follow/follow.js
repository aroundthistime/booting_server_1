import { isAuthenticated } from '../../../middlewares';

export default {
  Mutation: {
    follow: async (_, { id }, { request, prisma }) => {
      isAuthenticated(request);
      const { user } = request;
      try {
        await prisma.updateUser({
          where: { id: user.id },
          data: {
            followings: {
              connect: {
                id,
              },
            },
          },
        });
        return true;
      } catch {
        return false;
      }
    },
  },
};
