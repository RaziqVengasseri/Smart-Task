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
    <div className="max-w-md w-full bg-slate-900/80 backdrop-blur-xl shadow-2xl shadow-pink-500/20 border border-pink-500/30 rounded-2xl p-8">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-pink-600 to-rose-600 rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg shadow-pink-500/50">
          <UserPlus className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Create an Account</h2>
        <p className="text-gray-400 text-sm mt-1">
          Join <span className="font-bold text-pink-400">Smart Task</span>{" "}
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
        {FIELDS.map((field) => {
          const IconComponent = field.icon;
          return (
            <div key={field.name} className={Inputwrapper}>
              {IconComponent && <IconComponent className="text-pink-400 w-5 h-5 mr-2" />}
              <input
                type={field.type}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={(e) =>
                  setFormData({ ...formData, [field.name]: e.target.value })
                }
                className="w-full focus:outline-none text-sm text-white bg-transparent placeholder-gray-500"
                required
              />
            </div>
          );
        })}

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
      <p className="text-center text-sm text-gray-400 mt-6">
        Already have an account?{" "}
        <button
          onClick={onSwitchMode}
          className="text-pink-400 hover:text-pink-300 hover:underline font-bold transition-colors"
        >
          Log In
        </button>
      </p>
    </div>
  );
};

export default SignUp;