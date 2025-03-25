export const Token = ({name, balance}: {name : string, balance : number}) => { 
    return (
        <div className="flex justify-between">
            <span className="text-gray-700">{name}</span>
            <span className="text-gray-700 font-bold">{balance.toFixed(2)}</span>
        </div>
    )
}