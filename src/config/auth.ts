const authConfig = {
  audience: process.env.AUTH0_AUDIENCE as string,
  issuer: process.env.AUTH0_ISSUER as string,
  algorithms: ['RS256'],
};

export default authConfig;
