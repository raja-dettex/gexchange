"use client"

import { Token } from "../components/token";
import { useWallet } from "../contexts/walletContext";

export default function WalletPage() {

  console.log("here")
    const { tokens, total} = useWallet()
    console.log("tokens", tokens)
    console.log("total" , total)
   
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500">
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
            Your Solana Wallet
          </h1>
  
          <div className="flex flex-col items-center space-y-4">
            {/* Wallet Address Placeholder */}
            <div className="w-full text-center">
              <p className="text-gray-500 text-sm">Wallet Address</p>
              <p className="text-lg font-mono text-gray-700 break-all bg-gray-100 px-4 py-2 rounded-lg">
                3fJv...aB7c
              </p>
            </div>
  
            {/* Balance Section */}
            <div className="w-full text-center">
              <p className="text-gray-500 text-sm">Total Balance</p>
              <p className="text-3xl font-bold text-gray-800">◎ {total} USD</p>
            </div>
  
            {/* Token List Placeholder */}
            <div className="w-full">
              <p className="text-gray-500 text-sm mb-2">Your Tokens</p>
              <div className="bg-gray-100 p-3 rounded-lg space-y-2">
                {tokens?(tokens.map((token: any) => (<Token name={token.name} balance={token.balance}/>))):(<div>no tokens to show</div>)}
              </div>
            </div>
  
            {/* Connect Wallet Button */}
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition">
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    );
  }
  