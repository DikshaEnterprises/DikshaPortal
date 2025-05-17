import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Portal' },
    { path: '/application', label: 'Application' },
    { path: '/callback', label: 'Contact' },
    { path: '/product-contact', label: 'LeadForm' },
  ];

  return (
    <nav className="bg-orange-600 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Company / Brand name */}
        <Link to="/" className="text-xl font-bold hover:text-orange-300">
          Diksha Enterprises
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          {navLinks.map(({ path, label }) => (
            <li key={path}>
              <Link
                to={path}
                className={`hover:text-orange-300 ${
                  location.pathname === path ? 'underline font-semibold' : ''
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
