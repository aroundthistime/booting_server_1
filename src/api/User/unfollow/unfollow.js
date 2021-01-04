import { isAuthenticated } from '../../../middlewares';

export default {
  Mutation: {
    unfollow: async (_, { id }, { request, prisma }) => {
      isAuthenticated(request);
      const { user } = request;
      try {
        prisma.updateUser({
          where: {
            id: user.id,
          },
          data: {
            followings: {
              disconnect: { id },
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
