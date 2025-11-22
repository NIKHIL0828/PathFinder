// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { LayoutDashboard, Home as HomeIcon } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <span className="logo-icon">🚀</span> PathFinder
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-item">
            <HomeIcon size={18} /> Home
          </Link>
          <Link to="/dashboard" className="nav-item">
            <LayoutDashboard size={18} /> Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;