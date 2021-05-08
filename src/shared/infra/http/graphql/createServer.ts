import { ApolloServer } from 'apollo-server-express';
import { Express } from 'express';

import createSchema from '../graphql/createSchema';

export default async function createApolloServer(app: Express): Promise<void> {
  const apolloServer = new ApolloServer({
    schema: await createSchema(),
    context: ({ req, res }) => ({ req, res }),
    introspection: true,
    playground: true,
  });

  const path = `/api/v${process.env.CURRENT_VERSION}/graphql`;

  apolloServer.applyMiddleware({
    app,
    path,
  });
}
