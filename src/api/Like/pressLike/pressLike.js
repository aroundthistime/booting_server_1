import { isAuthenticated } from '../../../middlewares';

export default {
  Mutation: {
    pressLike: async (_, { postId }, { request, prisma }) => {
      isAuthenticated(request);
      const { user } = request; // 이 아래부터는 isAuthenticated에서 에러발생시 실행x
      try {
        const likeExists = await prisma.$exists.like({
          AND: [
            {
              user: {
                id: user.id,
              },
            }, {
              post: {
                id: postId,
              },
            },
          ],
        });
        if (!likeExists) {
          await prisma.createLike({
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
          });
        }
        return true;
      } catch {
        return false;
      }
    },
  },
};
