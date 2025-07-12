import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast'; // 1. IMPORT toast
import ProductList from '../components/products/ProductList';
import ProductForm from '../components/products/ProductForm';
import { API_BASE_URL } from '../config/api';
import logo from '../assets/logo.png';
import useAuthStore from '../store/authStore';

const ProductManagementPage = () => {
  const [view, setView] = useState('list');
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const { userInfo } = useAuthStore();

  const getAuthHeader = () => {
    if (!userInfo?.token) return {}; 
    return { 'Authorization': `Bearer ${userInfo.token}` };
  };

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
      toast.error(error.message); // 2. USE toast for errors
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddNew = () => {
    setCurrentProduct(null);
    setView('form');
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setView('form');
  };

  const handleCancel = () => {
    setView('list');
  };

  const handleSave = async (productData, imageFile) => {
    setIsSaving(true);
    const toastId = toast.loading('Saving product...'); // Show loading toast
    const isUpdating = !!productData._id;
    const url = isUpdating ? `${API_BASE_URL}/products/${productData._id}` : `${API_BASE_URL}/products`;
    const method = isUpdating ? 'PUT' : 'POST';

    const formData = new FormData();
    formData.append('title', productData.title);
    formData.append('slug', productData.slug);
    formData.append('description', productData.description);
    formData.append('technicalDetails', JSON.stringify(productData.technicalDetails || {}));
    formData.append('additionalFeatures', JSON.stringify(productData.additionalFeatures || []));
    if (imageFile) formData.append('imageFile', imageFile);

    try {
      const response = await fetch(url, {
        method: method,
        headers: getAuthHeader(),
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to save product');

      toast.success('Product saved successfully!', { id: toastId }); // 3. SHOW success toast
      await fetchProducts();
      setView('list');
    } catch (error) {
      console.error("Save operation failed:", error);
      toast.error(error.message, { id: toastId }); // 4. SHOW error toast
    } finally {
      setIsSaving(false);
    }
  };

  // A new function to handle the actual deletion logic
  const performDelete = async (productId) => {
    const toastId = toast.loading('Deleting product...');
    try {
      const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
        method: 'DELETE',
        headers: getAuthHeader(),
      });
      if (!response.ok) throw new Error('Failed to delete product');
      
      toast.success('Product deleted successfully!', { id: toastId });
      await fetchProducts();
    } catch (error) {
      console.error("Failed to delete product:", error);
      toast.error(error.message, { id: toastId });
    }
  };


  // The updated handleDelete function that now shows a confirmation toast
  const handleDelete = (productId) => {
    toast((t) => (
      <div className="bg-zinc-800 text-white p-4 rounded-lg shadow-lg flex flex-col gap-4">
        <p className="font-semibold">Are you sure you want to delete this product?</p>
        <p className="text-sm text-zinc-400">This action cannot be undone.</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-2 rounded-md bg-zinc-600 hover:bg-zinc-500 text-sm font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              performDelete(productId); // Call the actual delete logic
            }}
            className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-500 text-sm font-semibold"
          >
            Delete
          </button>
        </div>
      </div>
    ), {
      duration: 6000, // Make it stay longer so the user can react
    });
  };
  // --- (JSX is unchanged) ---
 return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <header className="flex justify-between items-center mb-8">
        <Link to="/"><img src={logo} alt="TechAsia Logo" className="h-12" /></Link>
        <h1 className="text-3xl font-bold text-orange-400">Product Management</h1>
        <button 
    onClick={handleAddNew}
    className={`px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full font-semibold transition-opacity ${
        view === 'list' ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}
>
  Add New
</button>
      </header>
      
      <main>
        {isLoading ? (
          <p>Loading products...</p>
        ) : (
          <AnimatePresence mode="wait">
            {view === 'list' ? (
              <motion.div key="list" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                <ProductList products={products} onEdit={handleEdit} onDelete={handleDelete} />
              </motion.div>
            ) : (
              <motion.div key="form" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                {/* START: ADDED BACK BUTTON */}
                <div className="mb-6">
                  <button 
                      onClick={handleCancel} 
                      className="flex items-center gap-2 text-zinc-400 hover:text-orange-400 transition-colors font-semibold"
                  >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Back to Product List
                  </button>
                </div>
                {/* END: ADDED BACK BUTTON */}
                
                <ProductForm product={currentProduct} onSave={handleSave} onCancel={handleCancel} isSaving={isSaving} />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>
    </div>
  );
};

export default ProductManagementPage;