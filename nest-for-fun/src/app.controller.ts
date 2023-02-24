import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService, Store } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get('hello')
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  // @Post('makeStore')
  // makeStore(@Body() storeBody: { count: number }): string {
  //   return this.appService.apiCallRec(storeBody);
  // }

  // @Get('getStore')
  // getStore(): number {
  //   return this.appService.apiCallRes();
  // }

  // @Post('create-new-store')
  // public async createNewStore(
  //   @Body() parametersForStore: Store,
  // ): Promise<void> {
  //   try {
  //     return await this.appService.createNewStore(parametersForStore);
  //   } catch (error) {
  //     console.log('Throw Custom Http exception');
  //   }
  // }

  // @Get('all-stores')
  // public async getAllStores(): Promise<Store[]> {
  //   try {
  //     return await this.appService.getAllStores();
  //   } catch (error) {
  //     console.log('Throw Custom Http exception');
  //   }
  // }

  // @Get('store-by-name/:name')
  // public async getStoreByName(
  //   @Param() param: { name: string },
  // ): Promise<Store> {
  //   try {
  //     return await this.appService.getStoreByName(param.name);
  //   } catch (error) {
  //     console.log('Throw Custom Http exception');
  //   }
  // }

  // @Delete('delete-store/:name')
  // public async deleteStore(@Param() param: { name: string }): Promise<boolean> {
  //   try {
  //     return await this.appService.deleteStore(param.name);
  //   } catch (error) {
  //     console.log('Throw Custom Http exception');
  //   }
  // }

  // @Put('modify-store/:name')
  // public async modifyStore(
  //   @Param() param: { name: string },
  //   @Body() modifyParameters: Store,
  // ): Promise<boolean> {
  //   try {
  //     return await this.appService.modifyStore(param.name, modifyParameters);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}
