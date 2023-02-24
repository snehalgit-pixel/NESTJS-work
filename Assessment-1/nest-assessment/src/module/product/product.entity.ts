/* eslint-disable prettier/prettier */
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('product')
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id = 0;
    
    @Column({ type: 'varchar', default: '' })
    name = '';

    @Column({ type: 'text', default: true })
    category?: string;

    @Column({ type: 'text' })
    description?: string;

    @Column({ type: 'numeric', default: 0 })
    price?: number;

    @Column({ type: 'boolean', default: true })
    isAvailableForSale?: boolean;

    @Column({ type: 'boolean', default: true })
    isInStock?: boolean;

    @Column({ type: 'boolean', default: true })
    isCoveredInReturnPolicy?: boolean;
}