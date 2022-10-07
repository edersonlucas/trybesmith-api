import { Request, Response } from 'express';
import IProduct from '../interfaces/ProductInterface';
import ProductService from '../services/ProductService';

export default class ProductController {
  private service: ProductService;

  constructor() {
    this.service = new ProductService();
  }
  
  public createProduct = async (req: Request<Omit<IProduct, 'Id, orderId'>>, res: Response) => {
    const product = req.body;
    const newProduct = await this.service.createProduct(product);
    return res.status(201).json(newProduct);
  };
}