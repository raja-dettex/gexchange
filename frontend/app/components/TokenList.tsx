import { Token } from "./token"
import { TokenDetails } from "../lib/tokens"
export const TokenList = ({tokens}: {tokens: TokenDetails[]}) => { 
    return (<div className="w-full">
            <p className="text-gray-500 text-sm mb-2">Your Tokens</p>
            <div className="bg-gray-100 p-3 rounded-lg space-y-2">
            {tokens?(tokens.map((token: any) => (<Token name={token.name} balance={token.balance}/>))):(<div>no tokens to show</div>)}
            </div>
        </div>)
            
}