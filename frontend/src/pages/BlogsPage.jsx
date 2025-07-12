import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { API_BASE_URL } from '../config/api';
import ArticleList from '../components/blog/ArticleList';
import ArticleDetail from '../components/blog/ArticleDetail';
import { Loader2 } from 'lucide-react'; 

const BlogsPage = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_BASE_URL}/blogs`);
        if (!response.ok) throw new Error('Failed to fetch blog posts');
        const data = await response.json();
        setPosts(data);
        if (isDesktop && data.length > 0) {
          setSelectedPost(data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [isDesktop]);

  // Handle mobile view where no post is selected initially
  useEffect(() => {
    if (!isDesktop) {
        setSelectedPost(null);
    }
  }, [isDesktop]);

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-6 py-10">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
          </div>
        ) : (
          <>
            {/* Desktop Layout */}
            <div className="hidden lg:grid lg:grid-cols-3 lg:gap-12">
              <aside className="lg:col-span-1">
                <ArticleList
                  posts={posts}
                  selectedPost={selectedPost}
                  onSelectPost={setSelectedPost}
                />
              </aside>
              <main className="lg:col-span-2">
                <AnimatePresence mode="wait">
                  {selectedPost && <ArticleDetail post={selectedPost} />}
                </AnimatePresence>
              </main>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden">
              <AnimatePresence mode="wait">
                {selectedPost ? (
                  <motion.div
                    key="detail"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArticleDetail
                      post={selectedPost}
                      onBack={() => setSelectedPost(null)}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="list"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArticleList
                      posts={posts}
                      selectedPost={selectedPost}
                      onSelectPost={setSelectedPost}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BlogsPage;