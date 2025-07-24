// src/pages/Login.tsx
import { useState } from "react";
import Input from "../components/Input"; // assuming you already have the reusable Input component
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../app/store";
import { loginSuccess } from "../app/authSlice";
import api from "../services/api";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await api.post("auth/login", formData, {
        withCredentials: true,
      });
      console.log("Login successful", res.data);
      dispatch(loginSuccess(res.data));
      navigate("/"); // navigate to home or dashboard
    } catch (err: any) {
      console.log(err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

        <div className="space-y-4">
          <Input
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          <Input
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-semibold transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
}
