import React, { useState } from "react";
import { Link } from "react-router";

function Header() {
  const [status, setStatus] = useState(true);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link to="/" className="font-extrabold text-2xl tracking-wide hover:opacity-90 transition">
          MyStore
        </Link>

        {/* Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8 text-lg font-medium">
            <li>
              <Link 
                to="/" 
                className="hover:text-yellow-300 transition-colors duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/about-us" 
                className="hover:text-yellow-300 transition-colors duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className="hover:text-yellow-300 transition-colors duration-300"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Login Button */}
        <button
          onClick={() => setStatus((prev) => !prev)}
          className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-full 
                     hover:bg-blue-50 hover:scale-105 transition transform shadow 
                     duration-300 focus:outline-none"
        >
          {status ? "Log In" : "Log Out"}
        </button>
      </div>
    </header>
  );
}

export default Header;
