import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {

    constructor (
        @InjectModel(Product.name) 
        private productModel: Model<Product>
    ) {}

}
