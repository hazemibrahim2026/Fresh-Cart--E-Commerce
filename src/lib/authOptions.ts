import { LoginUser } from "@/services/auth.services";
import { NextAuthOptions } from "next-auth";
import credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "Enter Your Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter Your Password",
        },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const response = await LoginUser({
          email: credentials?.email,
          password: credentials?.password,
        });
        if (response.message === "success") {
          return response;
        }else{
          throw new Error(response.message || "Invalid Credentials");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login"    
  },
  callbacks: {
    jwt({token, user}) {
      if(user){
        token.user = user.user;
        token.token = user.token;
      }
      return token;
    },
    session({session, token}) {
      if(token){
        session.user = token.user;        
      }
      return session;
    }
  }
};
