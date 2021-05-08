import { ObjectType, Field, ID } from 'type-graphql';
import { Exclude } from 'class-transformer';

@ObjectType()
export default class User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field(() => String, { nullable: true })
  avatar: string | null;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}
