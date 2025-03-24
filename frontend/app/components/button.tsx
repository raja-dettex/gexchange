import React from "react"
export const PrimaryButton = ({onClick, value}: { onClick: () => void, value: string}) => { 
    return ( 
        <button onClick={onClick} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            {value}</button>
    )
}

export const SecondaryButton = ({children, onClick} : {
    children: React.ReactNode,
    onClick: () => void
 }) => { 
    return (
        <button onClick={onClick} className="px-6 py-3 bg-blue-600 rounded-full text-lg font-medium hover:bg-blue-500 transition">
              {children}
        </button>
    ) 
}