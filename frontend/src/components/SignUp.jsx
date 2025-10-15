import { useState, useEffect } from "react";
import axios from "axios";
import { UserPlus } from "lucide-react";
import {
  Inputwrapper,
  FIELDS,
  BUTTONCLASSES,
  MESSAGE_SUCCESS,
  MESSAGE_ERROR,
} from "../assets/dummy";

// Constants
const API_URL = "http://localhost:4000";
const INITIAL_FORM = { name: "", email: "", password: "" };

const SignUp = ({ onSwitchMode }) => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    console.log("SignUp form data changed:", formData);
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const { data } = await axios.post(`${API_URL}/api/user/register`, formData);
      console.log("SignUp successful:", data);
      setMessage({
        text: "Account created successfully! You can now log in.",
        type: "success",
      });
      setFormData(INITIAL_FORM);
    } catch (err) {
      console.error("SignUp error:", err);
      setMessage({
        text:
          err.response?.data?.message ||
          "Something went wrong. Please try again later.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full bg-white shadow-lg border border-purple-100 rounded-xl p-8">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full mx-auto flex items-center justify-center mb-4">
          <UserPlus className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Create an Account</h2>
        <p className="text-gray-500 text-sm mt-1">
          Join <span className="font-semibold text-purple-600">Smart Task</span>{" "}
          and simplify your workflow.
        </p>
      </div>

      {/* Message */}
      {message.text && (
        <div
          className={
            message.type === "success" ? MESSAGE_SUCCESS : MESSAGE_ERROR
          }
        >
          {message.text}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {FIELDS.map(({ name, type, placeholder, icon: Icon }) => (
          <div key={name} className={Inputwrapper}>
            {Icon && <Icon className="text-purple-500 w-5 h-5 mr-2" />} {/* ✅ Fix */}
            <input
              type={type}
              placeholder={placeholder}
              value={formData[name]}
              onChange={(e) =>
                setFormData({ ...formData, [name]: e.target.value })
              }
              className="w-full focus:outline-none text-sm text-gray-700 placeholder-gray-400"
              required
            />
          </div>
        ))}

        <button type="submit" className={BUTTONCLASSES} disabled={loading}>
          {loading ? (
            "Signing Up..."
          ) : (
            <>
              <UserPlus className="w-4 h-4 mr-1" /> Sign Up
            </>
          )}
        </button>
      </form>

      {/* Switch to Login */}
      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account?{" "}
        <button
          onClick={onSwitchMode}
          className="text-purple-600 hover:text-purple-700 hover:underline font-medium transition-colors"
        >
          Log In
        </button>
      </p>
    </div>
  );
};

export default SignUp;
