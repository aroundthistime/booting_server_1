export const CHAT_FRAGMENT = `
    fragment ChatParts on Chat{
        id
        participants{
            id
            name
            avatar
            isBanned
            isDeactivated
        }
        messages{
            id
            text
            from{
                id
            }
            createdAt
        }

    }
`;

export const CHAT_FRAGMENT_SIMPLE = `
    fragment ChatSimple on Chat{
        id
        participants{
            id
            name
            avatar
        }
        createdAt
        updatedAt
        messages{
            text
            from{
                id
            }
            createdAt
        }
    }
`;

export const CHAT_FRAGMENT_PARTICIPANTS = `
    fragment ChatParticipants on Chat{
        participants{
            id
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
        createdAt
    }
`;

export const MESSAGE_FRAGMENT_WITH_CHAT = `
    fragment MessageWithChat on Message{
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

export const READ_FRAGMENT = `
    fragment ReadParts on Read{
        id
        message{
            id
        }
    }
`;
