
export function InputBox({label, placeholder, onChange}) {
    return <div>
    <div className="text-sm font-medium text-left py-2">
        {label}
    </div>
    <input onChange={onChange} placeholder={placeholder} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-400"/>
    </div>
}