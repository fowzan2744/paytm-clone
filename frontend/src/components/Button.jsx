export function Button({label, onClick}) {
    return <button onClick={onClick} type="button"  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:translate-y-[-1px] cursor-pointer">{label}</button>
}