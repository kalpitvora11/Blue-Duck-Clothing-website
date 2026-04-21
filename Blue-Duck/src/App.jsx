import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import CartModal from './components/CartModal';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [activeModal, setActiveModal] = useState(null);
  
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('blueduck_user');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('blueduck_cart');
    return saved ? JSON.parse(saved) : {};
  });

  const [isAdminView, setIsAdminView] = useState(() => {
    return localStorage.getItem('blueduck_admin') === 'true';
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('blueduck_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('blueduck_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('blueduck_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (isAdminView) {
      localStorage.setItem('blueduck_admin', 'true');
    } else {
      localStorage.removeItem('blueduck_admin');
    }
  }, [isAdminView]);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30">
      <Toaster position="top-right" toastOptions={{
        className: 'bg-slate-800 text-white border border-slate-700',
        style: { background: '#1e293b', color: '#fff' }
      }} />
      
      {isAdminView ? (
        <AdminDashboard onExitAdmin={() => setIsAdminView(false)} />
      ) : (
        <>
          <Navbar 
            user={user} 
            onLogout={handleLogout}
            onLoginClick={() => setActiveModal('login')} 
          />
          <Hero />
          <ProductGrid 
            cartItems={cartItems} 
            setCartItems={setCartItems} 
            onOpenCart={() => setIsCartOpen(true)}
          />
          <ContactForm />
          <Footer onAdminClick={() => {
            const adminPin = window.prompt("Enter Founder Passcode (Default: 1234):");
            if (adminPin === "1234") {
              setIsAdminView(true);
            } else if (adminPin !== null) {
              toast.error("Incorrect passcode.");
            }
          }} />
          
          <LoginModal 
            isOpen={activeModal === 'login'} 
            onClose={() => setActiveModal(null)}
            onSwitch={() => setActiveModal('register')}
            setUser={setUser}
            onAdminLogin={() => setIsAdminView(true)}
          />

          <RegisterModal 
            isOpen={activeModal === 'register'} 
            onClose={() => setActiveModal(null)}
            onSwitch={() => setActiveModal('login')}
          />

          <CartModal 
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cartItems}
            setCartItems={setCartItems}
          />
        </>
      )}
    </div>
  );
}

export default App;