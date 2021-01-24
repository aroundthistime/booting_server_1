import { USER_FRAGMENT_DETAILS } from '../../../fragments';
import { isAuthenticated } from '../../../middlewares';

export default {
  Query: {
    getMe: (_, __, { prisma, request }) => {
      isAuthenticated(request);
      const { user } = request;
      return prisma.user({ id: user.id }).$fragment(USER_FRAGMENT_DETAILS);
    },
  },
};
