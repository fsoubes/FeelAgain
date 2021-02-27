import { InputType, Field } from "type-graphql";

@InputType()
export class BlogInput {
  @Field()
  title: String;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  image_url?: string;

  @Field(() => [String], { nullable: true })
  tags: [string];

  @Field(() => [String], { nullable: true })
  source?: string[];

  @Field(() => [String], { nullable: true })
  social?: string[];

  @Field({ nullable: true })
  article?: string;

  @Field({ nullable: true })
  isPublished?: boolean;
}
