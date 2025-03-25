import axios from "axios";
import { SUPPORTED_TOKENS } from "./tokens";
import { Connection } from "@solana/web3.js";

let LAST_UPDATED : number | null = null

const TOKEN_PRICE_INTERVAL = 60 * 1000;
let prices: {[key: string]: { price: string}} = { };
export const connection = new Connection("https://solana-mainnet.g.alchemy.com/v2/EspGgEsKtp6xdG1-P32lj9raEFUlgXNc")

export const getSupportedTokens = async () => { 
    if(!LAST_UPDATED || new Date().getTime() - LAST_UPDATED < TOKEN_PRICE_INTERVAL) { 
        const response = await axios.get("https://api.jup.ag/price/v2?ids=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v,So11111111111111111111111111111111111111112,Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB")
        prices = (response.data as unknown as any).data
    }
    return SUPPORTED_TOKENS.map(token => ({
        ...token,
        price: prices[token.mint].price
    }))
    
}