export default {
  Mutation: {
    setUserSettings: async (_, {
      name,
      avatar,
      gender,
      birthYear,
      department,
      height,
      mbti,
      isSmoker,
      drink,
      finishedMilitary,
      datingType,
      avoidSameDepartment,
      opponentAgeTop,
      opponentAgeBottom,
      opponentHeightTop,
      opponentHeightBottom,
      opponentMbti,
      opponentIsSmoker,
      opponentDrink,
      opponentFinishedMilitary,
    }, { request, prisma }) => {
      const { user } = request;
      try {
        await prisma.updateUser({
          where: {
            id: user.id,
          },
          data: {
            name,
            avatar,
            gender,
            birthYear,
            department,
            height,
            mbti,
            isSmoker,
            drink,
            finishedMilitary,
            datingType: {
              set: datingType,
            },
            avoidSameDepartment,
            opponentAgeTop,
            opponentAgeBottom,
            opponentHeightTop,
            opponentHeightBottom,
            opponentMbti: {
              set: opponentMbti,
            },
            opponentIsSmoker,
            opponentDrink: {
              set: opponentDrink,
            },
            opponentFinishedMilitary,
            settingsDone: true,
          },
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
