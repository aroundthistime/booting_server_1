import { POST_FRAGMENT } from '../../../fragments';

export default {
  Query: {
    seeFullPost: (_, { id }, { prisma }) => prisma.post({ id }).$fragment(POST_FRAGMENT),
  },
};
