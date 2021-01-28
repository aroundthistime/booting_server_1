import { generateSecret, sendSecretMail } from '../../../utils';

export default {
  Query: {
    requestSecret: async (_, { email }) => {
      const secret = generateSecret();
      try {
        await sendSecretMail(email, secret);
        return secret;
      } catch (error) {
        console.log(error);
        return -1;
      }
    },
  },
};
