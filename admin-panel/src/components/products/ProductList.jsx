// src/components/products/ProductList.jsx
import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

const ProductList = ({ products, onEdit, onDelete }) => {
  return (
    <div className="bg-zinc-800 p-6 rounded-xl shadow-2xl border border-zinc-700">
      <h2 className="text-xl font-bold mb-4">Existing Products</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-300">
          <thead className="text-xs text-orange-400 uppercase bg-zinc-700">
            <tr>
              {/* --- Image Column --- */}
              <th scope="col" className="px-6 py-3">Image</th>
              <th scope="col" className="px-6 py-3">Title</th>
              <th scope="col" className="px-6 py-3">Slug</th>
              <th scope="col" className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="bg-zinc-800 border-b border-zinc-700 hover:bg-zinc-600">
                {/* --- Image Cell --- */}
                <td className="px-6 py-4">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="h-12 w-12 object-contain p-1 bg-zinc-700 rounded-md"
                  />
                </td>
                <td className="px-6 py-4 font-medium text-white">{product.title}</td>
                <td className="px-6 py-4">{product.slug}</td>
                <td className="px-6 py-4 text-center">
                  <button onClick={() => onEdit(product)} className="font-medium text-blue-400 hover:underline mr-4">
                    <Pencil size={18} />
                  </button>
                  <button onClick={() => onDelete(product._id)} className="font-medium text-red-400 hover:underline">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;