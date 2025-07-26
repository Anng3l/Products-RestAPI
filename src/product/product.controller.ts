import { Body, Controller, Post, Res } from '@nestjs/common';
import { ProductService } from './product.service';
import { Response, response } from 'express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  async postProduct(
    //Cuerpo de la request
    @Body() data: any,
    //Respuesta a la request
    @Res() res:Response
  ) 
  {
    try
    {
      const { name, code, description, category, price, stock } = data;

      if (name || code || description || category || price || stock)
      {
        return res.status(203).json({msg: "Debe enviar todos los campos"});
      }

      



    }
    catch(e)
    {
      return res.status(500).json({msg: "Error al crear un producto"});
    }

  }
}
