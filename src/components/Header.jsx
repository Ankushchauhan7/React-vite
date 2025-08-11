import React, { useState } from "react";
import { Link } from "react-router";

function Header() {
  const [staus, setStatus] = useState(true);
  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <span className="font-bold text-lg">Logo</span>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about-us" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <button
          onClick={() => {
            setStatus((prev) => !prev);
          }}
          className="bg-white cursor-p text-blue-600 px-4 py-2 rounded hover:bg-blue-100"
        >
          {staus ? "Log In" : "Log Out"}
        </button>
      </div>
    </header>
  );
}

export default Header;
