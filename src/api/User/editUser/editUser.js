import { isAuthenticated } from '../../../middlewares';

export default {
  Mutation: {
    editUser: (_, {
      username, email, name, status, avatar,
    }, { request, prisma }) => {
      isAuthenticated(request);
      const { user } = request;
      return prisma.updateUser({ // return은 자동으로 promise기다려줌, await안써도 같은 효과
        where: {
          id: user.id,
        },
        data: {
          username, email, name, status, avatar,
        },
      });
    },
  },
};
