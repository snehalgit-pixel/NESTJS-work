/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { Order } from "./order.entity";
import { OrderService } from "./order.service";
import { PlaceOrderRequest } from "./place-order.dto";

@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) {}
    @Post()
    @UsePipes(ValidationPipe)
    public async placeOrder(@Body() order: PlaceOrderRequest): Promise<Order> {
        return await this.orderService.placeOrder(order);
    }

    @Get(':id')
    public async getSingleOrder(@Param('id') id: number): Promise<Order | null> {
        return await this.orderService.getSingleOrder(id);
    }

    @Get()
    public async getAllOrders(): Promise<Order[]> {
        return await this.orderService.getAllOrders();
    }

    @Delete(':id')
    public async deleteOrder(@Param('id') id: number): Promise<boolean> {
        return await this.orderService.deleteOrder(id);
    }
}