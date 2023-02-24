/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateProductRequest } from "./create-product.dto";
import { Product } from "./product.entity";
import { ProductService } from "./product.service";

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Post()
    @UsePipes(ValidationPipe)
    public async createProduct(@Body() product: CreateProductRequest): Promise<Product> {
        return await this.productService.createProduct(product);
    }

    @Get(':id')
    public async getSingleProduct(@Param('id') id: number): Promise<Product | null> {
        return await this.productService.getSingleProduct(id);
    }

    @Get()
    public async getAllProducts(): Promise<Product[]> {
        return await this.productService.getAllProducts();
    }

    @Delete(':id')
    public async deleteProduct(@Param('id') id: number): Promise<boolean> {
        return await this.productService.deleteProduct(id);
    }

    @Get('get-by-partial-name/:name')
    public async getProductByPartialMatch(@Param() param: {name: string}): Promise<Product[]> {
        return await this.productService.getProductByPartialMatch(param.name);
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    public async updateProduct(@Param('id') id: number, @Body() productRequest: CreateProductRequest) {
        return await this.productService.updateProduct(id, productRequest);
    }

    @Get('get-by-category/:category')
    public async getProductByCategory(@Param() param: {category: string}): Promise<Product[]> {
        return await this.productService.getProductByCategory(param.category);
    }

    @Put('toggle-availability/:isAvailable')
    public async toggleProductAvailability(@Param() param: {id: number, isAvailable: boolean}): Promise<Product> {
        return await this.productService.toggleProductAvailability(param.id, param.isAvailable);
    }
}
