import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { INPUTWRAPPER, BUTTON_CLASSES } from "../assets/dummy";

const INITIAL_FORM = { email: "", password: "" };

const Login = ({ onSubmit, onSwitchMode }) => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:4000";

  /** 🔁 Auto-login if token exists */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token) return;

    (async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (data.success) {
          onSubmit?.({ token, userId, ...data.user });
          toast.success("Welcome back! Redirecting...");
          navigate("/");
        } else {
          localStorage.clear();
        }
      } catch {
        localStorage.clear();
      }
    })();
  }, [navigate, onSubmit]);

  /** 🧭 Handle form submission */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rememberMe) {
      toast.error('Please enable "Remember Me" to log in.');
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(`${BASE_URL}/api/user/login`, formData);

      if (!data.token) throw new Error(data.message || "Login failed.");

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id);

      onSubmit?.({ token: data.token, userId: data.user.id, ...data.user });

      setFormData(INITIAL_FORM);
      toast.success("Login successful! Redirecting...");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const togglePassword = () => setShowPassword((prev) => !prev);
  const handleSwitchMode = () => {
    toast.dismiss();
    onSwitchMode?.();
  };

  const fields = [
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      icon: Mail,
    },
    {
      name: "password",
      type: showPassword ? "text" : "password",
      placeholder: "Password",
      icon: Lock,
      isPassword: true,
    },
  ];

  return (
    <div className="max-w-md w-full bg-white rounded-2xl shadow-md border border-purple-100 p-8 transition-all duration-300">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />

      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-full flex items-center justify-center">
          <LogIn className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
        <p className="text-gray-500 text-sm mt-1">
          Sign in to continue with <span className="font-semibold text-purple-600">Smart Task</span>
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map(({ name, type, placeholder, icon: Icon, isPassword }) => (
          <div key={name} className={INPUTWRAPPER}>
            <Icon className="text-purple-500 w-5 h-5 mr-2" />
            <input
              type={type}
              placeholder={placeholder}
              value={formData[name]}
              onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
              className="w-full focus:outline-none text-sm text-gray-700"
              required
            />
            {isPassword && (
              <button
                type="button"
                onClick={togglePassword}
                className="ml-2 text-gray-500 hover:text-purple-500 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            )}
          </div>
        ))}

        <div className="flex items-center">
          <input
            id="rememberMe"
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-400"
            required
          />
          <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
            Remember Me
          </label>
        </div>

        <button type="submit" className={`${BUTTON_CLASSES} flex justify-center items-center`} disabled={loading}>
          {loading ? (
            <span>Logging in...</span>
          ) : (
            <>
              <LogIn className="w-4 h-4 mr-1" /> Log In
            </>
          )}
        </button>
      </form>

      {/* Footer */}
      <p className="text-center text-sm text-gray-600 mt-6">
        Don’t have an account?{" "}
        <button
          type="button"
          onClick={handleSwitchMode}
          className="text-purple-600 hover:text-purple-700 hover:underline font-medium transition-colors"
        >
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default Login;
