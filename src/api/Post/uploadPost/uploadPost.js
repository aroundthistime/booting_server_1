import { POST_FRAGMENT } from '../../../fragments';
import { isAuthenticated } from '../../../middlewares';

export default {
  Mutation: {
    uploadPost: async (_, { location, caption, urls }, { request, prisma }) => {
      isAuthenticated(request);
      const { user } = request;
      const post = await prisma.createPost({
        caption,
        location,
        user: {
          connect: {
            id: user.id,
          },
        },
      });
      urls.forEach(async (url) => {
        await prisma.createFile({
          url,
          post: {
            connect: {
              id: post.id,
            },
          },
        });
      });
      return post;
    },
  },
};
