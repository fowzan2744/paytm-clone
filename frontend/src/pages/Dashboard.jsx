import axios from "axios";
import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { DepositMoney } from "./DepositMoney";

import { Button } from "../components/Button";

export const Dashboard = () => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://paytm-clone-backend-d7xc.onrender.com/api/v1/account/balance", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBalance(response.data.balance);
      } catch (error) {
        console.error("Failed to fetch balance:", error);
        setBalance(0); // fallback
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);

  return (
    <div>
      <Appbar />
      <div className="m-8">
        {loading ? (
          <div>Loading balance...</div>
        ) : (
          <Balance value={balance} />
        )
      }
        <div className="flex justify-between w-full mb-6 p-10 gap-10 lg:gap-4">
        
        
          <div>
            <button
              onClick={() => {
                window.location.href = "/withdraw";
              }}
              className="bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold cursor-pointer px-4 py-1 sm:px-8 lg:py-3"
            >
              WITHDRAW MONEY
            </button>
          </div>
        
          <div>
            <button
              onClick={() => {
                window.location.href = "/deposit";
              }}
              className="bg-green-600 hover:bg-green-700 text-white  rounded-lg font-semibold cursor-pointer px-4 py-1 sm:px-8 lg:py-3"
            >
              DEPOSIT MONEY
            </button>
          </div>
        </div>

        <Users />
      </div>
    </div>
  );
};
