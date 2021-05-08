import jwt, {
  JwtHeader,
  SigningKeyCallback,
  VerifyOptions,
} from 'jsonwebtoken';
import jwksRsa, { CertSigningKey, RsaSigningKey } from 'jwks-rsa';
import { MiddlewareFn } from 'type-graphql';
import { NextFunction } from 'express';

import authConfig from '@config/auth';
import Context from '@shared/infra/http/graphql/context';

const authMiddleware: MiddlewareFn<Context> = async (
  { context },
  next: NextFunction
) => {
  const authHeader = context.req.headers.authorization;

  if (!authHeader) {
    throw new Error('Token vazio');
  }

  const accessToken = authHeader.slice(7, authHeader.length);

  const client = jwksRsa({
    jwksUri: process.env.AUTH0_JWKS_URI as string,
  });

  function getKey(header: JwtHeader, callback: SigningKeyCallback) {
    client.getSigningKey(header.kid, (error, key) => {
      const signingKey =
        (key as CertSigningKey).publicKey ||
        (key as RsaSigningKey).rsaPublicKey;

      callback(error, signingKey);
    });
  }

  new Promise((resolve, reject) => {
    jwt.verify(
      accessToken,
      getKey,
      authConfig as VerifyOptions,
      (error, decoded) => {
        if (error) {
          return reject(new Error('Token inválido.'));
        }

        return resolve(decoded);
      }
    );
  });

  return next();
};

export default authMiddleware;
