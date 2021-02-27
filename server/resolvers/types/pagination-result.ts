import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class PaginationInfo {
  @Field({ nullable: true })
  hasNextPage!: boolean;
  @Field({ nullable: true })
  endCursor!: String;
}
