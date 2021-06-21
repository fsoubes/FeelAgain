import { Express } from "express";
import { User } from "../entities/User";
import { req } from "../type";
import passport from "../services/passport";

export const authRoutes = (app: Express) => {
  // google
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req: req, res) => {
      if (!req.user) {
        return;
      }
      const { _id } = req.user as User;
      req.session.userId = _id.toString();
      // res.send(req.user);
      res.redirect(process.env.CORS_ORIGIN as string);
    }
  );

  // facebook
  app.get(
    "/auth/facebook",
    passport.authorize("facebook", { scope: ["email"] }),
    passport.authenticate("facebook", {
      failureRedirect: `${process.env.CORS_ORIGIN}/login`,
    })
  );
  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook"),
    (req: req, res) => {
      if (!req.user) {
        return;
      }
      const { _id } = req.user as User;
      req.session.userId = _id.toString();
      res.redirect(process.env.CORS_ORIGIN as string);
    }
  );

  // twitter
  app.get(
    "/auth/twitter",
    passport.authorize("twitter", { scope: ["email"] }),
    passport.authenticate("twitter", {
      failureRedirect: `${process.env.CORS_ORIGIN}/login`,
    })
  );
  app.get(
    "/auth/twitter/callback",
    passport.authenticate("twitter"),
    (req: req, res) => {
      if (!req.user) {
        return;
      }
      const { _id } = req.user as User;
      req.session.userId = _id.toString();
      res.redirect(process.env.CORS_ORIGIN as string);
    }
  );
};
