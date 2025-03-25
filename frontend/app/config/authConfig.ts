import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { Session } from 'next-auth'

export const URL='http://localhost:4000/api/v1/users'
import axios from 'axios'
export const authConfig = {
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
        
        session: ({ session, token }: any): Session => {
           const newSession: Session = session as Session;
            if (newSession.user && token.uid) {
              // @ts-ignore
              newSession.user.uid = token.uid ?? "";
            }
            return newSession!;
        },
        async jwt({ token, account, profile }: any) {
            try {
                if(account) { 
                    if(!token.sub && token.sub !== account?.providerAccountId) { 
                        token.sub = account?.providerAccountId
                    }
                }
                
                    const user = (await axios.get(`${URL}/${token.sub?? ""}`)).data
                    if (user) {
                        //@ts-ignore
                        token.uid = user.id
                    }

                    return token
                
            } catch(error) { 
                if(error instanceof Error) console.log(error.message)
                return token
            }
        },
        //@ts-ignore
        async signIn({ user, account, profile, email, credentials }) {
            try { 
                
                const response = await axios.post(`${URL}`, {
                    email: user.email,
                    provider: account?.type,
                    name: profile?.name,
                    profilePicture: profile?.avatar_url,
                    sub: account.providerAccountId
                } )
                return true
            } catch(error) { 
                if(error instanceof Error) console.log(error.message)
                return false
            }
        },
    },
    secret: process.env.NEXT_AUTH_SECRET
}

const fakeLogin = async (email: string, password: string) => { 
    return {id: '123', email, password}
}