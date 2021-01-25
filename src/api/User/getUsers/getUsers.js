import checkIsBanned from '../checkIsBanned/checkIsBanned';

const getAvoidDepartmentList = (department, avoid) => {
  if (avoid) {
    return [department];
  }
  return [];
};

const getFinishedMilitary = (myGender, wish) => {
  if (myGender === '남자' || wish === null) {
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

export default {
  Query: {
    getUsers: async (_, __, { request, prisma }) => {
      const { user } = request;
      const me = await prisma.user({ id: user.id });
      const users = await prisma.users({
        where: {
          AND: [
            {
              settingsDone: true,
            },
            {
              isBanned: false,
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
      // return users.filter(() => true); 나중에 위치기준 filter하기
      const filteredUsers = users.filter(async (user) => {
        const alreadyChecked = await prisma.$exists.response({
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
        if (alreadyChecked) {
          return false;
        }
        return true;
      });
      return filteredUsers;
    },
  },
};
