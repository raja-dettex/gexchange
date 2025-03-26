"use client"

import { useState } from "react";
import { TokenList } from "../components/TokenList";
import { useWallet } from "../contexts/walletContext";
import { Swap } from "../components/Swap";

export default function WalletPage() {
  const { tokens, total } = useWallet();
  const [activeTab, setActiveTab] = useState("tokens");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-900 p-6">
      <div className="bg-white/10 backdrop-blur-lg shadow-lg border border-white/20 rounded-3xl p-6 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Your Solana Wallet</h1>

        {/* Wallet Address Section */}
        <div className="w-full text-center mb-6">
          <p className="text-gray-300 text-sm">Wallet Address</p>
          <p className="text-lg font-mono text-white break-all bg-white/10 px-4 py-2 rounded-lg border border-white/20">
            3fJv...aB7c
          </p>
        </div>

        {/* Balance Section */}
        <div className="w-full text-center mb-6">
          <p className="text-gray-300 text-sm">Total Balance</p>
          <p className="text-4xl font-bold text-green-400">◎ {total} USD</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 mb-6">
          {[
            { id: "tokens", label: "Tokens" },
            { id: "swap", label: "Swap" },
            { id: "addFunds", label: "Add Funds" },
            { id: "withdraw", label: "Withdraw" },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition duration-300 ${
                activeTab === id
                  ? "bg-green-500 text-white shadow-lg"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[220px] flex items-center justify-center bg-white/10 rounded-xl p-6 border border-white/20">
          {activeTab === "tokens" && <TokenList tokens={tokens} />}
          {activeTab === "swap" && <Swap />}
        </div>
      </div>
    </div>
  );
}