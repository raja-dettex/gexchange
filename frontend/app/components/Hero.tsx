"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { SecondaryButton } from "./button";
export const  Hero = () =>  {
    const router = useRouter()
    const session = useSession()
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-blue-900 to-gray-900 text-white px-6">
      <div className="max-w-3xl">
        <h1 className="text-5xl font-bold tracking-tight leading-tight md:text-6xl">
          Seamless Digital Transactions
        </h1>
        <p className="mt-6 text-lg text-gray-300 max-w-xl mx-auto">
          Secure, instant, and hassle-free way to send and receive digital assets. Built for speed, designed for trust.
        </p>

        <div className="mt-8 flex justify-center space-x-4">
          { 
            session.data?.user? (
                <SecondaryButton onClick={()=> {console.log("before push"); router.push("/dashboard"); console.log("after push")}}>Go To Dashboard</SecondaryButton>
            ):(
                <SecondaryButton onClick={()=> {console.log("before push"); router.push("/signup"); console.log("after push")}}>Get Started</SecondaryButton>
            )
          }
          <Link href="/learn-more">
            <button className="px-6 py-3 border border-gray-500 rounded-full text-lg font-medium hover:bg-gray-700 transition">
              Learn More
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
