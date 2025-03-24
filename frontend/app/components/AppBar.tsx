"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";
import { PrimaryButton } from "./button";
import { useRouter } from "next/navigation";

const AppBar = () => {
  const { data: session } = useSession();
    const router = useRouter()
  return (
    <nav className="w-full bg-gray-100 shadow-md py-4 border-b-[3px] border-gray-900">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto px-6">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-900">gexchange</div>

        {/* Authentication Section */}
        <div className="flex items-center space-x-4">
          {session?.user ? (
            <>
              {/* User Profile */}
              <div className="flex items-center space-x-2">
                {session.user.image && (
                  <img
                    src={session.user.image}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full border border-gray-300"
                  />
                )}
                <span className="text-gray-700 font-medium">{session.user.name}</span>
              </div>

              {/* Sign Out Button */}
              <PrimaryButton onClick={() => signOut()} value="Sign Out" />
            </>
          ) : (
            /* Sign In Button */
            <PrimaryButton onClick={() => router.push('/signup')} value="Sign In" />
          )}
        </div>
      </div>
    </nav>
  );
};

export default AppBar;
