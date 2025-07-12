import express from 'express';
import { getBlogs, createBlog, updateBlog, deleteBlog } from '../controllers/blogController.js';
import { protect } from '../middleware/authMiddleware.js';
import multer from 'multer';

const router = express.Router();

// Configure multer for file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// --- Define Blog Routes ---

// GET /api/blogs is public for the main website to display blog posts.
// POST /api/blogs is protected.
router.route('/')
  .get(getBlogs)
  .post(protect, upload.single('imageFile'), createBlog);

// PUT /api/blogs/:id and DELETE /api/blogs/:id are protected.
router.route('/:id')
  .put(protect, upload.single('imageFile'), updateBlog)
  .delete(protect, deleteBlog);

export default router;