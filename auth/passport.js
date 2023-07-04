import passport from "passport";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
var GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(async function (uid, cb) {
  const user = await prisma.user.findUnique({
    where: {
      id: uid,
    },
  });
  cb(null, user);
});

dotenv.config({ path: ".env" });

const prisma = new PrismaClient();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      const user = await prisma.user.findUnique({
        where: {
          id: profile.id,
        },
      });
      if (!user) {
        const newUser = await prisma.user.create({
          data: {
            id: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            provider: "google",
          },
        });
        return cb(null, newUser);
      } else {
        return cb(null, user);
      }
    }
  )
);
