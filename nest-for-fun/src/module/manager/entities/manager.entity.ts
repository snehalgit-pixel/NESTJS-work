/* eslint-disable prettier/prettier */
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('manager')
export class Manager extends BaseEntity {
    @PrimaryGeneratedColumn()
    
    managerId: number;

    @Column({ type: 'varchar' })
    name?: string;

    @Column({ type: 'array' })
    storeIds?: number[];
}
