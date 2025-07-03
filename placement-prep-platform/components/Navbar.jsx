// src/components/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between relative">
        
        {/* Left Spacer (for centering help) */}
        <div className="w-1/3"></div>
        
        {/* Centered Logo */}
        <div className="w-1/3 text-center">
          <Link to="/" className="text-3xl font-bold block">Get Your Placement</Link>
        </div>
        
        {/* Navigation Links */}
        <div className="w-1/3 flex justify-end space-x-4">
          <Link to="/" className="hover:text-blue-400">Home</Link>
          <Link to="/register" className="hover:text-blue-400">Register</Link>
          <Link to="/login" className="hover:text-blue-400">Login</Link>
          <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
        </div>
      </div>
    </nav>
  );
}
