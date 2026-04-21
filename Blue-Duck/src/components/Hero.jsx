import React from 'react';

const Hero = () => {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-slate-800">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1565084888279-aca607ecce0c?auto=format&fit=crop&q=80&w=1920&h=1080" 
          alt="Stacks of premium denim" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-[#142633]"></div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10 px-6">
        <span className="inline-block py-1 px-3 rounded-full bg-blue-900/50 border border-blue-700 text-blue-300 text-sm font-semibold tracking-wider uppercase mb-6">
          B2B Wholesale Portal
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tight drop-shadow-lg">
          Premium Denim, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
            Engineered for Retailers.
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow">
          Stock your shelves with high-quality, durable jeans and cargo pants. BlueDuck provides flexible volume pricing, fast global shipping, and exceptional craftsmanship.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a 
            href="#catalog"
            className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-md font-bold text-lg transition shadow-xl shadow-blue-600/20 w-full sm:w-auto text-center"
          >
            View Wholesale Catalog
          </a>
          <a 
            href="#contact"
            className="bg-slate-900/80 backdrop-blur hover:bg-slate-800 text-white border border-slate-600 px-8 py-4 rounded-md font-bold text-lg transition w-full sm:w-auto text-center"
          >
            Request Samples
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;