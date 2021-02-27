import { MyContext } from "../type";
import {
  Resolver,
  Arg,
  Mutation,
  Ctx,
  ObjectType,
  Field,
  Query,
  FieldResolver,
  Root,
} from "type-graphql";
import { User, UserModel } from "../entities/User";
import { UserRegister, UserLogin } from "./types/user-input";
import argon2 from "argon2";
import { validateEmail } from "../helpers/validation";
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from "../constant/constant";
import { sendEmail } from "../helpers/sendEmail";
import { v4 } from "uuid";

@ObjectType()
export class FieldError {
  @Field()
  field!: string;
  @Field()
  message!: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver((_of) => User)
export class UserResolver {
  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { req }: MyContext) {
    if (req.session.userId === String(user._id)) {
      return user.email;
    }
    return "not allowed to see";
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { redis, req }: MyContext
  ): Promise<UserResponse> {
    if (newPassword.length <= 2) {
      return {
        errors: [
          {
            field: "newPassword",
            message: "length must be greater than 2",
          },
        ],
      };
    }

    const key = FORGET_PASSWORD_PREFIX + token;
    const userId = await redis.get(key);
    if (!userId) {
      return {
        errors: [
          {
            field: "token",
            message: "token expired",
          },
        ],
      };
    }

    const user = await UserModel.findOne({ _id: userId });

    if (!user) {
      return {
        errors: [
          {
            field: "token",
            message: "user no longer exists",
          },
        ],
      };
    }

    await UserModel.updateOne(
      { _id: userId },
      {
        password: await argon2.hash(newPassword),
      }
    );

    await redis.del(key);

    // log in user after change password

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { redis }: MyContext
  ) {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return true;
    }

    const token = v4();

    await redis.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      "ex",
      1000 * 60 * 60 * 24 * 1
    ); // 1day

    await sendEmail(
      email,
      `<a href="http://localhost:3000/change-password/${token}">reset password</a>`
    );
    return true;
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      return null;
    }
    const user = await UserModel.findById({ _id: req.session.userId });
    return user;
  }

  @Mutation((_returns) => UserResponse)
  async register(
    @Arg("user") userInput: UserRegister,
    @Ctx() {  }: MyContext
  ): Promise<UserResponse> {
    try {
      if (userInput.nickname.length <= 2) {
        return {
          errors: [
            {
              field: "nickname",
              message: "Length must be greater than 2",
            },
          ],
        };
      }

      if (userInput.password.length <= 3) {
        return {
          errors: [
            {
              field: "password",
              message: "Password must be greater than 3",
            },
          ],
        };
      }

      if (!validateEmail(userInput.email)) {
        return {
          errors: [
            {
              field: "email",
              message: "Incorrect email",
            },
          ],
        };
      }

      const hashedPassword = await argon2.hash(userInput.password);

      const user = new UserModel({
        ...userInput,
        password: hashedPassword,
      } as User);

      await user.save();

      return { user };
    } catch (err) {
      if (err.code === 11000) {
        return {
          errors: [
            {
              field: "email",
              message: "This email is already present in the database",
            },
          ],
        };
      }
      throw err;
    }
  }

  @Mutation((_returns) => UserResponse)
  async login(
    @Arg("user") userInput: UserLogin,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse | null> {
    const user = await UserModel.findOne({ email: userInput.email });

    if (!user) {
      return {
        errors: [{ field: "email", message: "That e-mail doesn't exist" }],
      };
    }

    const isValid = await argon2.verify(user.password, userInput.password);

    if (!isValid) {
      return {
        errors: [{ field: "password", message: "Incorrect password" }],
      };
    }

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true);
      })
    );
  }
}
