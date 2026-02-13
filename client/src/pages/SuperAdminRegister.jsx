import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerSuperAdmin } from "../utils/api";

function SuperAdminRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rollNumber: "",
    batch: "",
    superSecretCode: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await registerSuperAdmin(formData);
      alert("👑 Super Admin account created successfully! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-yellow-500 rounded-full blur-3xl opacity-10"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-10"></div>
      </div>

      <div className="relative min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Side */}
          <div className="hidden lg:flex flex-col justify-center">
            <div className="mb-10">
              <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-3xl shadow-2xl mb-8">
                <span className="text-6xl">👑</span>
              </div>

              <h1 className="text-5xl font-extrabold text-white leading-tight mb-6">
                Super Admin
                <br />
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Master Control
                </span>
              </h1>

              <p className="text-lg text-purple-300 leading-relaxed max-w-md">
                Highest level of system access. Full control over users,
                administrators, and all platform operations.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: "🛡️",
                  title: "Complete Authority",
                  text: "Manage all users and administrators",
                },
                {
                  icon: "⚡",
                  title: "System Control",
                  text: "Access all features and settings",
                },
                {
                  icon: "🔒",
                  title: "Maximum Security",
                  text: "Protected by secret authentication",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 bg-white/5 backdrop-blur-lg rounded-2xl p-5 border border-purple-500/30"
                >
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <h3 className="text-white font-semibold">
                      {item.title}
                    </h3>
                    <p className="text-purple-300 text-sm">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side Form */}
          <div className="flex flex-col justify-center w-full">

            <Link
              to="/"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-white transition mb-6"
            >
              ← Back to Home
            </Link>

            <div className="bg-slate-900/80 backdrop-blur-2xl rounded-3xl shadow-[0_0_50px_rgba(255,200,0,0.15)] p-10 border border-yellow-500/40">

              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white">
                  Create Super Admin
                </h2>
                <p className="text-purple-300 text-sm mt-2">
                  Highest privilege account
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-500/20 border-l-4 border-red-500 rounded-lg">
                  <p className="text-red-300 text-sm font-semibold">
                    ⚠️ {error}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Name + Email */}
                <div className="grid md:grid-cols-2 gap-6">
                  <InputField
                    label="Full Name *"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                  />
                  <InputField
                    label="Email Address *"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="admin@college.edu"
                  />
                </div>

                {/* Roll + Batch */}
                <div className="grid md:grid-cols-2 gap-6">
                  <InputField
                    label="Roll Number *"
                    name="rollNumber"
                    value={formData.rollNumber}
                    onChange={handleChange}
                    placeholder="2022CS001"
                  />
                  <InputField
                    label="Batch (Passout Year) *"
                    name="batch"
                    value={formData.batch}
                    onChange={handleChange}
                    placeholder="2026"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold tracking-wide text-purple-200 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={6}
                      placeholder="Minimum 6 characters"
                      className="w-full px-5 py-3.5 bg-slate-800/70 border border-purple-600 rounded-xl text-white placeholder-purple-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 outline-none transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400 hover:text-white"
                    >
                      👁️
                    </button>
                  </div>
                </div>

                {/* Secret Code */}
                <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-2xl p-6 backdrop-blur-md">
                  <label className="block text-sm font-semibold tracking-wide text-yellow-400 mb-3">
                    🔐 Super Admin Secret Code *
                  </label>

                  <div className="relative">
                    <input
                      type={showCode ? "text" : "password"}
                      name="superSecretCode"
                      value={formData.superSecretCode}
                      onChange={handleChange}
                      required
                      placeholder="Enter the master secret code"
                      className="w-full px-5 py-3.5 bg-slate-900/70 border border-yellow-600 rounded-xl text-white placeholder-yellow-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCode(!showCode)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-yellow-400 hover:text-white"
                    >
                      👁️
                    </button>
                  </div>

                  <p className="mt-3 text-xs text-yellow-300">
                    ⚠️ This code grants COMPLETE SYSTEM ACCESS. Only authorized
                    personnel should have this code.
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 tracking-wide bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 text-white font-bold text-lg rounded-xl shadow-2xl transition transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Creating Account..." : "👑 Create Super Admin Account"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-purple-300 text-sm">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-yellow-400 hover:text-yellow-300 font-semibold underline"
                  >
                    Login Here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Reusable Input Component */
function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div>
      <label className="block text-sm font-semibold tracking-wide text-purple-200 mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
        className="w-full px-5 py-3.5 bg-slate-800/70 border border-purple-600 rounded-xl text-white placeholder-purple-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 outline-none transition"
      />
    </div>
  );
}

export default SuperAdminRegister;
