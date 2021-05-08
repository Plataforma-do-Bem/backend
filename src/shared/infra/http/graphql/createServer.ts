import { ApolloServer } from 'apollo-server-express';
import { Express } from 'express';

import { context } from '../graphql/context';
import createSchema from '../graphql/createSchema';

export default async function createApolloServer(app: Express): Promise<void> {
  const apolloServer = new ApolloServer({
    schema: await createSchema(),
    context,
    introspection: true,
    playground: true,
  });

  apolloServer.applyMiddleware({
    app,
    path: `/api/v${process.env.CURRENT_VERSION}/graphql`,
  });
}
