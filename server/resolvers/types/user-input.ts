import { InputType, Field } from "type-graphql";

@InputType()
export class UserRegister {
  @Field()
  email: string;
  @Field()
  nickname: string;
  @Field()
  password: string;
}

@InputType()
export class UserLogin {
  @Field()
  email: string;
  @Field()
  password: string;
}
