import Blog from '../models/Blog.js';
import cloudinary from '../config/cloudinary.js';
import DatauriParser from 'datauri/parser.js';
import path from 'path';

const parser = new DatauriParser();

// Helper function to format the buffer from multer for Cloudinary
const formatBuffer = (file) => parser.format(path.extname(file.originalname).toString(), file.buffer).content;

// @desc    Fetch all blog posts
// @route   GET /api/blogs
export const getBlogs = async (req, res) => {
  try {
    // Sort by publishedDate in descending order (newest first)
    const blogs = await Blog.find({}).sort({ publishedDate: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a blog post
// @route   POST /api/blogs
export const createBlog = async (req, res) => {
  const { title, slug, excerpt, publishedDate, content: rawContent } = req.body;
  
  try {
    let imageUrl;
    if (req.file) {
      const file = formatBuffer(req.file);
      const result = await cloudinary.uploader.upload(file, { folder: 'techasia_blogs' });
      imageUrl = result.secure_url;
    } else {
      return res.status(400).json({ message: 'Blog post image is required' });
    }
    
    // Clean the content to fix line breaks
    const content = rawContent ? rawContent.replace(/\\n/g, '\n') : '';

    const blog = new Blog({
      title,
      slug,
      excerpt,
      publishedDate,
      content, // Use the cleaned content
      image: imageUrl,
    });

    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);

  } catch (error) {
    if (error.code === 11000 && error.keyPattern.slug) {
      return res.status(400).json({ message: 'This URL slug already exists. Please use a unique one.' });
    }
    console.error(error);
    res.status(400).json({ message: 'Error creating blog post', error: error.message });
  }
};

// @desc    Update a blog post
// @route   PUT /api/blogs/:id
// @desc    Update a blog post
// @route   PUT /api/blogs/:id
export const updateBlog = async (req, res) => {
  const { title, slug, excerpt, publishedDate, content: rawContent } = req.body;
  // console.log("--- UPDATE BLOG CONTROLLER WAS HIT ---");
  // console.log("Request Params ID:", req.params.id);
  // console.log("Request Body:", req.body);
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // --- NEW LOGIC: Proactively check for slug conflicts ---
    if (slug) {
      // Find a blog that has the same slug but a different ID.
      const existingSlug = await Blog.findOne({ slug: slug, _id: { $ne: req.params.id } });
      if (existingSlug) {
        return res.status(400).json({ message: 'This URL slug is already in use by another post.' });
      }
    }

    blog.title = title || blog.title;
    blog.slug = slug || blog.slug;
    blog.excerpt = excerpt || blog.excerpt;
    blog.publishedDate = publishedDate || blog.publishedDate;
    
    if (rawContent) {
        blog.content = rawContent.replace(/\\n/g, '\n');
    }
    
    if (req.file) {
      const file = formatBuffer(req.file);
      const result = await cloudinary.uploader.upload(file, { folder: 'techasia_blogs' });
      blog.image = result.secure_url;
    }

    const updatedBlog = await blog.save();
    res.json(updatedBlog);

  } catch (error) {
    // We no longer need the specific E11000 check here for updates
    res.status(400).json({ message: 'Error updating blog post', error: error.message });
  }
};

// @desc    Delete a blog post
// @route   DELETE /api/blogs/:id
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      // Future improvement: delete image from Cloudinary here
      await blog.deleteOne();
      res.json({ message: 'Blog post removed' });
    } else {
      res.status(404).json({ message: 'Blog post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};