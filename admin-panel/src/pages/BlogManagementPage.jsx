import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import BlogList from '../components/blogs/BlogList';
import BlogForm from '../components/blogs/BlogForm';
import { API_BASE_URL } from '../config/api';
import useAuthStore from '../store/authStore';
import logo from '../assets/logo.png';

const BlogManagementPage = () => {
  const [view, setView] = useState('list');
  const [blogs, setBlogs] = useState([]);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { userInfo } = useAuthStore();

  const getAuthHeader = () => {
    if (!userInfo?.token) return {};
    return { 'Authorization': `Bearer ${userInfo.token}` };
  };

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/blogs`);
      if (!response.ok) throw new Error('Failed to fetch blog posts');
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleAddNew = () => {
    setCurrentBlog(null);
    setView('form');
  };

  const handleEdit = (blog) => {
    setCurrentBlog(blog);
    setView('form');
  };

  const handleCancel = () => {
    setView('list');
  };

    const handleSave = async (blogData, imageFile) => {
    // --- START OF DEBUGGING LOGS ---
    // console.log("--- handleSave initiated ---");
    // console.log("Received blogData:", blogData);
    
    const isUpdating = !!blogData._id;
    // console.log("Is this an update?", isUpdating);
    
    const url = isUpdating ? `${API_BASE_URL}/blogs/${blogData._id}` : `${API_BASE_URL}/blogs`;
    const method = isUpdating ? 'PUT' : 'POST';

    // console.log("Request Method:", method);
    // console.log("Request URL:", url);
    // --- END OF DEBUGGING LOGS ---

    const toastId = toast.loading('Saving blog post...');
    const formData = new FormData();
    const slug = isUpdating || blogData.slug 
        ? blogData.slug 
        : blogData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

    formData.append('title', blogData.title);
    formData.append('slug', slug);
    formData.append('excerpt', blogData.excerpt);
    formData.append('content', blogData.content);
    formData.append('publishedDate', blogData.publishedDate);
    if (imageFile) {
      formData.append('imageFile', imageFile);
    }

    try {
      const response = await fetch(url, {
        method: method,
        headers: getAuthHeader(),
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to save blog post');

      toast.success('Blog post saved successfully!', { id: toastId });
      await fetchBlogs();
      setView('list');
    } catch (error) {
      console.error("Save operation failed:", error);
      toast.error(error.message, { id: toastId });
    }
  };

  // --- DELETE LOGIC ---

  // 1. function to handle the actual API call
  const performDelete = async (blogId) => {
    const toastId = toast.loading('Deleting post...');
    try {
      const response = await fetch(`${API_BASE_URL}/blogs/${blogId}`, {
        method: 'DELETE',
        headers: getAuthHeader(),
      });
      if (!response.ok) throw new Error('Failed to delete post');
      
      toast.success('Post deleted successfully!', { id: toastId });
      await fetchBlogs();
    } catch (error) {
      console.error("Failed to delete post:", error);
      toast.error(error.message, { id: toastId });
    }
  };

  // 2. The handleDelete function  shows our custom confirmation toast
  const handleDelete = (blogId) => {
    toast((t) => (
      <div className="bg-zinc-800 text-white p-4 rounded-lg shadow-lg flex flex-col gap-4">
        <p className="font-semibold">Are you sure you want to delete this post?</p>
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
              performDelete(blogId); // Call the  function
            }}
            className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-500 text-sm font-semibold"
          >
            Delete
          </button>
        </div>
      </div>
    ), {
      duration: 4000, // Keep the toast visible longer for confirmation
    });
  };

  // --- END: MODIFIED DELETE LOGIC ---


  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <header className="flex justify-between items-center mb-8">
        <Link to="/"><img src={logo} alt="TechAsia Logo" className="h-12" /></Link>
        <h1 className="text-3xl font-bold text-orange-400">Blog Management</h1>
        <button onClick={handleAddNew} 
          className={`px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full font-semibold transition-opacity ${
          view === 'list' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          Add New
        </button>
      </header>
      
      <main>
        {isLoading ? (
          <p className="text-center">Loading blog posts...</p>
        ) : (
          <AnimatePresence mode="wait">
            {view === 'list' ? (
              <motion.div key="list" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                <BlogList blogs={blogs} onEdit={handleEdit} onDelete={handleDelete} />
              </motion.div>
            ) : (
              <motion.div key="form" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                {/* START: ADDED BACK BUTTON FOR CONSISTENCY */}
                <div className="mb-6">
                  <button 
                      onClick={handleCancel} 
                      className="flex items-center gap-2 text-zinc-400 hover:text-orange-400 transition-colors font-semibold"
                  >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Back to Blog List
                  </button>
                </div>
                {/* END: ADDED BACK BUTTON */}

                <BlogForm blog={currentBlog} onSave={handleSave} onCancel={handleCancel} />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>
    </div>
  );
};

export default BlogManagementPage;