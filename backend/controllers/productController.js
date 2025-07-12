// controllers/productController.js
import Product from '../models/Product.js';
import cloudinary from '../config/cloudinary.js';
import DatauriParser from 'datauri/parser.js';
import path from 'path';

const parser = new DatauriParser();

// --- Helper function to format the buffer from multer ---
const formatBuffer = (file) => parser.format(path.extname(file.originalname).toString(), file.buffer).content;

// @desc    Fetch all products
// @route   GET /api/products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @desc    Create a product
// @route   POST /api/products
export const createProduct = async (req, res) => {
  const { 
    title, slug, description, 
    additionalFeatures = '[]', 
    technicalDetails = '{}' 
  } = req.body;
  
  try {
    let imageUrl;

    if (req.file) {
      const file = formatBuffer(req.file);
      const result = await cloudinary.uploader.upload(file, { 
          folder: 'techasia_products',
          transformation: [{ width: 800, height: 800, crop: "limit", quality: "auto" }]
      });
      imageUrl = result.secure_url;
    } else {
      return res.status(400).json({ message: 'Product image is required' });
    }
    
    const product = new Product({
      title, slug, description, image: imageUrl,
      additionalFeatures: JSON.parse(additionalFeatures),
      technicalDetails: JSON.parse(technicalDetails)
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);

  } catch (error) {
    // Check if the error is the specific 'duplicate key' error (code 11000)
    if (error.code === 11000 && error.keyPattern.slug) {
      // If it is, send a user-friendly message.
      return res.status(400).json({ message: 'This URL slug already exists. Please provide a different one.' });
    }

    // For any other errors, use the general error message.
    console.error(error);
    res.status(400).json({ message: 'Error creating product', error: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
export const updateProduct = async (req, res) => {
  const { 
    title, slug, description, 
    additionalFeatures = '[]', 
    technicalDetails = '{}' 
  } = req.body;
  
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.title = title || product.title;
    product.slug = slug || product.slug;
    product.description = description || product.description;
    product.additionalFeatures = JSON.parse(additionalFeatures);
    product.technicalDetails = JSON.parse(technicalDetails);
    
    if (req.file) {
      const file = formatBuffer(req.file);
      const result = await cloudinary.uploader.upload(file, { folder: 'techasia_products' });
      product.image = result.secure_url;
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);

  } catch (error) {
    res.status(400).json({ message: 'Error updating product', error: error.message });
  }
};


// @desc    Delete a product
// @route   DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
    // Note: In a real app, you might want to delete the image from Cloudinary here as well.
    // For now, we will just delete the database record.
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};