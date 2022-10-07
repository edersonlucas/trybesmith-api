import { Router } from 'express';
import ProductController from '../controllers/ProductController';
import productMiddleware from '../middlewares/productMiddleware';

const router = Router();

const productController = new ProductController();

router.post('/products', productMiddleware, productController.createProduct);
router.get('/products', productController.getAllProducts);

export default router;