import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { Doctor } from './entities/doctor.entity';
import { Patient } from '../patient/entities/patient.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [DoctorController],
  imports: [TypeOrmModule.forFeature([Doctor, Patient])],
  providers: [DoctorService]
})
export class DoctorModule {}
