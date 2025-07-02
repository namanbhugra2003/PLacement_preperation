import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;

export default function Register() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Register, 2: OTP
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const [tempUser, setTempUser] = useState(null); // stores hashed password + email
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "https://get-your-placement.onrender.com/api/auth/register",
        form
      );

      if (res.status === 200) {
        setStep(2);
        setTempUser(res.data.tempUser);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "https://get-your-placement.onrender.com/api/auth/verify-otp",
        {
          ...tempUser,
          otp,
        }
      );

      if (res.status === 201) {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      <div className="bg-black bg-opacity-60 p-8 rounded-xl shadow-lg w-80 text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {step === 1 ? "Register" : "Enter OTP"}
        </h2>

        {step === 1 ? (
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block mb-1">Name</label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600"
                placeholder="John Doe"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600"
                placeholder="you@example.com"
              />
            </div>
            <div className="mb-6">
              <label className="block mb-1">Password</label>
              <input
                type="password"
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600"
                placeholder="Enter password"
              />
            </div>
            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
            <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold">
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <div className="mb-6">
              <label className="block mb-2">OTP sent to {form.email}</label>
              <input
                type="text"
                name="otp"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600"
                placeholder="Enter 6-digit OTP"
              />
            </div>
            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
            <button className="w-full bg-green-600 hover:bg-green-700 py-2 rounded font-semibold">
              Verify OTP
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
