import React, { useState } from 'react';
import toast from 'react-hot-toast';

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    volume: '50 - 200 units',
    message: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsSubmitted(true);
        setFormData({ companyName: '', contactName: '', email: '', volume: '50 - 200 units', message: '' });
      } else {
        toast.error('Failed to submit inquiry.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-slate-900 border-t border-slate-800">
      <div className="max-w-4xl mx-auto bg-slate-950 border border-slate-800 rounded-3xl p-8 md:p-14 shadow-2xl relative overflow-hidden">

        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl rounded-full"></div>

        <div className="text-center mb-10 relative z-10">
          <h2 className="text-4xl font-extrabold text-white mb-4">Partner With Us</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Interested in bulk pricing or custom manufacturing? Fill out the inquiry form below and our B2B team will respond within 24 hours.
          </p>
        </div>

        {isSubmitted ? (
          <div className="bg-emerald-900/20 border border-emerald-800 rounded-xl p-10 text-center relative z-10">
            <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Inquiry Received!</h3>
            <p className="text-emerald-400">Thank you for reaching out. A dedicated wholesale rep will email you shortly with our full pricing deck.</p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-8 text-sm text-slate-400 hover:text-white underline transition"
            >
              Submit another inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Company Name *</label>
                <input required type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition" placeholder="Your Retail Store LLC" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Contact Name *</label>
                <input required type="text" name="contactName" value={formData.contactName} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition" placeholder="Jane Doe" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Work Email *</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition" placeholder="buyer@yourstore.com" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Estimated Monthly Volume</label>
                <select name="volume" value={formData.volume} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3.5 text-slate-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition">
                  <option>50 - 200 units</option>
                  <option>201 - 500 units</option>
                  <option>501 - 1000 units</option>
                  <option>1000+ units</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Message / Inquiry Details</label>
              <textarea
                required
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition resize-none"
                placeholder="Tell us about your target demographic, preferred fits, and any specific denim needs..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-lg py-4 rounded-lg transition shadow-xl shadow-blue-500/20"
            >
              {loading ? 'Submitting...' : 'Submit Bulk Inquiry'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default ContactForm;