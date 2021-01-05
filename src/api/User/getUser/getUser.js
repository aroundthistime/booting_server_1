import { USER_FRAGMENT } from '../../../fragments';

export default {
  Query: {
    getUser: (_, { id }, { prisma }) => prisma.user({ id }).$fragment(USER_FRAGMENT),
  },
};
