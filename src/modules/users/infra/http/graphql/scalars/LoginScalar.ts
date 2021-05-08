import { ObjectType, Field } from 'type-graphql';

import User from '@modules/users/infra/entities/User';

@ObjectType()
export default class LoginScalar {
  @Field()
  user: User;

  @Field()
  access_token: string;
}
