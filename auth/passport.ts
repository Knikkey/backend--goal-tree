import passport from "passport";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
var GoogleStrategy = require("passport-google-oauth20").Strategy;

const googlePassport = passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log("google callback fn fired");
      console.log(profile);
      cb();
    }
  )
);
