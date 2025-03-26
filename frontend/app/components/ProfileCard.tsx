"use client";

import { JSX, useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, Wallet, Settings, LogOut, QrCode, Eye, EyeOff, Clipboard, Moon, Sun } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { TokenDetails } from "../lib/tokens";
import { useWallet } from "../contexts/walletContext";

export const ProfileCard = ({ publicKey, tokens, total }: { publicKey: string; total: string; tokens: TokenDetails[] }) => {
  const { data: session } = useSession();
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();
  const user = session?.user || {
    name: "User",
    email: "user@example.com",
    image: "/default-avatar.png",
  };
  const { setWalletData, ...context } = useWallet();

  useEffect(() => {
    setWalletData({ tokens, total });
  }, [publicKey, tokens, total]);

  useEffect(() => {
    // Load dark mode preference from localStorage
    const storedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(storedDarkMode);
    document.documentElement.classList.toggle("dark", storedDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("darkMode", newMode.toString());
  };

  const maskedKey = `${publicKey.slice(0, 6)}...`;

  const handleCopy = () => {
    navigator.clipboard.writeText(publicKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 dark:bg-gray-800 text-white h-screen p-6 flex flex-col shadow-xl rounded-r-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Dashboard</h2>
        <nav className="flex flex-col space-y-4">
          <SidebarLink href="/dashboard" icon={<Home size={20} />} label="Home" />
          <SidebarLink href="/wallet" icon={<Wallet size={20} />} label="Wallet" />
          <SidebarLink href="/settings" icon={<Settings size={20} />} label="Settings" />
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center space-x-3 text-lg text-red-400 hover:text-red-600 transition p-2 rounded-md hover:bg-red-800"
          >
            <LogOut size={20} /> <span>Logout</span>
          </button>
        </nav>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="mt-auto flex items-center justify-center space-x-2 bg-gray-700 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-500 text-white p-2 rounded-md transition"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 flex flex-col items-center bg-gray-300 dark:bg-gray-800 shadow-lg rounded-lg mx-6 my-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Welcome, {user.name}!</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Manage your assets, track transactions, and explore features.</p>

        {/* Profile Card */}
        <div className="mt-6 p-6 bg-white dark:bg-gray-700 shadow-md rounded-xl flex flex-col items-center w-full max-w-md border border-gray-300 dark:border-gray-600">
          <img
            src={user.image || ""}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md"
          />
          <h2 className="text-xl font-semibold mt-3 text-gray-900 dark:text-white">{user.name}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{maskedKey}</p>

          {/* Copy & QR Toggle Buttons */}
          <div className="mt-4 flex space-x-3">
            <button
              onClick={handleCopy}
              className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition shadow-md"
            >
              <Clipboard size={16} className="mr-2" />
              {copied ? "Copied!" : "Copy"}
            </button>

            <button
              onClick={() => setShowQR(!showQR)}
              className="flex items-center px-4 py-2 bg-gray-700 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-500 text-white rounded-lg text-sm transition shadow-md"
            >
              {showQR ? <EyeOff size={16} className="mr-2" /> : <QrCode size={16} className="mr-2" />}
              {showQR ? "Hide QR" : "Show QR"}
            </button>
          </div>

          {/* QR Code Popup */}
          {showQR && (
            <div className="mt-4 p-4 bg-gray-900 dark:bg-gray-800 rounded-lg shadow-md">
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
      className="flex items-center space-x-3 text-lg hover:text-blue-400 transition p-2 rounded-md hover:bg-gray-800 dark:hover:bg-gray-700"
    >
      {icon} <span>{label}</span>
    </Link>
  );
};
