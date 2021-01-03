import { prisma } from "../../../../generated/prisma-client"

export default {
    Query : {
        userById : async(_, {id}) => {
            return await prisma.user({id});
        }
    }
}