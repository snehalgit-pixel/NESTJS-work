import { Doctor } from "src/modules/doctor/entities/doctor.entity";
import { Patient } from "src/modules/patient/entities/patient.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('test')
export class Test {
    @PrimaryGeneratedColumn({comment:'This is unique to the medical test'})
    testId: number;
  
    @Column({type: 'varchar', default: 'NA'})
    description?: string;

    @Column({type: 'varchar', default: 'NA'})
    medicine?: string;

    @Column()
    testDate?: Date;

    @Column({type: 'boolean', default: false})
    isClosed?: boolean;

    @ManyToOne(() => Patient, (patient) => patient.tests)
    patient?: Patient;

    @ManyToOne(() => Doctor, (doctor) => doctor.tests)
    doctorInCharge?: Doctor;
}

