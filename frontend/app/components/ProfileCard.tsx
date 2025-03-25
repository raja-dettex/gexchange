"use client";

import { JSX, useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, Wallet, Settings, LogOut, QrCode, Eye, EyeOff, Clipboard } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { TokenDetails } from "../lib/tokens";
import { useWallet } from "../contexts/walletContext";

export const ProfileCard = ({publicKey, tokens, total}: { publicKey: string, total: string, tokens: TokenDetails[]}) => {
  const { data: session } = useSession();
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const user = session?.user || {
    name: "User",
    email: "user@example.com",
    image: "/default-avatar.png",
  };
  const {  setWalletData, ...context } = useWallet();
  useEffect(() => { 
    console.log("tokens are here", tokens)
    console.log("total is here", total)
    setWalletData({
      tokens: tokens,
      total: total
    })
    console.log(context.tokens, " ", context.total , " end ")
  }, [publicKey, tokens, total])
  const maskedKey = publicKey.slice(0, 6) + "..."; // Masked public key

  const handleCopy = () => {
    navigator.clipboard.writeText(publicKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white h-screen p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav className="flex flex-col space-y-4">
          <SidebarLink href="/dashboard" icon={<Home size={20} />} label="Home" />
          <SidebarLink href="/wallet" icon={<Wallet size={20} />} label="Wallet" />
          <SidebarLink href="/settings" icon={<Settings size={20} />} label="Settings" />
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center space-x-3 text-lg text-red-400 hover:text-red-600 transition"
          >
            <LogOut size={20} /> <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-900">Welcome, {user.name}!</h1>
        <p className="mt-2 text-gray-600">Manage your assets, track transactions, and explore features.</p>

        {/* Profile Card */}
        <div className="mt-6 p-6 bg-white shadow rounded-xl flex flex-col items-center w-full max-w-md">
          <img
            src={user.image?? ""}
            alt="Profile"
            className="w-20 h-20 rounded-full border-4 border-blue-500"
          />
          <h2 className="text-xl font-semibold mt-3">{user.name}</h2>
          <p className="text-gray-500 text-sm">{maskedKey}</p>

          {/* Copy & QR Toggle Buttons */}
          <div className="mt-4 flex space-x-3">
            <button
              onClick={handleCopy}
              className="flex items-center px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition"
            >
              <Clipboard size={16} className="mr-1" />
              {copied ? "Copied!" : "Copy"}
            </button>

            <button
              onClick={() => setShowQR(!showQR)}
              className="flex items-center px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition"
            >
              {showQR ? <EyeOff size={16} className="mr-1" /> : <QrCode size={16} className="mr-1" />}
              {showQR ? "Hide QR" : "Show QR"}
            </button>
          </div>

          {/* QR Code Popup */}
          {showQR && (
            <div className="mt-4 p-4 bg-gray-900 rounded-lg">
              <QRCodeCanvas value={publicKey} size={150} bgColor="#ffffff" fgColor="#000000" />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// Sidebar Link Component
const SidebarLink = ({ href, icon, label }: { href: string; icon: JSX.Element; label: string }) => {
  return (
    <Link
      href={href}
      className="flex items-center space-x-3 text-lg hover:text-blue-400 transition"
    >
      {icon} <span>{label}</span>
    </Link>
  );
};
