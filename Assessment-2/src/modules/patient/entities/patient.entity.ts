import { Length } from "class-validator";
import { Doctor } from "src/modules/doctor/entities/doctor.entity";
import { Medication } from "src/modules/medication/entities/medication.entity";
import { Observation } from "src/modules/observation/entities/observation.entity";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('patient')
export class Patient extends BaseEntity {
    @PrimaryGeneratedColumn()
    patientId: number;

    @Column()
    @Length(1, 9999)
    patientName: string;

    @Column()
    @Length(1, 10)
    contactNumber: number;

    @Column()
    aadharNumber: number;

    @Column()
    @Length(1, 9999)
    emailId?: string;

    @Column()
    dateOfAdmission?: Date;

    @ManyToMany(() => Doctor, (doctor) => doctor.patients)
    @JoinTable()
    doctors?: Doctor[];

    @OneToMany(() => Medication, (medication) => medication.patient)
    medications?: Medication[];
    
    @OneToMany(() => Observation, (observation) => observation.patient)
    observations?: Observation[];
}
