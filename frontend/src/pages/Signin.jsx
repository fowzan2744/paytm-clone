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
    return <div className="bg-slate-300 h-screen grid grid-cols-2 justify-center items-center  ">
        <div className=" flex justify-center items-center">
    <svg width="1000" height="250" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="10" y="45" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="40">
        <tspan fill="#002970">b</tspan>
        <tspan fill="#00baf2">a</tspan>
        <tspan fill="#002970">y</tspan>
        <tspan fill="#00baf2">TM</tspan>
      </text>
    </svg>
  </div>

    <div className="flex flex-col justify-center items-center ">
    <div className="rounded-lg bg-white w-150 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox  onChange={e => {
        setEmail(e.target.value);
        }} placeholder="YourEmail@gmail.com" label={"Email"} />
        <InputBox onChange={e => {
        setPassword(e.target.value);
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
        <Button onClick={async () => {
            const response = await axios.post("https://paytm-clone-backend-d7xc.onrender.com/api/v1/user/signin", {
            email,
            password,
            });
            localStorage.setItem("token", response.data.token)
            navigate("/dashboard")
        }} label={"Sign in"} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
    </div>
    </div>
</div>
}