const getAvoidDepartmentList = (department, avoid) => {
  if (avoid) {
    return [department];
  }
  return [];
};

const getFinishedMilitary = (myGender, wish) => {
  if (myGender === '남' || wish === null) {
    return ({
      OR: [
        {
          finishedMilitary: true,
        },
        {
          finishedMilitary: false,
        },
      ],
    });
  }
  return ({
    finishedMilitary: wish,
  });
};

const filterUsers = async (users, me, prisma) => {
  const filteredUsers = [];
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const alreadyResponded = await prisma.$exists.response({
      AND: [
        {
          from: {
            id: me.id,
          },
        },
        {
          to: {
            id: user.id,
          },
        },
      ],
    });
    const hasSameDatingType = await user.datingType.some((type) => me.datingType.indexOf(type) > -1);
    if (!alreadyResponded && hasSameDatingType) {
      filteredUsers.push(user);
    }
  }
  return filteredUsers;
};

export default {
  Query: {
    getUsers: async (_, __, { request, prisma }) => {
      const { user } = request;
      const me = await prisma.user({ id: user.id });
      let users;
      if (me.opponentIsSmoker === null) {
        users = await prisma.users({
          where: {
            AND: [
              {
                settingsDone: true,
              },
              {
                isBanned: false,
              },
              {
                isDeactivated: false,
              },
              {
                gender_not: me.gender,
              },
              {
                AND: [
                  {
                    birthYear_gte: me.birthYear - me.opponentAgeTop,
                  },
                  {
                    birthYear_lte: me.birthYear - me.opponentAgeBottom,
                  },
                ],
              },
              {
                AND: [
                  {
                    height_lte: me.opponentHeightTop,
                  },
                  {
                    height_gte: me.opponentHeightBottom,
                  },
                ],
              },
              {
                mbti_in: me.opponentMbti,
              },
              {
                department_not_in: getAvoidDepartmentList(me.department, me.avoidSameDepartment),
              },
              {
                drink_in: me.opponentDrink,
              },
              getFinishedMilitary(me.gender, me.opponentFinishedMilitary),
            ],
          },
        });
      } else {
        users = await prisma.users({
          where: {
            AND: [
              {
                settingsDone: true,
              },
              {
                isBanned: false,
              },
              {
                isDeactivated: false,
              },
              {
                gender_not: me.gender,
              },
              {
                AND: [
                  {
                    birthYear_gte: me.birthYear - me.opponentAgeTop,
                  },
                  {
                    birthYear_lte: me.birthYear + me.opponentAgeBottom,
                  },
                ],
              },
              {
                AND: [
                  {
                    height_lte: me.opponentHeightTop,
                  },
                  {
                    height_gte: me.opponentHeightBottom,
                  },
                ],
              },
              {
                mbti_in: me.opponentMbti,
              },
              {
                department_not_in: getAvoidDepartmentList(me.department, me.avoidSameDepartment),
              },
              {
                isSmoker: me.opponentIsSmoker,
              },
              {
                drink_in: me.opponentDrink,
              },
              getFinishedMilitary(me.gender, me.opponentFinishedMilitary),
            ],
          },
        });
      }
      return filterUsers(users, me, prisma);
    },
  },
};
