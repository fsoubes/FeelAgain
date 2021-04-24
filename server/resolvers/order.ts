import { MyContext } from "./../type";
import { Query, Resolver, Mutation, Ctx, Arg } from "type-graphql";
import { Orders } from "../entities/Orders";

@Resolver((_of) => Orders)
export class OrderResolver {
  @Query(() => Boolean)
  async getOrders(@Arg("isArg") isArg: Boolean, @Ctx() {  }: MyContext) {
    try {
      return isArg;
    } catch (err) {
      throw err;
    }
  }
  @Mutation(() => Boolean)
  async createOrder(@Arg("isArg") isArg: Boolean, @Ctx() {  }: MyContext) {
    try {
      return isArg;
    } catch (err) {
      throw err;
    }
  }
}
