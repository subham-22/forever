import express from 'express';
import { listProduct, addProduct, singleProduct, removeProduct,updateProduct } from '../controllers/productController.js';
import adminAuth from '../middleware/adminAuth.js';
import upload from '../middleware/multer.js';

const productRouter = express.Router();

// List all products
productRouter.get('/list', listProduct);

// Add a new product (Multer first, then adminAuth)
productRouter.post(
  '/add',
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
  ]),
  adminAuth,
  addProduct
);

// Fetch a single product by ID
productRouter.post('/single', singleProduct);

// Remove a product (protected by adminAuth middleware)
productRouter.post('/remove', adminAuth, removeProduct);


//Update product (protected be adminauth middle ware)
productRouter.post('/update', adminAuth, updateProduct)


export default productRouter;
