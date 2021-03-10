import { MyContext } from "./../type";
import { Query, Resolver, Mutation, Ctx, Arg } from "type-graphql";
import { Basket } from "../entities/Basket";

@Resolver((_of) => Basket)
export class BasketResolver {
  @Query(() => Boolean)
  async test1(@Arg("isArg") isArg: Boolean, @Ctx() {  }: MyContext) {
    try {
      return isArg;
    } catch (err) {
      throw err;
    }
  }
  @Mutation(() => Boolean)
  async test2(@Arg("isArg") isArg: Boolean, @Ctx() {  }: MyContext) {
    try {
      return isArg;
    } catch (err) {
      throw err;
    }
  }
}
