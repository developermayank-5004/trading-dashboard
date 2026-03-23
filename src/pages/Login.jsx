import React, { useState } from "react";
import { login, signup } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  console.log("LOGIN PAGE RENDERED"); // 🔥 DEBUG LINE

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields ⚠️");
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      navigate("/");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!email || !password) {
      alert("Please fill all fields ⚠️");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters ⚠️");
      return;
    }

    try {
      setLoading(true);
      await signup(email, password);
      alert("Signup Successful 🎉");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="flex justify-center items-center min-h-screen bg-black text-white">
    
    <div className="bg-gray-900 p-8 rounded-xl w-80">

      <h2 className="text-2xl mb-6 text-center font-bold">
        Login / Signup
      </h2>

      <input
        type="email"
        placeholder="Email"
        className="p-2 mb-3 w-full rounded bg-gray-800"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="p-2 mb-5 w-full rounded bg-gray-800"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="bg-blue-500 w-full py-2 mb-3 rounded"
      >
        Login
      </button>

      <button
        onClick={handleSignup}
        className="bg-green-500 w-full py-2 rounded"
      >
        Signup
      </button>

    </div>
  </div>
);
};

export default Login;