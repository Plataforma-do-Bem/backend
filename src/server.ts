import app from '@shared/infra/http/app';
import createServer from '@shared/infra/http/graphql/createServer';

createServer(app);

app.listen(process.env.PORT, () =>
  console.log(`Server running at ${process.env.PORT}`)
);
