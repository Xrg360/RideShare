import logo from "./logo.svg";
import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import {Route, Routes } from "react-router-dom"

import Home from "./pages/Home";
import DriverDashboard from "./pages/DriverDash";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/signin" element={<SignIn/>} />
    </Routes>
  );
}

export default App;
