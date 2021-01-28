import { generateSecret, sendSecretMail } from '../../../utils';

export default {
  Query: {
    requestSecret: async (_, { actualSending, email }) => {
      if (!actualSending) {
        return -1;
      }
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
