import { Query, Resolver, Arg, Ctx } from 'type-graphql';
import { compare } from 'bcryptjs';
import fetch from 'isomorphic-unfetch';

import prisma from '@shared/infra/database/prisma';

import LoginScalar from '../scalars/LoginScalar';
import LoginInput from '../inputs/LoginInput';

@Resolver()
export default class LoginResolver {
  @Query(() => LoginScalar)
  async login(
    @Arg('data') { email, password }: LoginInput
  ): Promise<LoginScalar> {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Senha Inválida.');
    }

    const accessTokenPayload = await fetch(process.env.AUTH0_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: process.env.AUTH0_AUDIENCE,
        grant_type: process.env.AUTH0_GRANT_TYPE,
      }),
    }).then((response: any) => response.json());

    return {
      user,
      access_token: `${accessTokenPayload.token_type} ${accessTokenPayload.access_token}`,
    };
  }
}
