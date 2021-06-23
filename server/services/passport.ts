import argon2 from "argon2";
import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as TwitterStrategy } from "passport-twitter";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { v4 as uuidv4 } from "uuid";
import { UserModel } from "../entities/User";
import { BasketModel } from "../entities/Basket";
import { oauth2Mask } from "../helpers/oauth2Mask";
// import cloudinary from "./cloudinary";

passport.serializeUser((user, done) => {
  done(undefined, user);
});

// passport.deserializeUser((user, done) => {
//   done(undefined, user)
// })

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_OAUTH2_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_OAUTH2_CLIENT_SECRET as string,
      callbackURL: "/auth/google/callback",
    },
    async (_, __, profile, done) => {
      const googleId = profile.id;
      const nickname = oauth2Mask(googleId, profile.displayName, "google");
      const email = oauth2Mask(googleId, profile._json.email, "google");
      let user = await UserModel.findOne({ google_id: googleId });
      if (user) {
        const usernameHasChange = user.nickname !== nickname;
        const emailHasChange = user.email !== email;
        // const avatorHasChange = user.avator !== profile._json.picture;

        switch (true) {
          case usernameHasChange:
            user.nickname = nickname;
          case emailHasChange:
            user.email = email;
          /*   case avatorHasChange:
            user.avator = profile._json.picture; */
          case usernameHasChange || emailHasChange:
            await user.save();
        }

        done(undefined, user);
      } else {
        const defaultBasket = new BasketModel({});

        const randomPass = uuidv4();
        const password = await argon2.hash(randomPass);
        user = new UserModel({
          google_id: googleId,
          basket: defaultBasket._id,
          email,
          password,
          nickname,
          avator: profile._json.picture,
        });

        defaultBasket.user = user._id;
        await Promise.all([user.save(), defaultBasket.save()]);

        if (user) done(undefined, user);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_OAUTH2_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_OAUTH2_CLIENT_SECRET as string,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "displayName", "picture", "email"],
    },
    async (_, __, profile, done) => {
      /* const avatorUploadResponse = await cloudinary.uploader.upload(
        profile._json.picture.data.url,
        {
          public_id: `${profile.id}`,
          allowed_formats: ["jpeg", "jpg", "png", "webp"],
          folder: "/avator/facebook",
          overwrite: true,
          type: "upload",
        },
        (error, result) => {
          console.log(result, error);
        }
      ); */

      // console.log(avatorUploadResponse);

      const facebookId = profile.id;
      const nickname = oauth2Mask(facebookId, profile.displayName, "facebook");
      const email = oauth2Mask(facebookId, profile._json.email, "facebook");
      let user = await UserModel.findOne({ facebook_id: facebookId });

      if (user) {
        const usernameHasChange = nickname !== user.nickname;
        const emailHasChange = email !== user.email;

        switch (true) {
          case usernameHasChange:
            user.nickname = nickname;
          case emailHasChange:
            user.email = email;
        }
        // user.avator = avatorUploadResponse.secure_url;
        await user.save();
        done(undefined, user);
      } else {
        const defaultBasket = new BasketModel({});
        const randomPass = uuidv4();
        const password = await argon2.hash(randomPass);
        user = new UserModel({
          facebook_id: facebookId,
          basket: defaultBasket._id,
          email,
          password,
          nickname,
        });
        defaultBasket.user = user._id;

        await Promise.all([user.save(), defaultBasket.save()]);

        if (user) done(undefined, user);
      }
    }
  )
);

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_OAUTH2_CONSUMER_KEY as string,
      consumerSecret: process.env.TWITTER_OAUTH2_CONSUMER_SECRET as string,
      includeEmail: true,
      callbackURL: "/auth/twitter/callback",
    },
    async (_, __, profile, done) => {
      const twitterId = profile.id;
      const nickname = oauth2Mask(twitterId, profile.displayName, "twitter");
      const email = oauth2Mask(twitterId, profile._json.email, "twitter");
      //   const avator = profile._json.profile_image_url_https;

      let user = await UserModel.findOne({ twitter_id: twitterId });
      if (user) {
        const usernameHasChange = user.nickname !== nickname;
        const emailHasChange = user.email !== email;
        // const avatorHasChange = user.avator !== avator;

        switch (true) {
          case usernameHasChange:
            user.nickname = nickname;
          case emailHasChange:
            user.email = email;
          /* case avatorHasChange:
            user.avator = avator; */
          case usernameHasChange || emailHasChange:
            await user.save();
        }
        done(undefined, user);
      } else {
        const defaultBasket = new BasketModel({});
        const randomPass = uuidv4();
        const password = await argon2.hash(randomPass);
        user = new UserModel({
          twitter_id: twitterId,
          basket: defaultBasket._id,
          email,
          password,
          nickname,
          avator: profile._json.picture,
        });

        defaultBasket.user = user._id;
        await Promise.all([user.save(), defaultBasket.save()]);

        done(undefined, user);
      }
    }
  )
);

export default passport;
