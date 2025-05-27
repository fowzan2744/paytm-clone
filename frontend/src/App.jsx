import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import { UpdateProfile } from "./pages/UpdateProfile";
import { DepositMoney } from "./pages/DepositMoney";
import { WithdrawMoney } from "./pages/WithdrawMoney";

function App() {
  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/send" element={<SendMoney />} />
      <Route path="/update" element={<UpdateProfile />} />
      <Route path="/deposit" element={<DepositMoney />} />
      <Route path="/withdraw" element={<WithdrawMoney/>} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App