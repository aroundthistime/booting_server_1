export default {
  Mutation: {
    setUserSettings: async (_, {
      name,
      avatar,
      gender,
      birthYear,
      department,
      height,
      location,
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
      opponentDistance,
      opponentMbti,
      opponentIsSmoker,
      opponentDrink,
      opponentFinishedMilitary,
    }, { request, prisma }) => {
    //   const { user } = request;
      try {
        // await prisma.updateUser({
        //     data : {
        //         datingType : {

        //         }
        //     }
        // })
        await prisma.updateUser({
          where: {
            id: 'ckkb7si2rixju0a32xult2ctg',
            // id : user.id
          },
          data: {
            name,
            avatar,
            gender,
            birthYear,
            department,
            height,
            location,
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
            opponentDistance,
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
