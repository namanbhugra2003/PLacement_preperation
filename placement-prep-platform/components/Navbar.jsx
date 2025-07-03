// src/components/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md relative">
      <div className="container mx-auto flex justify-between items-center relative">
        {/* Centered Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link to="/" className="text-2xl font-bold">PlacementPrep</Link>
        </div>

        {/* Navigation Links */}
        <div className="ml-auto space-x-4">
          <Link to="/" className="hover:text-blue-400">Home</Link>
          <Link to="/register" className="hover:text-blue-400">Register</Link>
          <Link to="/login" className="hover:text-blue-400">Login</Link>
          <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
        </div>
      </div>
    </nav>
  );
}
