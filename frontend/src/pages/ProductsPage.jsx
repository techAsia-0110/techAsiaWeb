import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowLeft, Download, Loader2 } from 'lucide-react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { API_BASE_URL } from '../config/api';

const ProductList = ({ products, selectedProduct, onSelectProduct, isLoading }) => (
  <aside>
    <h2 className="text-2xl font-bold text-zinc-800 mb-6 pb-4 border-b border-slate-200">
      All Products
    </h2>
    {isLoading ? (
        <div className="flex justify-center items-center h-48">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        </div>
    ) : (
      <div className="space-y-3 max-h-[80vh] overflow-y-auto pr-4">
        {products.map((product) => (
          <div
            key={product._id}
            onClick={() => onSelectProduct(product)}
            className={`flex items-start gap-4 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
              selectedProduct?._id === product._id ? 'bg-orange-100 shadow-md' : 'hover:bg-slate-100'
            }`}
          >
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-16 h-16 object-contain rounded-md flex-shrink-0 bg-slate-200 p-1" 
            />
            <div>
              <h3 className="font-semibold text-zinc-800 text-sm leading-tight">{product.title}</h3>
            </div>
          </div>
        ))}
      </div>
    )}
  </aside>
);

const ProductDetail = ({ product, onBack }) => {
    if (!product) return null;
    
    const whatsappNumber = '917666308198';
    const message = `Hello, I'm interested in your product: ${product.title}.`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.article
      key={product._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-orange-600 font-semibold mb-6 hover:underline lg:hidden"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Products
        </button>
      )}
      <div className="relative w-full h-80 bg-slate-100 rounded-lg overflow-hidden mb-8 group">
        <img src={product.image} alt={product.title} className="w-full h-full object-contain p-4" />
        <a
          href={product.image}
          download
          className="absolute top-3 right-3 bg-gray-900/50 text-white p-2 rounded-full hover:bg-gray-900/80"
          aria-label="Download image"
        >
          <Download className="w-5 h-5" />
        </a>
      </div>
      <h1 className="text-4xl font-bold text-zinc-800 mb-4">{product.title}</h1>
      <p className="text-slate-600 leading-relaxed mb-8">{product.description}</p>
      {product.additionalFeatures && product.additionalFeatures.length > 0 && (
        <div className="mb-8">
            <h3 className="text-2xl font-semibold text-zinc-800 mb-4 border-b pb-2">Additional Features</h3>
            <ul className="space-y-3">
            {product.additionalFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span className="text-slate-700">{feature}</span>
                </li>
            ))}
            </ul>
        </div>
      )}
      {product.technicalDetails && Object.keys(product.technicalDetails).length > 0 && (
        <div>
            <h3 className="text-2xl font-semibold text-zinc-800 mb-4 border-b pb-2">Technical Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {Object.entries(product.technicalDetails).map(([key, value]) => (
                <div key={key} className="bg-slate-50 p-3 rounded-md border border-slate-200">
                <p className="font-semibold text-slate-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</p>
                <p className="text-zinc-800">{value}</p>
                </div>
            ))}
            </div>
        </div>
      )}
      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-3 px-6 rounded-lg"
      >
        Contact Now on WhatsApp
      </a>
    </motion.article>
  );
};

const ProductsPage = () => {
  const [products, setProducts] = useState([]); 
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setProducts(data);
        if (isDesktop && data.length > 0) {
            setSelectedProduct(data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [isDesktop]); 

  // --- THIS IS THE FIX ---
  // This effect now only runs when the layout changes or the product list is first loaded.
  // It no longer re-runs when you select a product, fixing the mobile bug.
  useEffect(() => {
    if (!isDesktop) {
        setSelectedProduct(null);
    } else if (products.length > 0 && !selectedProduct) {
        setSelectedProduct(products[0]);
    }
  }, [isDesktop, products]);

  return (
    <div className="bg-white">
      <div className="container mx-auto px-6 py-16">
        <div className="hidden lg:grid lg:grid-cols-4 lg:gap-12">
          <div className="lg:col-span-1">
            <ProductList 
              products={products}
              selectedProduct={selectedProduct}
              onSelectProduct={setSelectedProduct}
              isLoading={isLoading}
            />
          </div>
          <main className="lg:col-span-3">
            <AnimatePresence mode="wait">
                <ProductDetail product={selectedProduct} />
            </AnimatePresence>
          </main>
        </div>
        <div className="lg:hidden">
          <AnimatePresence mode="wait">
            {selectedProduct ? (
              <ProductDetail 
                product={selectedProduct} 
                onBack={() => setSelectedProduct(null)} 
              />
            ) : (
              <ProductList 
                products={products}
                selectedProduct={selectedProduct}
                onSelectProduct={setSelectedProduct}
                isLoading={isLoading}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
