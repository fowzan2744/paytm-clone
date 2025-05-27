import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const UpdateProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUpdate = async () => {
    try {
      const updatePayload = {};
      if (firstName) updatePayload.firstName = firstName;
      if (lastName) updatePayload.lastName = lastName;
      if (password) updatePayload.password = password;

      const token = localStorage.getItem("token");

      const response = await axios.put(
        "https://paytm-clone-backend-d7xc.onrender.com/api/v1/user",
        updatePayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);
      navigate("/dashboard"); // optional redirect
    } catch (error) {
      alert("Failed to update profile. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col lg:flex-row">
      {/* Left Info Section */}
      <div className="flex justify-center items-center p-8 lg:w-1/2 bg-white flex-row lg:flex-col">
        <div className="text-center">
          <svg
            className="w-40 h-16 sm:w-60 sm:h-24 md:w-80 md:h-28 lg:w-[500px] lg:h-[150px]"
            viewBox="0 0 200 60"
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
        <div className="max-w-md mx-auto text-gray-600">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Keep Your Profile Updated
          </h2>
          <p className="text-base leading-relaxed">
            Make sure your account information is always up-to-date for a seamless experience.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex justify-center items-center p-4 lg:w-1/2">
        <div className="bg-white w-full max-w-md rounded-lg shadow-xl p-6 md:p-8">
          <Heading label={"Update Profile"} />
          <SubHeading label={"Change your personal details"} />

          <InputBox
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="New First Name"
            label={"First Name"}
          />
          <InputBox
            onChange={(e) => setLastName(e.target.value)}
            placeholder="New Last Name"
            label={"Last Name"}
          />
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            label={"Password"}
            type="password"
          />

          <div className="pt-4">
            <Button onClick={handleUpdate} label="Update" />
          </div>

          <BottomWarning
            label={"Want to go back?"}
            buttonText={"Dashboard"}
            to={"/dashboard"}
          />
        </div>
      </div>
    </div>
  );
};
