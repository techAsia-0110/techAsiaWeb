import express from 'express';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js'; // This line imports our security middleware
import multer from 'multer';

const router = express.Router();

// Configure multer to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// --- Define Product Routes ---

// GET is public, anyone can see products.
// POST is now protected by the 'protect' middleware.
router.route('/')
  .get(getProducts)
  .post(protect, upload.single('imageFile'), createProduct);

// PUT and DELETE are also protected by the 'protect' middleware.
router.route('/:id')
  .put(protect, upload.single('imageFile'), updateProduct)
  .delete(protect, deleteProduct);

export default router;