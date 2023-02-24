import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { Patient } from './entities/patient.entity';
import { Doctor } from '../doctor/entities/doctor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorService } from '../doctor/doctor.service';
import { Hospital } from '../hospital/entities/hospital.entity';
import { HospitalService } from '../hospital/hospital.service';
import { UserService } from '../user/user.service';
import { Users } from '../user/entities/user.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([Doctor, Patient, Hospital, Users]) ],
  controllers: [PatientController],
  providers: [PatientService, DoctorService, HospitalService, UserService]
})
export class PatientModule {}
