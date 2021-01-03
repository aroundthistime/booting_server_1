import { prisma } from "../../../../generated/prisma-client"

export default {
    Mutation : {
        createAccount : async(_, {username, email, name}) => {
            const user = await prisma.createUser({
                username,
                email,
                name
            });
            return user;
        }
    }
}