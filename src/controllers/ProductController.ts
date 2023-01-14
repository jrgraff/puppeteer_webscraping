import { Request, Response } from 'express';

import GetProductsService from '../services/GetProductsService';

class ProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { search = 'Lenovo', sort = 'ASC' } = req.query;

    const getProductsService = new GetProductsService();

    const json = await getProductsService.execute(String(search), String(sort));

    return res.status(200).json(json);
  }
}

export default ProductController;
