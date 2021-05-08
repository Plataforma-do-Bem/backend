import { InputType, Field } from 'type-graphql';
import { IsEmail } from 'class-validator';

@InputType()
export default class LoginInput {
  @Field()
  @IsEmail({}, { message: 'Favor inserir um email válido.' })
  email: string;

  @Field()
  password: string;
}
