/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "../product/product.entity";
import { Order } from "./order.entity";
import { PlaceOrderRequest } from "./place-order.dto";

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order) private orderService: Repository<Order>
    ) {}

    public async placeOrder(order: PlaceOrderRequest): Promise<Order> {
        if (order?.discount) {
            order?.products?.forEach((product: Product) => {
                if (order.amountPaid && product.price && order.discount) {
                    order.amountPaid = order.amountPaid - product.price * order.discount/100;
                }
            });
        }
        return await this.orderService.save({
            id: order.id,
            nameOfPerson: order.nameOfPerson,
            amountPaid: order.amountPaid ? order.amountPaid : 0,
            products: order.products ? order.products : [],
            dateOfOrder: order.dateOfOrder ? order.dateOfOrder : new Date()
        });
    }

    public async getSingleOrder(id: number): Promise<Order | null> {
        const res = await this.orderService.findOne({ where: {id: id} });
        if (res) {
            return res;
        }
        return null;
    }

    public async getAllOrders(): Promise<Order[]> {
        return await this.orderService.find();
    }

    public async deleteOrder(id: number): Promise<boolean> {
        const order = await this.getSingleOrder(id);
        let flag = true;
        order?.products?.forEach((product: Product) => {
            if (!product.isCoveredInReturnPolicy) {
                flag = false;
            }
        });
        if (flag) {
            const res = await this.orderService.delete({ id: id });
            if (!res) {
                return false;
            }
            return true;
        }
        else {
            return false;
        }
    }
}