import NextAuth from "next-auth/next";
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers:[
        GithubProvider({
            name: 'github',
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
              email: { label: "Email", type: "email", placeholder: "you@example.com" },
              password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
              // Replace this with your actual user authentication logic
              const user = await fakeLogin(credentials?.email?? "", credentials?.password?? "");
              
              if(!user) throw new Error("Invalid email or password");
              return { 
                id: user.id,
                email: user.email,
                password: user.password
              }
            },
        }),
        
    ],
    callbacks: { 
        async signIn({ user, account, profile, email, credentials }) {
            console.log("callback")
            console.log({user, account, profile, email, credentials})
            return true
        },
    },
    secret: process.env.NEXT_AUTH_SECRET
})

export { handler as GET , handler as POST}

const fakeLogin = async (email: string, password: string) => { 
    return {id: '123', email, password}
}