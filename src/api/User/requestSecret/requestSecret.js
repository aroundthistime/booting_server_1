import { prisma } from "../../../../generated/prisma-client"
import {generateSecret} from "../../../utils.js"

export default {
    Mutation : {
        requestSecret : async(_, {email}) => {
            const loginSecret = generateSecret();
            console.log(loginSecret);
            try{
                await prisma.updateUser({ data: { loginSecret }, where: { email } });
                return true;
            } catch(error){
                console.log(error);
                return false
            }
            
        }
    }
}