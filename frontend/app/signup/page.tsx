// export default function Signup() { 
//     return (
//         <div>signup</div>
//     )
// }
"use client"

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
console.log("here")
  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn('credentials', {email, password , redirect:true, callbackUrl:"/"})
  };

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center text-center bg-gray-900 text-white px-6">
      <h1 className="text-4xl font-bold">Sign Up</h1>
      <p className="mt-4 text-gray-300">Choose a signup method:</p>

      {/* Signup with Email & Password */}
      <form className="mt-6 w-full max-w-md" onSubmit={handleEmailSignup}>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mt-4 p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full mt-6 p-3 bg-blue-600 rounded-md text-lg font-medium hover:bg-blue-500 transition">
          Sign Up with Email
        </button>
      </form>

      <p className="mt-4 text-gray-400">or</p>

      {/* Signup with GitHub */}
      <button
        className="mt-4 px-6 py-3 bg-gray-800 rounded-md text-lg font-medium hover:bg-gray-700 transition flex items-center"
        onClick={() => signIn()}
      >
        <img src="/github.svg" alt="GitHub" className="w-5 h-5 mr-2" />
        Sign Up with GitHub
      </button>
    </section>
  );
}
