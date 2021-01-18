export default {
  Query: {
    searchUser: async (_, { term }, { request, prisma }) => {
      if (request.user){
        return prisma.users({
          where: {
            AND : [
              {
                OR: [
                  { username_contains: term },
                  { name_contains: term },
                ],
              },
              {
                id_not : request.user.id
              }
            ]
          },
        })
      } else {
        return prisma.users({
          where : {
            OR : [
              { username_contains: term },
              { name_contains: term },
            ]
          }
        })
      }
    }
  },
};
