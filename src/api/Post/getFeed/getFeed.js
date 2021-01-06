import { isAuthenticated } from '../../../middlewares';

export default {
  Query: {
    getFeed: async (_, __, { request, prisma }) => {
      isAuthenticated(request);
      const { user } = request;
      const followings = await prisma.user({ id: user.id }).followings();
      const followingsId = followings.map((followingUser) => followingUser.id);
      followingsId.push(user.id);
      return prisma.posts({
        where: {
          user: {
            id_in: followingsId,
          },
        },
        orderBy: 'createdAt_DESC',
      });
    },
  },
};
