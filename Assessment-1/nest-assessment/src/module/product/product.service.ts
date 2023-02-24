/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { CreateProductRequest } from "./create-product.dto";
import { Product } from "./product.entity";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private productService: Repository<Product>
    ) {}

    public async createProduct(product: CreateProductRequest): Promise<Product> {
        return await this.productService.save({
            name: product.name,
            description: product.description,
            price: product.price ? product.price : 0.0,
            isAvailableForSale: product.isAvailableForSale ? product.isAvailableForSale : false,
            isInStock: product.isInStock ? product.isInStock : false,
            isCoveredInReturnPolicy: product.isCoveredInReturnPolicy ? product.isCoveredInReturnPolicy : false
        });
    }

    public async getSingleProduct(id: number): Promise<Product | null> {
        const res = await this.productService.findOne({ where: {id: id} });
        if (res) {
            return res;
        }
        return null;
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

    public async updateProduct(id: number, productRequest: CreateProductRequest): Promise<Product> {
        return await this.productService.update({id: id}, {
            name: productRequest.name,
            description: productRequest.description,
            price: productRequest.price,
            category: productRequest.category,
            isAvailableForSale: productRequest.isAvailableForSale
        });
    }

    public async getProductByCategory(category: string): Promise<Product[]> {
        return await this.productService.find({ where: {category: category}});
    }

    public async toggleProductAvailability(id: number, isAvailable: boolean): Promise<Product> {
        return await this.productService.update(id, {
            isAvailableForSale: isAvailable
        });
    }
}