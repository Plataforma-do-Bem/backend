import { InputType, Field } from 'type-graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export default class CreateUserInput {
  @Field()
  @IsEmail({}, { message: 'Favor inserir um email válido.' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'Senha não pode se vazia.' })
  password: string;

  @Field()
  @IsNotEmpty({ message: 'Favor inserir um nome.' })
  first_name: string;

  @Field()
  @IsNotEmpty({ message: 'Favor inserir um sobrenome' })
  last_name: string;

  @Field({ nullable: true })
  avatar?: string;
}
