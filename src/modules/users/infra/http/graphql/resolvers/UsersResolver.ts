import {
  Resolver,
  Mutation,
  Arg,
  Query,
  Ctx,
  UseMiddleware,
} from 'type-graphql';
import { hash } from 'bcryptjs';

import AuthMiddleware from '@modules/users/infra/middlewares/authMiddleware';
import User from '@modules/users/infra/entities/User';

import prisma from '@shared/infra/database/prisma';
import Context from '@shared/infra/http/graphql/context';

import CreateUserInput from '../inputs/CreateUserInput';

@Resolver(User)
export default class UsersResolver {
  @Mutation(() => User)
  async create(
    @Arg('data')
    { email, first_name, last_name, avatar, password }: CreateUserInput
  ): Promise<User> {
    const hashedPassword = await hash(password, 8);

    const userCreated = await prisma.user.create({
      data: {
        email,
        first_name,
        last_name,
        avatar,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        password: false,
        first_name: true,
        last_name: true,
        avatar: true,
        created_at: true,
        updated_at: true,
      },
    });

    return userCreated;
  }

  @Query(() => User)
  @UseMiddleware(AuthMiddleware)
  async loggedInUser(@Arg('user_id') user_id: string): Promise<User> {
    const userLoggedIn = await prisma.user.findUnique({
      where: { id: user_id },
    });

    if (!userLoggedIn) {
      throw new Error('Usuário não encontrado.');
    }

    return userLoggedIn;
  }
}
