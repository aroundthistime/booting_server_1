export default {
  Subscription: {
    newMessage: {
      subscribe: (_, { chatId }, { prisma }) => prisma.$subscribe.message({
        AND: [
          { mutation_in: 'CREATED' },
          {
            node: {
              chat: { id: chatId },
            },
          },
        ],
      }).node(),
      resolve: (payload) => payload,
    },
  },
};

// import { isAuthenticated } from '../../../middlewares';

// export default {
//   Subscription: {
//     newMessage: {
//       subscribe: (_, { chatId }, { request, prisma }) => {
//         isAuthenticated(request);
//         const { user } = request;
//         return prisma.$subscribe.message({
//           where: {
//             AND: [
//               { mutation_in: 'CREATED' },
//               {
//                 node: {
//                   AND: [
//                     {
//                       chat: {
//                         id: chatId,
//                       },
//                     },
//                     {
//                       from: {
//                         id_not: user.id,
//                       },
//                     },
//                   ],

//                 },
//               },
//             ],
//           },
//         });
//       },
//     },
//   },
// };
