/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from "@nestjs/swagger";
import { StoreService } from "../store/store.service";
import { CreateProductRequest } from "./create-product.dto";
import { Product } from "./product.entity";
import { ProductService } from "./product.service";

@ApiTags('Product')
@Controller('product')
export class ProductController {
    constructor(
        private productService: ProductService,
        private storeService: StoreService
        ) {}

    @Post()
    @UsePipes(ValidationPipe)
    @ApiCreatedResponse({ description: 'Successfully adds a new product', type: Product })
    @ApiBadRequestResponse({ description: 'Failed to create a new product' })
    @ApiBody({
        description: 'API request to create/add a product',
        type: CreateProductRequest
    })
    public async createProduct(@Body() product: CreateProductRequest): Promise<Product> {
        const store = await this.storeService.getSingleStore(product.storeId);
        return await this.productService.createProduct(product, store);
    }

    @Get(':id')
    @ApiOkResponse({ description: 'Successfully returns product by ID', type: Product })
    @ApiBadRequestResponse({ description: 'Failed to return the specified product' })
    @ApiParam({
        description: 'ID of the product passed as parameter',
        example: 9,
        name: 'id'
    })
    public async getSingleProduct(@Param('id') id: number): Promise<Product> {
        return await this.productService.getSingleProduct(id);
    }

    @Get()
    @ApiOkResponse({ description: 'Successfully returns all products', type: [ Product ] })
    @ApiBadRequestResponse({ description: 'Failed to return all the products' })
    public async getAllProducts(): Promise<Product[]> {
        return await this.productService.getAllProducts();
    }

    @Delete(':id')
    @ApiOkResponse({ description: 'Successfully deletes product by ID', type: Boolean })
    @ApiBadRequestResponse({ description: 'Failed to delete the specified product' })
    @ApiParam({
        description: 'ID of the product passed as parameter',
        example: 15,
        name: 'id'
    })
    public async deleteProduct(@Param('id') id: number): Promise<boolean> {
        return await this.productService.deleteProduct(id);
    }

    @Get('get-by-partial-name/:name')
    @ApiOkResponse({ description: 'Successfully returns product by partial match of the provided name', type: [ Product ] })
    @ApiBadRequestResponse({ description: 'Failed to return the specified product' })
    @ApiParam({
        description: 'Name of the product passed as object parameter',
        example: "Harry",
        name: 'name'
    })
    public async getProductByPartialMatch(@Param() param: {name: string}): Promise<Product[]> {
        return await this.productService.getProductByPartialMatch(param.name);
    }
}
