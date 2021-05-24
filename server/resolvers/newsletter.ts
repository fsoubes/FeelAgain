import { MyContext } from "./../type";
import { Query, Resolver, Mutation, Ctx, Arg } from "type-graphql";
import { Newsletter, NewsletterModel } from "../entities/Newsletter";
import { validateEmail } from "../helpers/validation";
const ObjectId = require("mongodb").ObjectID;

@Resolver((_of) => Newsletter)
export class NewsletterResolver {
  @Query(() => Newsletter)
  async getNewsletter(@Ctx() {  }: MyContext) {
    try {
      const newsletter = await NewsletterModel.findOne({
        type: "newsletter",
      })
        .lean()
        .limit(10);

      return newsletter;
    } catch (err) {
      throw err;
    }
  }

  @Mutation(() => Boolean)
  async sendNewsletter(@Ctx() {  }: MyContext) {
    try {
    } catch (err) {
      throw err;
    }
  }

  @Mutation(() => Boolean)
  async addToNewsletter(
    @Arg("email") email: string,
    @Ctx() { req }: MyContext
  ) {
    try {
      if (!validateEmail(email)) {
        return false;
      }

      const newsletter = await NewsletterModel.findOne({
        type: "newsletter",
      });
      if (newsletter && newsletter.email) {
        const isPresent = newsletter.email.indexOf(email);
        if (isPresent !== -1) {
          return false;
        }
        newsletter.email.push(email);
        if (
          req.session.userId &&
          newsletter.users.indexOf(ObjectId(req.session.userId)) === -1
        ) {
          newsletter.users.push(ObjectId(req.session.userId));
        }
        await newsletter.save();
      }
      return true;
    } catch (err) {
      throw err;
    }
  }
}
