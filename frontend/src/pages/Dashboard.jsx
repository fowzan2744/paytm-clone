import axios from "axios";
import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

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
        )}
        <Users />
      </div>
    </div>
  );
};
