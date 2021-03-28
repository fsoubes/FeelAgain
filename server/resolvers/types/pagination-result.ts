import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class PaginationInfo {
  @Field({ nullable: true })
  hasNextPage!: boolean;
  @Field({ nullable: true })
  endCursor!: String;
}

@ObjectType()
export class PaginationPage {
  @Field({ nullable: true })
  total!: number;
  @Field({ nullable: true })
  current!: number;
  @Field({ nullable: true })
  totalItem!: number;
}
