import NextAuth from "next-auth/next";
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { authConfig } from "@/app/config/authConfig";


//@ts-ignore
const handler = NextAuth(authConfig)

export { handler as GET , handler as POST}

