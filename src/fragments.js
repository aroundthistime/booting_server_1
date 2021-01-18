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

const USER_FRAGMENT_SIMPLE = `
    id
    username
    avatar
`;

const COMMENT_FRAGMENT_SIMPLE = `
    id
    text
    user{
        ${USER_FRAGMENT_SIMPLE}
    }
`;

export const COMMENT_FRAGMENT = `
    fragment CommentParts on Comment{
        ${COMMENT_FRAGMENT_SIMPLE}
    }
`;

export const POST_FRAGMENT_SIMPLE = `
    fragment PostSimple on Post{
        id
        files{
            id
            url
        }
    }
`

export const POST_FRAGMENT = `
    fragment Postparts on Post{
        id
        location
        caption
        tags{
            id
            text
        }
        user {
            ${USER_FRAGMENT_SIMPLE}
        }
        files{
            id
            url
        }
        likes{
            user{
                username
            }
        }
        createdAt
        comments{
            ${COMMENT_FRAGMENT_SIMPLE}
        }
    }
`;

export const CHAT_FRAGMENT_DETAIL = `
    fragment ChatPartsDetail on Chat{
        id
        participants{
            ${USER_FRAGMENT_SIMPLE}
        }
        messages{
            id
            text
            from{
                ${USER_FRAGMENT_SIMPLE}
            }
        }
    }
`;

export const CHAT_FRAGMENT_SIMPLE = `
    fragment ChatParts on Chat{
        id
        participants{
            ${USER_FRAGMENT_SIMPLE}
        }
    }
`;
