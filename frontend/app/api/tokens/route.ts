import { NextRequest, NextResponse } from "next/server";
import { getSupportedTokens, connection } from "@/app/lib/constants";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { getAccount, getAssociatedTokenAddress } from "@solana/spl-token";
export async function GET(req: NextRequest) { 
    const {searchParams} = new URL(req.url)
    const address = searchParams.get('address') as unknown as string
    const supportedTokens = await getSupportedTokens()   
    const balances = await Promise.all(supportedTokens.map(token => getAccountBalance(token, address)))
    const tokens = supportedTokens.map((token, index) => ({ 
        ...token,
        balance: balances[index],
        usdBalance: Number(balances[index] * Number(token.price)).toFixed(2)
    }));
    return NextResponse.json({
        tokens,
        total: tokens.reduce((acc, token)=> acc + Number(token.usdBalance), 0).toFixed(2) 
    })
}

const getAccountBalance = async(token: { 
    name: string,
    mint: string,
    native: boolean,
    decimals: number
}, address: string) => { 
    if(token.native) { 
        let balance = await connection.getBalance(new PublicKey(address))
        return balance / LAMPORTS_PER_SOL
    }
    const ata = getAssociatedTokenAddress(new PublicKey(token.mint), new PublicKey(address))
    try { 
        const account = await getAccount(connection, new PublicKey(address))
        return Number(account.amount) / (10 ** token.decimals)
    } catch(error) { 
        return 0
    }
}