import { USER_FRAGMENT } from '../../../fragments';
import { isAuthenticated } from '../../../middlewares';

export default {
  Query: {
    getMe: (_, __, { prisma, request }) => {
      isAuthenticated(request);
      const { user } = request;
      return prisma.user({ id: user.id }).$fragment(USER_FRAGMENT);
    },
  },
};
