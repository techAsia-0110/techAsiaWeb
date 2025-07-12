
import React, { useState, useEffect } from 'react';
import { PlusCircle, XCircle, Loader2 } from 'lucide-react';

const ProductForm = ({ product, onSave, onCancel, isSaving }) => {
  const [formData, setFormData] = useState({
    title: '', slug: '', description: '', image: '',
    additionalFeatures: [],
    technicalDetails: [{ key: '', value: '' }]
  });
  
  // --- UPDATED: State for file object and preview URL ---
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        technicalDetails: Object.entries(product.technicalDetails || {}).map(([key, value]) => ({ key, value }))
      });
      // Set initial preview from existing product image
      setImagePreview(product.image);
    } else {
      // Reset form for new product
      setFormData({
        title: '', slug: '', description: '', image: '',
        additionalFeatures: [''],
        technicalDetails: [{ key: '', value: '' }]
      });
      setImagePreview('');
    }
    // Clear the file input state
    setImageFile(null);
  }, [product]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- UPDATED: Handle file selection and create preview ---
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create a temporary URL for the selected file to show a preview
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.additionalFeatures];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, additionalFeatures: newFeatures }));
  };
  
  const addFeature = () => {
    setFormData(prev => ({ ...prev, additionalFeatures: [...prev.additionalFeatures, ''] }));
  };

  const removeFeature = (index) => {
    setFormData(prev => ({ ...prev, additionalFeatures: formData.additionalFeatures.filter((_, i) => i !== index) }));
  };

  const handleDetailChange = (index, field, value) => {
    const newDetails = [...formData.technicalDetails];
    newDetails[index][field] = value;
    setFormData(prev => ({...prev, technicalDetails: newDetails}));
  };

  const addDetail = () => {
    setFormData(prev => ({...prev, technicalDetails: [...prev.technicalDetails, {key: '', value: ''}]}));
  };
  
  const removeDetail = (index) => {
    setFormData(prev => ({...prev, technicalDetails: formData.technicalDetails.filter((_, i) => i !== index)}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalProduct = {
        ...formData,
        technicalDetails: formData.technicalDetails.reduce((acc, detail) => {
            if(detail.key) acc[detail.key] = detail.value;
            return acc;
        }, {})
    };
    onSave(finalProduct, imageFile);
  };

  return (
    <div className="bg-zinc-800 p-8 rounded-xl shadow-2xl border border-zinc-700">
      <h2 className="text-xl font-bold mb-6">{product ? 'Edit Product' : 'Add New Product'}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Product Title" className="w-full p-3 bg-zinc-700 rounded-md" required />
        <input type="text" name="slug" value={formData.slug} onChange={handleChange} placeholder="URL Slug (e.g., my-product)" className="w-full p-3 bg-zinc-700 rounded-md" />
        
        <div>
          <h3 className="font-semibold mb-2">Product Image</h3>
          <div className="flex flex-col gap-4">
            {/* --- Image Preview --- */}
            {imagePreview && (
              <div>
                <img 
                  src={imagePreview} 
                  alt="Product Preview" 
                  className="w-48 h-48 object-contain p-2 bg-zinc-700 rounded-lg"
                />
              </div>
            )}
            <input 
              type="file" 
              name="imageFile" 
              onChange={handleFileChange}
              accept="image/png, image/jpeg, image/jpg"
              className="block w-full max-w-xs text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-500/20 file:text-orange-300 hover:file:bg-orange-500/30"
            />
          </div>
        </div>

        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full p-3 bg-zinc-700 rounded-md" rows="4"></textarea>

        <div>
          <h3 className="font-semibold mb-2">Additional Features</h3>
          {formData.additionalFeatures.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input type="text" value={feature} onChange={(e) => handleFeatureChange(index, e.target.value)} className="w-full p-2 bg-zinc-700 rounded-md" />
              <button type="button" onClick={() => removeFeature(index)}><XCircle className="text-red-400" /></button>
            </div>
          ))}
          <button type="button" onClick={addFeature} className="text-sm text-orange-400 flex items-center gap-1"><PlusCircle size={16} /> Add Feature</button>
        </div>

        <div>
            <h3 className="font-semibold mb-2">Technical Details</h3>
            {formData.technicalDetails.map((detail, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2 items-center">
                    <input type="text" value={detail.key} onChange={(e) => handleDetailChange(index, 'key', e.target.value)} placeholder="Key (e.g., Voltage)" className="w-full p-2 bg-zinc-700 rounded-md" />
                    <div className="flex items-center gap-2">
                        <input type="text" value={detail.value} onChange={(e) => handleDetailChange(index, 'value', e.target.value)} placeholder="Value" className="w-full p-2 bg-zinc-700 rounded-md" />
                        <button type="button" onClick={() => removeDetail(index)}><XCircle className="text-red-400" /></button>
                    </div>
                </div>
            ))}
            <button type="button" onClick={addDetail} className="text-sm text-orange-400 flex items-center gap-1"><PlusCircle size={16} /> Add Detail</button>
        </div>
        
        <div className="flex justify-end items-center gap-4 pt-4 border-t border-zinc-700">
  <button 
    type="button" 
    onClick={onCancel} 
    disabled={isSaving}
    className="px-6 py-2 bg-zinc-600 rounded-md hover:bg-zinc-500 transition-colors disabled:opacity-50"
  >
    Cancel
  </button>
  
  <button 
    type="submit"  
    disabled={isSaving} 
    className="w-36 flex justify-center items-center px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full font-semibold disabled:from-zinc-500 disabled:to-zinc-600"
  >
    {isSaving ? (
      <Loader2 className="w-5 h-5 animate-spin" />
    ) : (
      'Save Product'
    )}
  </button>
</div>
      </form>
    </div>
  );
};

export default ProductForm;