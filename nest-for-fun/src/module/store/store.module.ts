/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreController } from './store.controller';
import { Store } from './store.entity';
import { StoreService } from './store.service';

@Module({
  controllers: [StoreController],
  imports: [TypeOrmModule.forFeature([Store])],
  providers: [StoreService],
})
export class StoreModule {}