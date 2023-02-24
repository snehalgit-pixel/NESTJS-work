import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from '../doctor/entities/doctor.entity';
import { Patient } from './entities/patient.entity';
import { DoctorService } from '../doctor/doctor.service';

@Module({
  controllers: [PatientController],
  imports: [TypeOrmModule.forFeature([Doctor, Patient])],
  providers: [PatientService, DoctorService]
})
export class PatientModule {}
