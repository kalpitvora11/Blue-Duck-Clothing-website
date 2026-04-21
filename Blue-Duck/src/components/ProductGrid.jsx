import React from 'react';
import toast from 'react-hot-toast';

const ProductGrid = ({ cartItems, setCartItems, onOpenCart }) => {
  const products = [
    {
      id: 1,
      name: "Classic Slim Fit Jeans",
      sku: "BD-SLIM-01",
      minOrder: 50,
      price: 18500, // Normalized for calculation
      priceTier: "18500 - 22000",
      image: "./public/images/jeans1.png",
    },
    {
      id: 2,
      name: "Rugged Cargo Pants",
      sku: "BD-CRGO-09",
      minOrder: 100,
      price: 21000,
      priceTier: "21000 - 25000",
      image: "./public/images/jeans2.png",
    },
    {
      id: 3,
      name: "Vintage Relaxed Fit",
      sku: "BD-VLX-44",
      minOrder: 50,
      price: 19000,
      priceTier: "19000 - 23500",
      image: "./public/images/jeans3.png",
    },
  ];

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existing = prev[product.id];
      if (existing) {
        toast.error(`${product.name} is already in the cart!`);
        return prev;
      }
      toast.success(`${product.name} added to cart!`);
      return {
        ...prev,
        [product.id]: {
          ...product,
          quantity: product.minOrder // Default to MOQ
        }
      };
    });
  };

  const totalCartVariants = Object.keys(cartItems).length;

  return (
    <section id="catalog" className="py-24 px-6 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-800 pb-6 gap-4">
          <div>
            <h2 className="text-4xl font-extrabold text-white mb-2">Featured Wholesale Lines</h2>
            <p className="text-slate-400 text-lg">High-margin staples ready to ship to your retail floor.</p>
          </div>
          <button 
            onClick={onOpenCart}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-blue-900/20 transition flex items-center gap-3 group"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            View Cart ({totalCartVariants} items)
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <div key={product.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-600 transition duration-300 group shadow-lg">
              <div className="h-80 bg-slate-800 relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition duration-700"
                />
                <div className="absolute top-4 right-4 bg-slate-950/90 backdrop-blur border border-slate-700 text-xs font-bold text-slate-200 px-3 py-1.5 rounded-full uppercase tracking-widest shadow-md">
                  {product.sku}
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">{product.name}</h3>
                
                <div className="space-y-3 bg-slate-950 p-4 rounded-lg border border-slate-800">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400 font-medium">Min. Order:</span>
                    <span className="text-blue-400 font-bold bg-blue-900/30 px-2 py-1 rounded">{product.minOrder} units</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400 font-medium">Est. Volume Pricing:</span>
                    <span className="text-white font-bold">₹{product.price.toLocaleString()} <span className="text-slate-500 font-normal">/ unit</span></span>
                  </div>
                </div>

                <button 
                  onClick={() => handleAddToCart(product)}
                  className={`w-full mt-6 py-3.5 rounded-lg border transition font-bold text-lg ${
                    cartItems[product.id] 
                      ? 'bg-emerald-600 border-emerald-500 text-white shadow-emerald-900/30' 
                      : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700 hover:border-slate-500'
                  }`}
                >
                  {cartItems[product.id] ? '✓ In Cart' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;