import { Doctor } from "src/modules/doctor/entities/doctor.entity";
import { Patient } from "src/modules/patient/entities/patient.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('observation')
export class Observation {
    @PrimaryGeneratedColumn()
    observationId: number;

    @CreateDateColumn()
    date?: Date;

    @Column()
    report?: string;

    @ManyToOne(() => Patient, (patient) => patient.observations)
    patient?: Patient;

    @ManyToOne(() => Doctor, (doctor) => doctor.observations)
    doctorInCharge?: Doctor;
}

