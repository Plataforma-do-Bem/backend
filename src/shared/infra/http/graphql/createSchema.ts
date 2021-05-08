import { buildSchema } from 'type-graphql';
import { GraphQLSchema } from 'graphql';
import path from 'path';

const createSchema = (): Promise<GraphQLSchema> =>
  buildSchema({
    resolvers: [
      `${path.dirname(
        require.main?.filename as string
      )}/modules/**/infra/http/graphql/resolvers/*`,
    ],
    emitSchemaFile: { path: 'schema.graphql' },
    dateScalarMode: 'isoDate',
  });

export default createSchema;
