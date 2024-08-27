/**
 * An api file within the app, api, auth and a dynamic nextAuth route.
  Within here we set up our providers such as google auth.
 */
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";

/**
 * We need to define a handler to for the authentication.
 * To get the user session when signed in
 * NOTE: That every next js route is a serverless route ->  lambda -> dynamodb which function which means opens up only when it gets called. it only spin up the server and connect to the db when its called so we do not have to keep the server running constantly.
 */

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // To get the current session of the user
  async Session({ session }) {
    const sessionUser = await User.findOne({
      email: session.user.email,
    });

    // Then we want to update the current user session Id
    session.user.id = session._id.toString();
    return session;
  },
  async signIn({ profile }) {
    try {
      await connectToDB();
      // check if a user already exist:
      const userExist = await User.findOne({
        email: profile.email,
      });
      // if not create a user and save to the DB:
      if (!userExist) {
        await User.create({
          email: profile.email,
          username: profile.name.replace(" ", "").toLowerCase(),
          image: profile.picture,
        });
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
});

export { handler as GET, handler as POST };
