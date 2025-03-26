import { Router, Request, Response } from "express";
import { AuthService} from '../services/auth.service'
import { UserService } from "../services/user.service";
export const userRoutes = Router()
const userService = new UserService()
const authService = new AuthService(userService)

userRoutes.post('/', async (req: Request, res: Response) => { 
    console.log("adding users")
    console.log(req.body)
    const { email,provider, password, profilePicture, name, sub} = req.body
    if(!email || !provider) { 
        res.status(400).json({message: 'email and provider can not be empty'})
    }
    try { 
        const user = await authService.signIn({username: email, provider, password, name, profilePicture, sub})
        res.status(201).json(user)
        return 
    } catch(error) { 
        if(error instanceof Error) res.status(400).json({message: error.message})
        return
    }
    
})

userRoutes.get('/:sub', async (req: Request, res: Response) => {
    console.log("fetching userss")
    const { sub } = req.params;
    console.log(sub)
    try { 
        const user = await userService.getUser(sub)
        console.log("user")
        console.log(user)
        res.status(200).json(user)
        return
    } catch(error) { 
        if(error instanceof Error) res.status(400).json({message: error.message})
        return
    }
 })
userRoutes.get('/wallets/:userId', async (req: Request, res: Response) => { 
    const { userId} = req.params;
    console.log("wallets" , userId)
    if(!userId) { 
        res.status(400).json({message: 'userID can not be empty'})
        return
    }

    try { 
        const {inrWallet, solWallet} = await userService.getWallets(userId)
        
        res.status(200).json({inrWallet, solWallet })
        return
    } catch(error) { 
        if(error instanceof Error) res.status(400).json({message: error.message})
        return
    }
})
