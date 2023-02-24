/* eslint-disable prettier/prettier */
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Store } from "../store/store.entity";

@Entity('product')
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'text' })
    description?: string;

    @Column({ type: 'numeric', default: 0 })
    price?: number;

    @Column({ type: 'boolean', default: true })
    isAvailable?: boolean;

    @ManyToOne(() => Store, (store) => store.products)
    store: Store;
}