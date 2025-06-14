import { useEffect, useState } from "react";
import axios from "axios";

export const Appbar = () => {
  const [email, setEmail] = useState("Loading...");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setEmail("Guest");
      return;
    }

    axios.get("https://paytm-clone-backend-d7xc.onrender.com/api/v1/user/me/", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      setEmail(response.data.email);
    }).catch(() => {
      setEmail("Unknown User");
    });
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/signin";
  };

  const handleUpdate = () => {
    window.location.href = "/update";
  };

  return (
    <div className="shadow h-16 flex justify-between items-center px-4 relative bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="text-center ">
  <svg
      className="w-20 h-10 sm:w-60 sm:h-24 md:w-80 md:h-28 lg:w-[250px] lg:h-[250px]"
      viewBox="0 0 220 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="10"
        y="45"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        fontSize="40"
      >
        <tspan fill="#002970">p</tspan>
        <tspan fill="#00baf2">a</tspan>
        <tspan fill="#002970">y</tspan>
        <tspan fill="#00baf2">TM</tspan>
      </text>
    </svg>
    </div>
      <div className="flex items-center gap-3 relative ">
        <div className="flex flex-col items-end mr-2">
          <span className="text-xs text-gray-500">Signed in as</span>
          <span className="text-sm font-medium">{email}</span>
        </div>

        {/* Avatar */}
        <div
          className="rounded-full h-12 w-12 bg-slate-200 flex items-center justify-center text-xl cursor-pointer relative"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {email ? email[0].toUpperCase() : "U"}

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 top-14 bg-white shadow-md border rounded-md py-2 w-32 z-50">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={handleLogout}
              >
                Logout
              </button>

              <button
                className="block w-full text-left px-4 py-4 hover:bg-gray-100"
                onClick={handleUpdate}
              >
                Change Password
              </button>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};
