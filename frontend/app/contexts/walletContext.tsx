"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { TokenDetails } from "../lib/tokens";

interface WalletContextType {
  tokens: TokenDetails[];
  total: string;
  setWalletData: (data: Partial<Omit<WalletContextType, "setWalletData">>) => void;
}

export const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletContextProvider = ({ children }: { children: ReactNode }) => {
  const [walletData, setWalletData] = useState<Omit<WalletContextType, "setWalletData">>({
    tokens: [],
    total: "",
  });

  const updateWalletData = (data: Partial<Omit<WalletContextType, "setWalletData">>) => {
    setWalletData((prev) => {
      console.log("Previous Wallet Data:", prev);
      console.log("New Data:", data);
      return { ...prev, ...data };
    });
  };

  return (
    <WalletContext.Provider value={{ ...walletData, setWalletData: updateWalletData }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletContextProvider");
  }
  return context;
};
