/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateStoreRequest } from "./create-store.dto";
import { Store } from "./store.entity";
import { StoreService } from "./store.service";
import { ApiBody, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiParam } from "@nestjs/swagger";

@ApiTags('Store')
@Controller('store')
export class StoreController {
    constructor(private storeService: StoreService) {}

    @Post()
    @UsePipes(ValidationPipe)
    @ApiCreatedResponse({ description: 'Successfully creates a new store', type: Store })
    @ApiBadRequestResponse({ description: 'Failed to create a new store' })
    @ApiBody({
        description: 'API request to create/add a store',
        type: CreateStoreRequest
    })
    public async createStore(@Body() store: CreateStoreRequest): Promise<Store> {
        return await this.storeService.createStore(store);
    }

    @Put()
    @UsePipes(ValidationPipe)
    @ApiOkResponse({ description: 'Successfully updates an existing store', type: Store })
    @ApiBadRequestResponse({ description: 'Failed to update the store' })
    @ApiBody({
        description: 'API request to update a store',
        type: CreateStoreRequest
    })
    public async updateStore(@Body() store: CreateStoreRequest) {
        return await this.storeService.updateStore(store);
    }

    @Get(':id')
    @ApiOkResponse({ description: 'Successfully returns store by ID', type: Store })
    @ApiBadRequestResponse({ description: 'Failed to return the store' })
    @ApiParam({
        description: 'ID in Parameter',
        example: 12,
        name: 'id'
    })
    public async getSingleStore(@Param('id') id: number) {
        return await this.storeService.getSingleStore(id);
    }

    @Get('all-stores')
    @ApiOkResponse({ description: 'Successfully returns all the stores', type: [ Store ] })
    @ApiBadRequestResponse({ description: 'Failed to return all the stores' })
    public async getAllStores(): Promise<Store[]> {
        return await this.storeService.getAllStores();
    }

    @Get('pageWidth/:page')
    @ApiOkResponse({ description: 'Successfully returns paginated data of stores', type: [ Store ] })
    @ApiBadRequestResponse({ description: 'Failed to return data' })
    @ApiParam({
        description: 'Size of the page',
        example: 10,
        name: 'pageWidth'
    })
    @ApiParam({
        description: 'Number of the page',
        example: 1,
        name: 'page'
    })
    public async getPageStores(
        @Param('pageWidth') pageWidth: number,
        @Param('page') page: number
    ) {
        return await this.storeService.getPageVal(pageWidth, page);
    }
}