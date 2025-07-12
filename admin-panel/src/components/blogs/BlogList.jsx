// src/components/blogs/BlogList.jsx
import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

const BlogList = ({ blogs, onEdit, onDelete }) => {
  return (
    <div className="bg-zinc-800 p-6 rounded-xl shadow-2xl border border-zinc-700">
      <h2 className="text-xl font-bold mb-4">Existing Blog Posts</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-300">
          <thead className="text-xs text-orange-400 uppercase bg-zinc-700">
            <tr>
              <th scope="col" className="px-6 py-3">Image</th>
              <th scope="col" className="px-6 py-3">Title</th>
              <th scope="col" className="px-6 py-3">Published Date</th>
              <th scope="col" className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id} className="bg-zinc-800 border-b border-zinc-700 hover:bg-zinc-600">
                <td className="px-6 py-4">
                  <img src={blog.image} alt={blog.title} className="h-12 w-12 object-cover bg-zinc-700 rounded-md" />
                </td>
                <td className="px-6 py-4 font-medium text-white">{blog.title}</td>
                <td className="px-6 py-4">{new Date(blog.publishedDate).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-center">
                  <button onClick={() => onEdit(blog)} className="font-medium text-blue-400 hover:underline mr-4"><Pencil size={18} /></button>
                  <button onClick={() => onDelete(blog._id)} className="font-medium text-red-400 hover:underline"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogList;