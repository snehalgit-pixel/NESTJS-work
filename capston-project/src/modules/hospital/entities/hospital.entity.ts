import { Length } from 'class-validator';
import { Doctor } from '../../doctor/entities/doctor.entity';
import { Patient } from '../../patient/entities/patient.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('hospital')
export class Hospital extends BaseEntity {
  @PrimaryGeneratedColumn()
  hospital_Id: number;

  @Column()
  hospitalName: string;

  @Column()
  @Length(5, 50)
  hospitalAddress: string;

  @OneToMany(() => Patient, (patient) => patient.hospital)
  patient: Patient[];

  @OneToMany(() => Doctor, (doctor) => doctor.hospital)
  doctor: Doctor[];
}
