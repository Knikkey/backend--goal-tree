import passport from "passport";
import dotenv from "dotenv";
import { getUserById, createUser } from "../prisma/prismaHandlers";
var GoogleStrategy = require("passport-google-oauth20").Strategy;

dotenv.config({ path: ".env" });

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(async function (uid, cb) {
  const user = await getUserById(uid);
  cb(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      const prof = await profile;
      const user = await getUserById(prof.id);
      if (!user) {
        const newUser = await createUser(prof);
        return cb(null, newUser);
      } else {
        return cb(null, user);
      }
    }
  )
);
