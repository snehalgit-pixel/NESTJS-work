import { IsNotEmpty, Length } from "class-validator";
import { Doctor } from "src/modules/doctor/entities/doctor.entity";
import { Hospital } from "src/modules/hospital/entities/hospital.entity";
import { Observation } from "src/modules/observations/entities/observation.entity";
import { Test } from "src/modules/tests/entities/test.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('patient')
export class Patient extends BaseEntity {
    @PrimaryGeneratedColumn({ comment:'Unique Id of the patient' })
    patientId: number;

    @Column()
    @Length(1, 9999)
    @IsNotEmpty({ message: 'Patient name cannot be empty' })
    patientName: string;

    @Column()
    @Length(1, 10)
    @IsNotEmpty({ message: 'Contact number cannot be empty' })
    contactNumber: number;

    @Column()
    @Length(1, 9999)
    @IsNotEmpty({ message: 'Email ID cannot be empty' })
    emailId: string;

    @CreateDateColumn()
    dateOfAdmission?: Date;

    @ManyToMany(() => Doctor, (doctor) => doctor.patients)
    @JoinTable()
    doctors?: Doctor[];

    @OneToMany(() => Test, (test) => test.patient)
    tests?: Test[];
    
    @OneToMany(() => Observation, (observation) => observation.patient)
    observations?: Observation[];

    @ManyToOne(() => Hospital, (hospital) => hospital.patient)
    hospital: Hospital;
}
