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
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX, __prod__  } from "../constant/constant";
import { sendEmail } from "../helpers/sendEmail";
import { v4 } from "uuid";
import { BasketModel } from "../entities/Basket";
import { display } from "../helpers/display";

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
      return  display(user.email as string);
    }
    return "Vous n'êtes pas autorisés à voir cette information";
  }

  @FieldResolver(() => String)
  async nickname(@Root() user: User, @Ctx() {  }: MyContext) {
    try{
      return display(user.nickname as string)
    }catch(err){
      throw err
    }
  }

  @FieldResolver(() => Number)
  async items(@Root() user: User, @Ctx() {  }: MyContext) {
    try {
      const basket = await BasketModel.findById(user.basket).select("total");
      return basket?.total;
    } catch (err) {
      throw err;
    }
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
            message: "la longueur doit être supérieure à 2 caractères",
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

  @Query(() => Boolean)
  async userRole(@Ctx() { req }: MyContext) {
    if (!req.session.isAdmin) {
      return false;
    }
    return true;
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
              message: "La longueur doit être supérieure à 2 caractères",
            },
          ],
        };
      }

      if (userInput.password.length <= 3) {
        return {
          errors: [
            {
              field: "password",
              message: "Le mot de passe doit être supérieur à 3 caractères",
            },
          ],
        };
      }

      if (!validateEmail(userInput.email)) {
        return {
          errors: [
            {
              field: "email",
              message: "Courriel erroné",
            },
          ],
        };
      }

      const hashedPassword = await argon2.hash(userInput.password);

      const basket = new BasketModel({});

      const user = new UserModel({
        ...userInput,
        password: hashedPassword,
        basket: basket._id,
      } as User);

      basket.user = user._id;
      await basket.save();
      await user.save();

      return { user };
    } catch (err) {
      if (err.code === 11000) {
        return {
          errors: [
            {
              field: "email",
              message: "Cet email est déjà présent dans la base de données",
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
        errors: [{ field: "email", message: "Cet e-mail n'existe pas" }],
      };
    }

    const isValid = await argon2.verify(user.password, userInput.password);

    if (!isValid) {
      return {
        errors: [{ field: "password", message: "Mot de passe incorrect" }],
      };
    }

    req.session.userId = user.id;
    req.session.isAdmin = user.isAdmin;

    return { user };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME,{domain: __prod__ ? ".feelagain.fr" : "localhost", path:"/",  expires: new Date(0)});
        if (err) {
          resolve(false);
          return;
        }
        resolve(true);
      })
    );
  }
}
