export const Balance = ({ value }) => {
    return <div className="flex">
        <div className="font-bold text-3xl">
            Your balance
        </div>
        <div className="font-bold ml-4 text-4xl">
            Rs {value}
        </div>
    </div>
}