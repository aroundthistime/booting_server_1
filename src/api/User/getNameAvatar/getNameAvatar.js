import { isAuthenticated } from '../../../middlewares';

export default {
  Query: {
    getNameAvatar: (_, __, { prisma, request }) => {
      isAuthenticated(request);
      const { user } = request;
      return prisma.user({ id: user.id });
    },
  },
};
