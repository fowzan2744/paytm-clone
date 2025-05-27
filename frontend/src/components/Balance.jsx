export const Balance = ({ value }) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl shadow-lg flex items-center justify-between max-w-md mx-auto mt-6">
      <div className="text-blue-900 text-xl sm:text-2xl font-semibold">
        💰 Your Balance
      </div>
      <div className="text-blue-800 text-3xl sm:text-4xl font-bold">
        ₹ {value}
      </div>
    </div>
  );
};
