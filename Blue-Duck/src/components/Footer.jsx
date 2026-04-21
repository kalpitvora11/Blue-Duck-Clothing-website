import React from 'react';

const Footer = ({ onAdminClick }) => {
  return (
    <footer className="bg-slate-950 py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 opacity-50">
          <div className="w-6 h-6 bg-slate-700 rounded flex items-center justify-center text-white font-bold text-xs">
            B
          </div>
          <span className="font-bold tracking-wider text-white uppercase text-sm">
            BlueDuck
          </span>
        </div>
        <p className="text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} BlueDuck Wholesale Denim. All rights reserved. Secure B2B portal.
        </p>
        <div className="flex gap-6">
          <button onClick={onAdminClick} className="text-blue-500 hover:text-blue-400 text-sm transition font-bold">
            Founder Access
          </button>
          <a href="#" className="text-slate-500 hover:text-slate-300 text-sm transition">Terms of Sale</a>
          <a href="#" className="text-slate-500 hover:text-slate-300 text-sm transition">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;