import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Length } from 'class-validator';
import { Patient } from "src/modules/patient/entities/patient.entity";

@Entity('doctor')
export class Doctor extends BaseEntity {
    @PrimaryGeneratedColumn()
    doctorId: number;

    @Column()
    @Length(1, 9999)
    doctorName: string;

    @Column()
    @Length(1, 10)
    contactNumber: number;

    @Column()
    registrationNumber: number;

    @Column()
    @Length(1, 9999)
    emailId?: string;

    @Column()
    dateOfJoining?: Date;

    @Column()
    @Length(1, 999)
    specialization?: string;

    @ManyToMany(() => Patient, (patient) => patient.doctors)
    @JoinTable()
    patients?: Patient[];
}
