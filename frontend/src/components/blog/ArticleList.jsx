// src/components/blog/ArticleList.jsx
import React from 'react';
import { formatDate } from '../../utils/formatDate'; 

const ArticleList = ({ posts, selectedPost, onSelectPost }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-zinc-800 mb-6 pb-4 border-b border-slate-200">
        All Articles
      </h2>
      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-4">
        {posts.map((post) => (
          <div
            key={post._id.$oid}
            onClick={() => onSelectPost(post)}
            className={`flex items-start gap-4 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
            selectedPost?._id === post._id 
              ? 'bg-orange-100'
              : 'hover:bg-slate-100'
            }`}
          >
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-16 h-16 object-cover rounded-md flex-shrink-0"
            />
            <div>
              <h3 className="font-semibold text-zinc-800 text-sm leading-tight">{post.title}</h3>
              <p className="text-xs text-slate-500 mt-1">{formatDate(post.publishedDate)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;