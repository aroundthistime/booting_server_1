export default {
  User: {
    isFollowing: (parent, _, { request, prisma }) => {
      const { user: me } = request;
      const { id: userId } = parent;
      return prisma.$exists.user({
        AND: [
          {
            id: me.id,
          },
          {
            followings_some: { id: userId },
          },
        ],
      });
    },
    isMe: (parent, _, { request }) => {
      const { user } = request;
      const { id } = parent;
      return user.id === id;
    },
  },
  Post: {
    likeCounts: ({ likes }) => likes.length,
    isLiked: ({ id }, _, { request, prisma }) => {
      const { user } = request;
      return prisma.$exists.like({
        AND: [
          {
            post: {
              id,
            },
          },
          {
            user: {
              id: user.id,
            },
          },
        ],
      });
    },
  },
};
