import { ProfileCard} from "../components/ProfileCard"
import { getServerSession } from "next-auth"
import { authConfig , URL} from "../config/authConfig"
import axios from 'axios'
import { TokenDetails } from "../lib/tokens"
export default async function Dashboard() {
    let pubKey = ""
    let Tokens: TokenDetails[] = []
    let Total = ""
    try { 
        const session = await getServerSession(authConfig);
        console.log('server session')
        //@ts-ignore
        const uid = session?.user?.uid
        console.log(uid)
        //@ts-ignore
        const response:any = await axios.get(`${URL}/wallets/${uid}`)

        pubKey = response.data.solWallet.publicKey;
        try { 
            const response = await axios.get(`http://localhost:3000/api/tokens?address=${pubKey}`)
            console.log(response.data)
            //@ts-ignore
            const { tokens, total} = response.data;           
            Total = total
            Tokens = tokens
        }catch(error) { 
            console.log(error)
        }
    } catch(error) { 
        console.log("server session error")
        console.log(error)
    } 
    
    return (
        <div><ProfileCard publicKey={pubKey} tokens={Tokens} total={Total}/></div>
    )
}