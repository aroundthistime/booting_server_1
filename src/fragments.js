export const CHAT_FRAGMENT = `
    fragment ChatParts on Chat{
        id
        participants{
            id
            name
            avatar
            isBanned
        }
        messages{
            id
            text
            from{
                id
            }
            createdAt
            isChecked
        }

    }
`;

export const CHAT_FRAGMENT_SIMPLE = `
    fragment ChatSimple on Chat{
        id
        participants{
            name
        }
    }
`;

export const MESSAGE_FRAGMENT = `
    fragment MessageParts on Message{
        id
        text
        from{
            id
        }
        to{
            id
        }
        chat{
            id
        }
        createdAt
    }
`;
