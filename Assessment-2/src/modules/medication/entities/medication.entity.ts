import { Patient } from "src/modules/patient/entities/patient.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('medication')
export class Medication {
    @PrimaryGeneratedColumn()
    medicationId: number;

    @Column()
    date?: Date;

    @Column()
    description?: string;

    @ManyToOne(() => Patient, (patient) => patient.medications)
    patient?: Patient;
}
