import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true, // Slugs should be unique
  },
  image: {
    type: String,
    required: true,
  },
  excerpt: {
    type: String,
  },
  content: {
    type: String,
  },
  publishedDate: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;