import { Patient } from "src/modules/patient/entities/patient.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('observation')
export class Observation {
    @PrimaryGeneratedColumn()
    observationId: number;

    @Column()
    date?: Date;

    @Column()
    report?: string;

    @ManyToOne(() => Patient, (patient) => patient.observations)
    patient?: Patient;
}
