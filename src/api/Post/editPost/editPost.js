import { isAuthenticated } from '../../../middlewares';

const EDIT_ACTION = 'EDIT';
const DELETE_ACTION = 'DELETE';

export default {
  Mutation: {
    editPost: async (_, {
      id, location, caption, action,
    }, { request, prisma }) => {
      isAuthenticated(request);
      const post = await prisma.$exists.post({
        id,
        user: {
          id: request.user.id,
        },
      });
      if (post) {
        if (action === EDIT_ACTION) {
          return prisma.updatePost({
            data: {
              location,
              caption,
            },
            where: {
              id,
            },
          });
        }
        return prisma.deletePost({ id }); // delete post
      }
      throw Error("You don't have the permission to edit this post");
    },
  },
};
