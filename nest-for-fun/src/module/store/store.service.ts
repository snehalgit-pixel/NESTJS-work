/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateStoreRequest } from "./create-store.dto";
import { Store } from "./store.entity";

@Injectable()
export class StoreService {
    constructor(
        @InjectRepository(Store) private storeService: Repository<Store>
    ) {}

    public async createStore(store: CreateStoreRequest): Promise<Store> {
        return await this.storeService.save({
            name: store.title,
            description: store.description
        });
    }

    public async getSingleStore(id: number): Promise<Store> {
        return await this.storeService.findOne({ where: {id: id} });
    }

    // public async getAllStores(store: CreateStoreRequest) {
    //     return await store;
    // }

    public async getAllStores(): Promise<Store[]> {
        return await this.storeService.find();
    }

    public updateStore(store: CreateStoreRequest) {
        // update and return
        return store;
    }

    getPageVal(size: number, page: number) {
        return this.storeService.find(
            {
                skip: ( page - 1 ) * size,
                take: size,
                order: { name: 'DESC' }
            }
        );
    }
}