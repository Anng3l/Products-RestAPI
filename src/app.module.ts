import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';

import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  //Se importan los module.ts de los demás módulos para que 
  //sea reconocidos y funcionen en el servidor de nest
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/ProyectoFinal'),

    ConfigModule.forRoot({
      isGlobal: true
    }),
    
    
    ProductModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
