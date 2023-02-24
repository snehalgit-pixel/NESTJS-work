/* eslint-disable prettier/prettier */
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../product/product.entity";

@Entity('store')
export class Store extends BaseEntity {
    @PrimaryGeneratedColumn({ comment: 'This is unique to store' })
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'numeric', default: 0 })
    account?: number;

    @Column({ type: 'boolean', default: 1 })
    isActive?: boolean;

    @OneToMany(() => Product, (product) => product.store)
    products?: Product[];
}