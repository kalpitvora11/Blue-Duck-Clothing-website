import React, { useEffect, useState } from 'react';

const AdminDashboard = ({ onExitAdmin }) => {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [orderRes, inquiryRes] = await Promise.all([
        fetch('http://localhost:8000/api/orders'),
        fetch('http://localhost:8000/api/inquiries')
      ]);
      const orderData = await orderRes.json();
      const inquiryData = await inquiryRes.json();
      
      if (orderData.success) setOrders(orderData.data);
      if (inquiryData.success) setInquiries(inquiryData.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
              <span className="bg-blue-600 w-8 h-8 text-xl rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/50">B</span>
              Founder Dashboard
            </h1>
            <p className="text-slate-400 mt-1">Review inbound wholesale orders and retailer inquiries.</p>
          </div>
          <button 
            onClick={onExitAdmin}
            className="bg-slate-800 hover:bg-slate-700 text-white font-medium py-2 px-6 rounded-lg transition border border-slate-700"
          >
            Exit Admin
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-800 pb-4">
          <button 
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-2 rounded-lg font-bold transition ${activeTab === 'orders' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-900'}`}
          >
            Bulk Orders
          </button>
          <button 
            onClick={() => setActiveTab('inquiries')}
            className={`px-6 py-2 rounded-lg font-bold transition ${activeTab === 'inquiries' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-900'}`}
          >
            Partner Inquiries
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-500">Loading data...</div>
        ) : activeTab === 'orders' ? (
          orders.length === 0 ? (
            <div className="text-center py-20 bg-slate-900 rounded-xl border border-slate-800">
              <h3 className="text-xl font-bold text-white mb-2">No Orders Yet</h3>
              <p className="text-slate-500">When retailers submit orders, they will appear here.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {orders.map((order) => (
                <div key={order._id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b border-slate-800 gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        Order: <span className="text-blue-400 font-mono text-sm">{order._id}</span>
                      </h3>
                      <p className="text-slate-400 text-sm mt-1">
                        Retailer: <span className="font-semibold text-slate-200">{order.retailer || 'Guest Retailer'}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-400 text-sm">Grand Total</p>
                      <p className="text-2xl font-bold text-emerald-400">₹{order.grandTotal.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="bg-slate-950 rounded-lg p-4 border border-slate-800/50">
                    <h4 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">Line Items</h4>
                    <div className="space-y-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm">
                          <div className="flex items-center gap-3">
                            <span className="bg-slate-800 text-slate-300 w-8 h-8 rounded flex items-center justify-center font-medium">
                              {item.quantity}x
                            </span>
                            <span className="text-white font-medium">{item.name}</span>
                          </div>
                          <span className="text-slate-400">₹{item.lineTotal.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          inquiries.length === 0 ? (
            <div className="text-center py-20 bg-slate-900 rounded-xl border border-slate-800">
              <h3 className="text-xl font-bold text-white mb-2">No Inquiries Yet</h3>
              <p className="text-slate-500">When retailers submit partner queries, they will appear here.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {inquiries.map((inq) => (
                <div key={inq._id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
                  <div className="flex justify-between items-start mb-4 pb-4 border-b border-slate-800">
                    <div>
                      <h3 className="text-lg font-bold text-white">{inq.companyName}</h3>
                      <p className="text-slate-400 text-sm mt-1">
                        Contact: <span className="text-blue-400">{inq.contactName}</span> | {inq.email}
                      </p>
                    </div>
                    <span className="bg-blue-900/30 text-blue-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {inq.status || 'New'}
                    </span>
                  </div>
                  <div className="mb-4">
                    <span className="text-xs font-semibold text-slate-500 uppercase">Estimated Volume:</span>
                    <span className="ml-2 text-slate-300 bg-slate-800 px-2 py-1 rounded text-sm">{inq.volume}</span>
                  </div>
                  <div className="bg-slate-950 rounded-lg p-4 border border-slate-800 text-slate-300 text-sm italic">
                    "{inq.message}"
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
