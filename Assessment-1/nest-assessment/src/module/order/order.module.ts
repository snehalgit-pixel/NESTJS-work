/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./order.entity";


@Module({
    controllers: [],
    imports: [TypeOrmModule.forFeature([Order])],
    providers: [],
  })
  export class OrderModule {}