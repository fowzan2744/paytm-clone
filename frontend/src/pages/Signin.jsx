import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export const Signin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col lg:flex-row">
        
      <div className="flex justify-center items-center p-8 lg:w-1/2 bg-white flex-row lg:flex-col  ">
  <div className="text-center ">
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
              Secure Digital Payments
            </h2>
            <p className="text-base leading-relaxed">
              Join millions of users who trust our platform for fast, secure, and reliable financial transactions.
            </p>
          </div>
    </div>

    <div className="flex justify-center items-center p-4 lg:w-1/2">
    <div className="bg-white w-full max-w-md rounded-lg shadow-xl p-6 md:p-8">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox  onChange={e => {
        setEmail(e.target.value);
        }} placeholder="YourEmail@gmail.com" label={"Email"} />
        <InputBox onChange={e => {
        setPassword(e.target.value);
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
       <Button
  onClick={async () => {
    try {
      const response = await axios.post(
        "https://paytm-clone-backend-d7xc.onrender.com/api/v1/user/signin",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
     if (
        error.response &&
        error.response.data &&
        error.response.data.message === "Error while logging in"
      ) {
        alert("Invalid credentials. Please try again.");
      } else {
        alert("Sign in failed. Please try again.");
        console.error(error);
          }
        }
      }}
      label="Sign in"
    />

        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
    </div>
    </div>
</div>
}