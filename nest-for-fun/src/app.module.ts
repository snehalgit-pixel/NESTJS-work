import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './module/product/product.module';
import { StoreModule } from './module/store/store.module';
import { ManagerModule } from './module/manager/manager.module';
import { typeOrmConfig } from 'db/data-source';

@Module({
  imports: [
    StoreModule,
    ProductModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    // TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    ManagerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
