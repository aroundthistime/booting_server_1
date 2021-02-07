import { GraphQLServer } from 'graphql-yoga';
import logger from 'morgan';
import schema from './schema';
import { authenticateJwt } from './passport';
import { prisma } from '../generated/prisma-client';
import './env';
import { uploadMiddleware, uploadController } from './upload';

const PORT = process.env.PORT || 5000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ prisma, request }),
  subscriptions: true,
});

server.express.use(logger('dev'));
server.express.use(authenticateJwt);
server.express.post('/api/upload', uploadMiddleware, uploadController);

const options = {
  port: PORT,
  bodyParserOptions: { limit: '10mb', type: 'application/json' },
};

server.start(options, () => console.log(`✅ Server running on http://localhost:${PORT}`));
// server.listen(PORT).then(({ url, subscriptionsUrl }) => {
//   console.log(`🚀 Server ready at ${url}`);
//   console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
// });
// server.express.listen(PORT, ()=>console.log(`✅ Server running on http://localhost:${PORT}`))
