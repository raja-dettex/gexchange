import { useEffect, useState } from "react";
import { ChevronDown, RefreshCw } from "lucide-react";
import { SUPPORTED_TOKENS } from "../lib/tokens";
const tokens = SUPPORTED_TOKENS
import axios from "axios";
export const Swap = () => {
  const [fromToken, setFromToken] = useState(tokens[0]);
  const [toToken, setToToken] = useState(tokens[1]);
  const [amount, setAmount] = useState("");
  const [quoteAmount, setQuoteAmount] = useState("")
  const [quoteResponse , setQuoteResponse] = useState();
    const handleSwapRoll = () => { 
        setFromToken(toToken)
        setToToken(fromToken)
    }

  const handleSwap = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try { 
      const res = await axios.post('http://localhost:3000/api/swap', { quoteResponse: quoteResponse})
    } catch(err) { 
      if(err instanceof Error) console.log(err.message)
    }
  }
  useEffect(() => { 
    if(!amount) return
    axios.get(`https://quote-api.jup.ag/v6/quote?inputMint=${fromToken.mint}&outputMint=${toToken.mint}&amount=${Number(amount) * (10 ** fromToken.decimals)}&slippageBps=50`)
            .then((res: any) => {
                setQuoteAmount((Number(res.data.outAmount) / Number(10 ** toToken.decimals)).toString())
                
                setQuoteResponse(res.data);
            }).catch(err => console.log(err))
      console.log(quoteAmount)
  }, [fromToken, toToken, amount])
  return (
    <div className="p-6 bg-white shadow-md rounded-lg w-full max-w-md">
      <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Swap Tokens</h2>
      
      {/* From Token */}
      <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg">
        <div className="flex items-center space-x-2">
          
          <select
            className="bg-transparent focus:outline-none"
            value={fromToken.name}
            onChange={(e) => setFromToken(tokens.find(t => t.name === e.target.value)!)}
          >
            {tokens.map((token) => (
              <option key={token.name} value={token.name}>{token.name}</option>
            ))}
          </select>
        </div>
        <input
          type="number"
          placeholder="Amount"
          className="bg-transparent text-right focus:outline-none w-20"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      
      {/* Swap Icon */}
      <div className="flex justify-center my-3">
        <button onClick={handleSwapRoll}className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
          <RefreshCw size={20} />
        </button>
      </div>

      {/* To Token */}
      <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg">
        <div className="flex items-center space-x-2">
          <select
            className="bg-transparent focus:outline-none"
            value={toToken.name}
            onChange={(e) => setToToken(tokens.find(t => t.name === e.target.value)!)}
          >
            {tokens.map((token) => (
              <option key={token.name} value={token.name}>{token.name}</option>
            ))}
          </select>
        </div>
        <input
          disabled={true}
          type="number"
          placeholder="Amount"
          className="bg-transparent text-right focus:outline-none w-20"
          value={quoteAmount}
          
        />
        </div>

      {/* Swap Button */}
      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      onClick={(e) => handleSwap(e)}>
        Swap {fromToken.name} → {toToken.name}
      </button>
    </div>
  );
};
