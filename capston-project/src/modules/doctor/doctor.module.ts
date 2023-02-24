import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { Hospital } from '../hospital/entities/hospital.entity';
import { HospitalService } from '../hospital/hospital.service';

@Module({
  imports: [ TypeOrmModule.forFeature([Doctor, Hospital]) ],
  controllers: [DoctorController],
  providers: [DoctorService,HospitalService]
})
export class DoctorModule {}
