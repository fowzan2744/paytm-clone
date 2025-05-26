import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios";
import { useNavigate } from "react-router-dom"

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen grid grid-cols-2 justify-center">
       
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

    <div className="flex flex-col justify-center items-center align-bottom">
    
    <div className="rounded-lg bg-white w-150 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox onChange={e => {
        setFirstName(e.target.value);
        }} placeholder="John" label={"First Name"} />
        <InputBox onChange={(e) => {
        setLastName(e.target.value);
        }} placeholder="Doe" label={"Last Name"} />
        <InputBox onChange={e => {
        setEmail(e.target.value);
        }} placeholder="harkirat@gmail.com" label={"Email"} />
        <InputBox onChange={(e) => {
        setPassword(e.target.value)
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
        <Button onClick={async () => {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
            email,
            password,
            firstName,
            lastName,
            });
            localStorage.setItem("token", response.data.token)
            navigate("/dashboard")
        }} label={"Sign up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
    </div>
    </div>
</div>
}