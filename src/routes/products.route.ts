import express from 'express';

import ProductController from '../controllers/ProductController';
import ProductResponse from '../interfaces/ProductResponse';

const productController = new ProductController();

const productsRoute = express.Router();

productsRoute.get<{}, ProductResponse>('/', productController.handle);

export default productsRoute;
