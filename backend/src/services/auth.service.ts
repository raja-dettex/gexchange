import { create } from "domain";
import { UserService, IUser } from "./user.service";
import { Users } from "@prisma/client";
import { Keypair } from "@solana/web3.js";

export class AuthService { 
    constructor(private userService: UserService) {}
    async signIn({username, password, provider, name, profilePicture, sub} : 
        { username: string, password?: string, provider: string, name?: string, profilePicture?: string, sub?:string}) : Promise<Users> { 
        try { 
            const existingUser = await this.userService.getUserByusername(username)
            if(!existingUser) { 
                const keypair = Keypair.generate()
                const publicKey = keypair.publicKey.toBase58()
                const privateKey = keypair.secretKey;
                const createdUser = await this.userService.addUser({
                    email: username, 
                    password,
                    provider,
                    name, 
                    profilePicture,
                    sub,
                    solWallet: { privateKey: privateKey.toString(), publicKey},
                    inrWallet: { balance: 0}
                })
                return createdUser;
            }
            return existingUser
        } catch(error) { 
            if(error instanceof Error) throw new Error(error.message)
            throw new Error("unable to sign in")
        }
    }
}