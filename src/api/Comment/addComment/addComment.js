import { COMMENT_FRAGMENT } from '../../../fragments';
import { isAuthenticated } from '../../../middlewares';

export default {
  Mutation: {
    addComment: (_, { postId, text }, { prisma, request }) => {
      isAuthenticated(request);
      const { user } = request;
      const comment = prisma.createComment({
        user: {
          connect: {
            id: user.id,
          },
        },
        post: {
          connect: {
            id: postId,
          },
        },
        text,
      }).$fragment(COMMENT_FRAGMENT);
      return comment;
    },
  },
};
