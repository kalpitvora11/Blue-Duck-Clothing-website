import React from 'react';

const Navbar = ({ onLoginClick, user, onLogout }) => {
  return (
    <nav className="bg-slate-950/90 backdrop-blur-md border-b border-slate-800 py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 hover:opacity-80 transition cursor-pointer">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/20">
            B
          </div>
          <span className="text-xl font-bold tracking-wider text-white uppercase">
            BlueDuck
          </span>
        </a>

        {/* Links */}
        <div className="hidden md:flex items-center space-x-10">
          <a href="#catalog" className="text-sm uppercase tracking-wide text-slate-300 hover:text-blue-400 transition font-semibold">
            Wholesale Catalog
          </a>
          <a href="#contact" className="text-sm uppercase tracking-wide text-slate-300 hover:text-blue-400 transition font-semibold">
            Partner With Us
          </a>
        </div>

        {/* CTA */}
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-white font-bold truncate max-w-[200px]">
                {user.companyName}
              </span>
              <button 
                onClick={onLogout}
                className="text-slate-400 hover:text-red-400 text-sm transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={onLoginClick}
              className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-slate-500 px-6 py-2 rounded-md font-medium transition duration-300 shadow-sm"
            >
              Retailer Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;