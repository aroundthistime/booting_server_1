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
