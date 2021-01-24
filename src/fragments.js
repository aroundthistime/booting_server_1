export const USER_FRAGMENT_DETAILS = `
    fragment Userparts on User{
        id
        name
        gender
        avatar
        birthYear
        department
        height
        location
        mbti
        isSmoker
        drink {
            frequency
        }
        finishedMilitary
        datingType {
            content
        }
        avoidSameDepartment
        opponentAgeTop
        opponentAgeBottom
        opponentHeightTop
        opponentHeightBottom
        opponentMbti
        opponentIsSmoker
        opponentDrink{
            frequency
        }
        opponentFinishedMilitary
        opponentDatingType{
            content
        }
    }
`;

export const USER_FRAGMENT = `
    fragment Userparts on User{
        id
        username
        name
        avatar
        status
        posts {
            id
            files{
                url
            }
            likes{
                id
            }
            comments{
                id
            }
        }
    }
`;
