export const USER_FRAGMENT = `
    fragment Userparts on User{
        id
        username
        name
        avatar
        status
        posts {
            id
            caption
        }
    }
`;

export const COMMENT_FRAGMENT = `
    id
    text
    user{
        id
        username
        avatar
    }
`;

export const POST_FRAGMENT = `
    fragment Postparts on Post{
        id
        location
        caption
        user {
            id
            username
            avatar
        }
        files{
            url
        }
        likes{
            user{
                username
            }
        }
        comments{
            ${COMMENT_FRAGMENT}
        }
    }
`;
