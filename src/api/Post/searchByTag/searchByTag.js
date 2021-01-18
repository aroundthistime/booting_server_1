import {POST_FRAGMENT_SIMPLE} from '../../../fragments';

export default {
  Query: {
    searchByTag : (_, { term }, { prisma }) => prisma.posts({
      where: {
        tags_some : {
            text : term
        }
      },
    }).$fragment(POST_FRAGMENT_SIMPLE),
  },
};
