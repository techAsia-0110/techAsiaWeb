import express from 'express';
import { submitContactForm } from '../controllers/contactController.js';

const router = express.Router();

// This route is public, so no 'protect' middleware is needed.
router.route('/').post(submitContactForm);

export default router;