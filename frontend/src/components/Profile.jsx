import { useState, useEffect } from "react";
import axios from "axios";
import {
  Lock,
  ChevronLeft,
  Shield,
  LogOut,
  Save,
  UserCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  INPUT_WRAPPER,
  FULL_BUTTON,
  SECTION_WRAPPER,
  BACK_BUTTON,
  DANGER_BTN,
  personalFields,
  securityFields,
} from "../assets/dummy";

const API_URL = "http://localhost:4000";

export default function Profile({ setCurrentUser, onLogout }) {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const navigate = useNavigate();

  // ✅ Fetch current user info
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get(`${API_URL}/api/user/me`, {
        headers: { Authorization: `Bearer ${token}` }, // 🔸 Will change for cookie-based auth
      })
      .then(({ data }) => {
        if (data.success) {
          setProfile({ name: data.user.name, email: data.user.email });
        } else {
          toast.error(data.message || "Failed to load user profile");
        }
      })
      .catch(() => toast.error("Unable to load profile"));
  }, []);

  // ✅ Save updated profile
  const saveProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        `${API_URL}/api/user/profile`,
        { name: profile.name, email: profile.email },
        { headers: { Authorization: `Bearer ${token}` } } // 🔸 Will change for cookie-based auth
      );

      if (data.success) {
        setCurrentUser((prev) => ({
          ...prev,
          name: profile.name,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
            profile.name
          )}&background=random`,
        }));
        toast.success("Profile updated successfully!");
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    }
  };

  // ✅ Change password
  const changePassword = async (e) => {
    e.preventDefault();

    if (passwords.new !== passwords.confirm) {
      return toast.error("Passwords do not match");
    }

    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        `${API_URL}/api/user/password`,
        {
          currentPassword: passwords.current,
          newPassword: passwords.new,
        },
        { headers: { Authorization: `Bearer ${token}` } } // 🔸 Will change for cookie-based auth
      );

      if (data.success) {
        toast.success("Password changed successfully!");
        setPasswords({ current: "", new: "", confirm: "" });
      } else {
        toast.error(data.message || "Password update failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Password change failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="max-w-4xl mx-auto p-6">
        {/* Back Button */}
        <button onClick={() => navigate(-1)} className={BACK_BUTTON}>
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Smart Task
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-600 to-rose-600 flex items-center justify-center text-white text-2xl font-bold shadow-2xl shadow-pink-500/50">
            {profile.name ? profile.name[0].toUpperCase() : "S"}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">
              Account Settings
            </h1>
            <p className="text-gray-400 text-sm">
              Manage your personal information and security preferences
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Personal Info Section */}
          <section className={SECTION_WRAPPER}>
            <div className="flex items-center gap-2 mb-6">
              <UserCircle className="text-pink-400 w-5 h-5" />
              <h2 className="text-xl font-bold text-white">
                Personal Information
              </h2>
            </div>

            <form onSubmit={saveProfile} className="space-y-4">
              {personalFields.map(({ name, type, placeholder, icon: Icon }) => (
                <div key={name} className={INPUT_WRAPPER}>
                  {Icon && <Icon className="text-pink-400 w-5 h-5 mr-2" />}
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={profile[name]}
                    onChange={(e) =>
                      setProfile({ ...profile, [name]: e.target.value })
                    }
                    className="w-full text-sm focus:outline-none bg-transparent text-white placeholder-gray-500"
                    required
                  />
                </div>
              ))}
              <button className={FULL_BUTTON}>
                <Save className="w-4 h-4" /> Save Changes
              </button>
            </form>
          </section>

          {/* Security Section */}
          <section className={SECTION_WRAPPER}>
            <div className="flex items-center gap-2 mb-6">
              <Shield className="text-pink-400 w-5 h-5" />
              <h2 className="text-xl font-bold text-white">Security</h2>
            </div>

            <form onSubmit={changePassword} className="space-y-4">
              {securityFields.map(({ name, placeholder }) => (
                <div key={name} className={INPUT_WRAPPER}>
                  <Lock className="text-pink-400 w-5 h-5 mr-2" />
                  <input
                    type="password"
                    placeholder={placeholder}
                    value={passwords[name]}
                    onChange={(e) =>
                      setPasswords({ ...passwords, [name]: e.target.value })
                    }
                    className="w-full text-sm focus:outline-none bg-transparent text-white placeholder-gray-500"
                    required
                  />
                </div>
              ))}
              <button className={FULL_BUTTON}>
                <Shield className="w-4 h-4" /> Change Password
              </button>

              {/* Logout / Danger Zone */}
              <div className="mt-8 pt-6 border-t border-pink-500/20">
                <h3 className="text-rose-400 font-bold mb-4 flex items-center gap-2">
                  <LogOut className="w-4 h-4" /> Danger Zone
                </h3>
                <button onClick={onLogout} className={DANGER_BTN}>
                  Logout
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}