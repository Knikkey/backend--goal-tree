import passport from "passport";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import { PrismaClient } from "@prisma/client";
import { handleLogin } from "./authHandlers";
var GoogleStrategy = require("passport-google-oauth20").Strategy;

const prisma = new PrismaClient();

const googlePassport = passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      const user = await prisma.user.findUnique({
        where: {
          id: profile.id,
        },
      });
      console.log(user);
      if (!user) {
        await prisma.user.create({
          data: {
            id: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            provider: "google",
          },
        });
        console.log("user created!");
      } else {
        () => handleLogin;
        console.log("already in db");
      }
      cb();
    }
  )
);
