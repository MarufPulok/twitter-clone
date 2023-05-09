import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import connect from '../../../db/connect';
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../models/User";
import bcrypt from "bcrypt";

export const authOptions = (reqm) => {
  return {
    session: {
      strategy: "jwt",
    },
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
      CredentialsProvider({
        id: "credentials",
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          const { email, password } = credentials;

          // Add logic here to look up the user from the credentials supplied
          try {
            await connect();
            if (!email && !password) {
              const token = await getToken({ req: reqm });

              const user = await User.findById(token.id);
              return user;
            }
            const user = await User.findOne({ email });
            if (!user) {
              throw new Error("No user found");
            }
            const isValid = await bcrypt.compare(password, user.password);

            if (!isValid) {
              throw new Error("Invalid password");
            }
            return user;
          } catch (error) {
            console.log(error);
          }
        },
      }),
    ],

    pages: {
      signin: "/auth/signin",
    },

    callbacks: {
      async session({ session, token, params }) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.username = token.username;
        session.user.isComplete = token.isComplete;
        session.user.accessToken = token.accessToken;
        return session;
      },
      async jwt({ token, user, account, profile, isNewUser }) {
        if (user) {
          token.id = user.id;
          token.role = user?.role || "user";
          token.isComplete = user?.isComplete || false;
          token.accessToken = user?.accessToken || "";
          token.username = user?.username || "";
        }
        if (account) {
          // token.accessToken = account.access_token;
        }

        return token;
      },
      async signIn({ user, account }) {
        if (account) {
          try {
            const { email, name, image } = user;
            await connect();
            const existingUser = await User.findOne({ email: email });
            if (!existingUser) {
              const newUser = await User.create({
                name,
                username: name,
                email,
                dp: image,
                cp: image,
                bio: "",
                followers: [],
                following: [],
              });
              await newUser.save();
              console.log("new user created");
              console.log(newUser);
            }
          } catch (err) {
            console.log(err);
            return false;
          }
        }
        return true;
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
  };
};

export default (req, res) => NextAuth(req, res, authOptions(req));
