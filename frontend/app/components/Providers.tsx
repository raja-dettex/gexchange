"use client"
import { SessionProvider } from "next-auth/react"
import React from "react"
import { WalletContextProvider } from "../contexts/walletContext"

export const Providers = ({children} : { children: React.ReactNode}) => { 
    return (
        <SessionProvider>
            <WalletContextProvider>
            {children}
            </WalletContextProvider>
        </SessionProvider>
    )
}