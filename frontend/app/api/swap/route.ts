import { authConfig } from "@/app/config/authConfig";
import { Connection, Keypair, VersionedTransaction } from "@solana/web3.js";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { URL } from "@/app/config/authConfig";
import axios from 'axios'
export const POST = async (req:NextRequest) => { 
    const connection = new Connection('https://mainnet.helius-rpc.com/?api-key=9ab8240d-ed7b-4379-9d10-f85e38717d96');
    const data : {quoteResponse:any } = await req.json()
    const session : any = await getServerSession(authConfig)
    if(!session) { 
        NextResponse.json({
            message: 'not logged in',
            
        }, { status: 401})
    }
    const uid = session?.user?.uid?? ""
    const response: any = (await axios.get(`${URL}/wallets/${uid}`))
    const { solWallet } = response.data
    const { publicKey, privateKey } = solWallet
    const { swapTransaction } = await (
        await fetch('https://quote-api.jup.ag/v6/swap', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            // quoteResponse from /quote api
            quoteResponse: data.quoteResponse,
            // user public key to be used for the swap
            userPublicKey: publicKey,
            // auto wrap and unwrap SOL. default is true
            wrapAndUnwrapSol: true,
            // Optional, use if you want to charge a fee.  feeBps must have been passed in /quote API.
            // feeAccount: "fee_account_public_key"
          })
        })
      ).json();
      const swapTransactionBuf = Buffer.from(swapTransaction, 'base64');
    var transaction = VersionedTransaction.deserialize(swapTransactionBuf);
      const signers = getPrivateKey(privateKey)
    // sign the transaction
    transaction.sign([signers]);
    const latestBlockHash = await connection.getLatestBlockhash()
      // Execute the transaction
      const rawTransaction = transaction.serialize()
      const txid = await connection.sendRawTransaction(rawTransaction, {
          skipPreflight: true,
          maxRetries: 2
      });
      await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: txid
      });

      return NextResponse.json({
        txid
    })
}

const getPrivateKey = (privateKey: string) => { 
    const arr = privateKey.split(',').map(Number)
    const privateKeyUint8Arr = Uint8Array.from(arr)
    return Keypair.fromSecretKey(privateKeyUint8Arr)
}