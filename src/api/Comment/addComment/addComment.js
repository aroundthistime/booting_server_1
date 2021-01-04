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
            id: post.id,
          },
        },
        text,
      });
      return comment;
    },
  },
};
