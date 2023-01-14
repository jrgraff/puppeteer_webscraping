import express from 'express';

import products from './products.route';

const router = express.Router();

router.use('/', products);

export default router;
