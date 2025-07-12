// src/components/blog/ArticleDetail.jsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Calendar, ArrowLeft } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';

const ArticleDetail = ({ post, onBack }) => {
  return (
    <article>
      {/* The "Back" button is only rendered if the onBack function is provided (i.e., on mobile) */}
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-orange-600 font-semibold mb-6 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Articles
        </button>
      )}

      <div className="overflow-hidden rounded-lg mb-8">
        <img src={post.image} alt={post.title} className="w-full h-auto max-h-80 object-cover" />
      </div>
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
        <Calendar className="w-4 h-4" />
        <span>{formatDate(post.publishedDate)}</span>
      </div>
      <h1 className="text-3xl font-bold text-zinc-800 mb-6">
        {post.title}
      </h1>
      <div className="prose max-w-none text-slate-600 leading-relaxed">
        <ReactMarkdown>
          {post.content || post.excerpt}
        </ReactMarkdown>
      </div>
    </article>
  );
};

export default ArticleDetail;