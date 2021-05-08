import { Resolver, Mutation, Arg, Query, Ctx } from 'type-graphql';
import { hash } from 'bcryptjs';

import User from '@modules/users/infra/entities/User';

import { Context } from '@shared/infra/http/graphql/context';

import CreateUserInput from '../inputs/CreateUserInput';

@Resolver(User)
export default class UsersResolver {
  @Mutation(() => User)
  async create(
    @Arg('data')
    { email, first_name, last_name, avatar, password }: CreateUserInput,
    @Ctx() ctx: Context
  ): Promise<User> {
    const hashedPassword = await hash(password, 8);

    const userCreated = ctx.prisma.user.create({
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
}
