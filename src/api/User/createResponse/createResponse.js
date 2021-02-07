import axios from 'axios';

export default {
  Mutation: {
    createResponse: async (_, { id, isLike }, { prisma, request }) => {
      try {
        const { user } = request;
        console.log('CRETING REASPONSE');
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
          const opponent = await prisma.user({ id });
          if (opponentLikesMe && opponent && !opponent.isBanned && !opponent.isDeactivated) {
            axios.post('https://exp.host/--/api/v2/push/send', {
              to: opponent.token,
              title: `${user.name}님과 매칭되었습니다❤`,
              body: '메시지를 보내 대화를 시작하세요!',
            });
            axios.post('https://exp.host/--/api/v2/push/send', {
              to: user.token,
              title: `${opponent.name}님과 매칭되었습니다❤`,
              body: '메시지를 보내 대화를 시작하세요!',
            });
            await prisma.createChat({
              participants: {
                connect: [
                  {
                    id: user.id,
                  },
                  {
                    id,
                  },
                ],
              },
            });
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
