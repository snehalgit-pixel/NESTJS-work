/* eslint-disable prettier/prettier */

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductController } from "./product.controller";
import { Product } from "./product.entity";
import { ProductService } from "./product.service";

@Module({
    controllers: [ProductController],
    imports: [TypeOrmModule.forFeature([Product])],
    providers: [ProductService],
  })
  export class ProductModule {}