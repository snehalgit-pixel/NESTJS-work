/* eslint-disable prettier/prettier */
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../product/product.entity";

@Entity('order')
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id = 0;
    
    @Column({ type: 'varchar', default: '' })
    nameOfPerson = '';

    @Column({ type: 'double', default: 0.0 })
    amountPaid?: number;

    @Column({ type: 'array', default: [] })
    products?: Product[];

    @Column({ type: 'date' })
    dateOfOrder?: Date;

    @Column({type: 'double'})
    discount?: number;

    @Column({type: 'integer'})
    couponsUsed?: number;
}