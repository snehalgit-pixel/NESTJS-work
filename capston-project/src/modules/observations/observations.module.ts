import { Module } from '@nestjs/common';
import { ObservationsService } from './observations.service';
import { ObservationsController } from './observations.controller';
import { PatientService } from '../patient/patient.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Observation } from './entities/observation.entity';
import { Patient } from '../patient/entities/patient.entity';
import { Doctor } from '../doctor/entities/doctor.entity';
import { DoctorService } from '../doctor/doctor.service';
import { Hospital } from '../hospital/entities/hospital.entity';
import { HospitalService } from '../hospital/hospital.service';
import { Users } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Module({
  imports: [ TypeOrmModule.forFeature([Observation, Patient, Doctor, Hospital, Users]) ],
  controllers: [ObservationsController],
  providers: [ObservationsService, PatientService, DoctorService, HospitalService, UserService]
})
export class ObservationsModule {}
