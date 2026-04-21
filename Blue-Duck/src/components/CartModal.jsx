import React, { useState } from 'react';
import toast from 'react-hot-toast';

const CartModal = ({ isOpen, onClose, cartItems, setCartItems }) => {
  const [retailerName, setRetailerName] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const items = Object.values(cartItems);
  const grandTotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const updateQuantity = (id, newQuantity, minOrder) => {
    if (newQuantity < minOrder) return;
    setCartItems(prev => ({
      ...prev,
      [id]: { ...prev[id], quantity: newQuantity }
    }));
  };

  const removeItem = (id) => {
    setCartItems(prev => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (items.length === 0) {
      return toast.error('Your cart is empty.');
    }
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, grandTotal, retailerName })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success('Order submitted successfully!');
        setCartItems({});
        onClose();
      } else {
        toast.error(data.message || 'Failed to submit order');
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred submitting the order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-3xl p-8 rounded-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        
        <div className="mb-6 border-b border-slate-800 pb-4">
          <h2 className="text-2xl font-bold text-white">Your Wholesale Cart</h2>
          <p className="text-slate-400 text-sm mt-1">Review your items and Minimum Order Quantities.</p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12 text-slate-500">Your cart is empty. Add items from the catalog.</div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between bg-slate-950 p-4 rounded-lg border border-slate-800 gap-4">
                  <div className="flex-1">
                    <h3 className="text-white font-bold">{item.name}</h3>
                    <p className="text-slate-500 text-sm">SKU: {item.sku} | Unit: ₹{item.price.toLocaleString()}</p>
                    <p className="text-blue-400 text-xs mt-1 bg-blue-900/20 inline-block px-2 py-0.5 rounded">MOQ: {item.minOrder}</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg p-1">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 10, item.minOrder)} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white bg-slate-800 rounded">-</button>
                      <span className="w-12 text-center text-white font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 10, item.minOrder)} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white bg-slate-800 rounded">+</button>
                    </div>
                    <div className="w-24 text-right">
                      <p className="text-white font-bold">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-300 p-2">✕</button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-slate-800 pt-6">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Retailer Business Name</label>
                  <input 
                    type="text" 
                    value={retailerName} 
                    onChange={e => setRetailerName(e.target.value)} 
                    placeholder="Enter business name" 
                    required 
                    className="bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition w-full sm:w-64"
                  />
                </div>
                <div className="text-right">
                  <p className="text-slate-400 text-sm">Grand Total</p>
                  <p className="text-3xl font-extrabold text-white">₹{grandTotal.toLocaleString()}</p>
                </div>
              </div>

              <button 
                onClick={handleSubmitOrder} 
                disabled={loading || items.length === 0 || !retailerName} 
                className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition text-lg shadow-lg shadow-emerald-900/20"
              >
                {loading ? 'Processing Order...' : 'Submit Bulk Order'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartModal;
