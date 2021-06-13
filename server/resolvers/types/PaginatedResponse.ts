import { Blog } from "./../../entities/Blog";
import { Comments } from "../../entities/Comments";
import { ClassType, ObjectType, Field } from "type-graphql";
import { PaginationInfo } from "./pagination-result";

function PaginatedResponse<TItem>(TItemClass: ClassType<TItem>) {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    @Field(() => [TItemClass])
    edges: TItem[];

    @Field()
    pageInfo?: PaginationInfo;
  }
  return PaginatedResponseClass;
}

@ObjectType()
export class PaginatedCommentsResponse extends PaginatedResponse(Comments) {}

@ObjectType()
export class PaginatedBlogResponse extends PaginatedResponse(Blog) {}
