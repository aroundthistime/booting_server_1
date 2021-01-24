export default {
  Mutation: {
    createResponse: async (_, { id, isLike }, { prisma, request }) => {
      try {
        const { user } = request;
        if (user.id === id) {
          return false;
        }
        const alreadyResponded = await prisma.$exists.response({
          AND: [
            {
              from: {
                id: user.id,
              },
            },
            {
              to: {
                id,
              },
            },
          ],
        });
        if (alreadyResponded) {
          return false;
        }
        await prisma.createResponse({
          from: {
            connect: {
              id: user.id,
            },
          },
          to: {
            connect: {
              id,
            },
          },
          isLike,
        });
        if (isLike) {
          const opponentLikesMe = await prisma.$exists.response({
            AND: [
              {
                from: {
                  id,
                },
              },
              {
                to: {
                  id: user.id,
                },
              },
              {
                isLike: true,
              },
            ],
          });
          if (opponentLikesMe) {
            return true;
          }
        }
        return false;
        // the result shows whether there will be a chat room by this action
      } catch {
        return false;
      }
    },
  },
};
