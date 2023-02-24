import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorService } from '../doctor/doctor.service';
import { Doctor } from '../doctor/entities/doctor.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient) private patientService: Repository<Patient>,
    private doctorService: DoctorService
) {}
  public async addPatient(createPatientDto: CreatePatientDto): Promise<Patient> {
    const doctors: Doctor[] = await this.doctorService.findDoctorsByIds(createPatientDto.doctorIds);
    const newPatient: Patient = await this.patientService.save({
      patientName: createPatientDto.patientName,
      contactNumber: createPatientDto.contactNumber,
      aadharNumber: createPatientDto.aadharNumber,
      emailId: createPatientDto.emailId ? createPatientDto.emailId : '',
      dateOfAdmission: createPatientDto.dateOfAdmission ? createPatientDto.dateOfAdmission : new Date(),
      doctors: doctors,
    });
    doctors.forEach((doctor: Doctor) => {
      doctor.patients.push(newPatient);
      doctor.save();
    });
    return await newPatient;
  }

  public async findAllPatients(size: number, pageNumber: number): Promise<Patient[]> {
    return await this.patientService.find(
      {
          skip: ( pageNumber - 1 ) * size,
          take: size,
          order: { patientId: 'DESC' }
      }
      );
  }

  public async findOnePatientById(id: number): Promise<Patient> {
    return await this.patientService.findOne({ where: {patientId: id} });
  }
}
