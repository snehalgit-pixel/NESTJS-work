import { Module } from '@nestjs/common';
import { TestsService } from './tests.service';
import { TestsController } from './tests.controller';
import { PatientService } from '../patient/patient.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from './entities/test.entity';
import { Patient } from '../patient/entities/patient.entity';
import { Doctor } from '../doctor/entities/doctor.entity';
import { DoctorService } from '../doctor/doctor.service';
import { Hospital } from '../hospital/entities/hospital.entity';
import { HospitalService } from '../hospital/hospital.service';
import { Users } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Module({
  imports: [ TypeOrmModule.forFeature([Test, Patient, Doctor, Hospital, Users]) ],
  controllers: [TestsController],
  providers: [TestsService, PatientService, DoctorService, HospitalService, UserService]
})
export class TestsModule {}
