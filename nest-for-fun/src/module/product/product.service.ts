/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { Store } from "../store/store.entity";
import { CreateProductRequest } from "./create-product.dto";
import { Product } from "./product.entity";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private productService: Repository<Product>
    ) {}

    public async createProduct(product: CreateProductRequest, store: Store): Promise<Product> {
        const newProduct = await this.productService.save({
            name: product.title,
            description: product.description,
            price: product.price,
            isAvailable: product.isAvailable,
            storeId: product.storeId
        });
        store.products = [...store.products, newProduct];
        store.save();
        return newProduct;
    }

    public async getSingleProduct(id: number): Promise<Product> {
        return await this.productService.findOne({ where: {id: id} });
    }

    public async getAllProducts(): Promise<Product[]> {
        return await this.productService.find();
    }

    public async deleteProduct(id: number): Promise<boolean> {
        const res = await this.productService.delete({ id: id });
        if (!res) {
            return false;
        }
        return true;
    }

    public async getProductByPartialMatch(name: string): Promise<Product[]> {
        return await this.productService.find({ where: {name: Like(`%${name}%`)}});
    }
}