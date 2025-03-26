import { Users } from "@prisma/client";
import {client} from '../db/client'
export interface IUser { 
    email: string,
    provider: string
    password?: string,
    name?: string, 
    profilePicture?: string,
    sub?: string,
    solWallet: { 
        privateKey: string,
        publicKey: string,
    },
    inrWallet: { 
        balance: number
    }
}

export interface Wallet { 
    inrWallet: {balance: number },
    solWallet: {publicKey: string, privateKey: string}
}


interface IUserService { 
    addUser(user: IUser) : Promise<Users>,
    getUser(username: string) : Promise<Users | null >,
    updateUser(updateMetadata: any): Promise<Users>
    getWallets(userId: string) : Promise<Wallet>
} 


export class UserService implements IUserService {
    async addUser(user : IUser): Promise<Users> {
        try { 
            const userCreated = await client.users.create({
                data: { 
                    username: user.email,
                    provider: user.provider,
                    password: user.password,
                    name: user.name!,
                    profilePicture: user.profilePicture!,
                    sub: user.sub!,
                    solWallet: { 
                        create: { 
                            publicKey: user.solWallet.publicKey,
                            privateKey: user.solWallet.privateKey
                        }
                    },
                    inrWallet: { 
                        create: { 
                            balance: user.inrWallet.balance
                        }
                    }
                }
            })
            return userCreated
        } catch(error) { 
            if(error instanceof Error) throw new Error(error.message)
            throw new Error("error creating user")
        }        
    }
    async getUser(sub: string): Promise<Users | null> {
        try { 
            const user = await client.users.findFirst({
                where: { 
                    sub: sub
                }
            })
            return user
        } catch(error) { 
            if(error instanceof Error) throw new Error(error.message)
            throw new Error("unable to find user")
        }
    }
    async getUserByusername(username: string): Promise<Users | null> {
        try { 
            const user = await client.users.findFirst({
                where: { 
                    username: username                }
            })
            return user
        } catch(error) { 
            if(error instanceof Error) throw new Error(error.message)
            throw new Error("unable to find user")
        }
    }
    updateUser(updateMetadata: any): Promise<Users> {
        throw new Error("Method not implemented.");
    }
    async getWallets(userId: string) : Promise<Wallet> { 
        try { 
            const inrWallet = await client.inrWallet.findUnique({where: {userId: userId}})
            const solWallet = await client.solWallet.findUnique({where: { userId: userId}})
            return { inrWallet: { balance: inrWallet?.balance?? 0}, solWallet: { publicKey: solWallet?.publicKey?? "", privateKey: solWallet?.privateKey?? ""}}
        } catch(error) { 
            throw error
        }
    } 

}