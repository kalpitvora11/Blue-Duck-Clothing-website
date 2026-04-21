import React, { useState } from 'react';
import toast from 'react-hot-toast';

const RegisterModal = ({ isOpen, onClose, onSwitch }) => {
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/retailers/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName, email, password })
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        toast.success("Registration Successful. Welcome!", { duration: 4000 });
        onSwitch?.(); // Optional: switch to login
        onClose();
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred connecting to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md p-8 rounded-2xl shadow-2xl relative max-h-[95vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">B</div>
          <h2 className="text-2xl font-bold text-white">Join Blue Duck</h2>
          <p className="text-slate-400 text-sm mt-1">Register your business for a wholesale account.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Company Name</label>
            <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition" placeholder="Blue Duck Retailers Ltd" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Business Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition" placeholder="owner@store.com" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition" placeholder="••••••••" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Confirm</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition" placeholder="••••••••" />
            </div>
          </div>
          
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-4">Security</p>
          <div className="text-xs text-slate-400 leading-relaxed">
            By clicking Request Access, you agree to our <span className="text-blue-400 cursor-pointer">Wholesale Agreement</span> and verify you are an authorized business representative.
          </div>

          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition mt-4 disabled:opacity-50">
            {loading ? 'Submitting...' : 'Request Access'}
          </button>
        </form>

        <p className="text-center text-slate-400 text-sm mt-6">
          Already have an account?{' '}
          <button onClick={onSwitch} className="text-blue-400 hover:text-blue-300 font-medium underline underline-offset-4">Sign In</button>
        </p>
      </div>
    </div>
  );
};

export default RegisterModal;