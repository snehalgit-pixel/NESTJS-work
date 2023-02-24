import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { HospitalService } from '../hospital/hospital.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor) private doctorService: Repository<Doctor>,
    private hospitalService: HospitalService 
) {}
  public async addDoctor(createDoctorDto: CreateDoctorDto): Promise<boolean> {
    const hospital = await this.hospitalService.findOneHospitalById(createDoctorDto.hospital_Id, 'doctor');
    const newDoctor: Doctor = await this.doctorService.save({
      doctorName: createDoctorDto.doctorName,
      contactNumber: createDoctorDto.contactNumber,
      registrationNumber: createDoctorDto.registrationNumber,
      emailId: createDoctorDto.emailId ? createDoctorDto.emailId : 'NA',
      dateOfJoining: createDoctorDto.dateOfJoining ? createDoctorDto.dateOfJoining : new Date(),
      speciality: createDoctorDto.speciality ? createDoctorDto.speciality : 'General'
  });
  if (!hospital) {
    return false;
  }
  hospital.doctor = [...hospital.doctor, newDoctor];
  await hospital.save()
  return true;
  }

  public async findAllDoctors(): Promise<Doctor[]> {
    return await this.doctorService.find(
      {
          order: { doctorId: 'DESC' }
      }
      );
  }

  public async findOneDoctorById(id: number, requestFrom?: string): Promise<Doctor> {
    if (requestFrom == 'observations') {
      return await this.doctorService.findOne({
        where: { doctorId:id  },
        relations: ['observations'],
      });
    }
    else if (requestFrom == 'tests') {
      return await this.doctorService.findOne({
        where: { doctorId: id },
        relations: ['tests'],
      });
    }
    else {
      return await this.doctorService.findOne({
        where: { doctorId: id }
      });
    }
  }

  public async findOneDoctorByName(name: string): Promise<Doctor> {
    return await this.doctorService.findOne({ where: {doctorName: name} });
  }

  public async findDoctorsByIds(doctorIds: number[], requestFrom?: string): Promise<Doctor[]> {
    if (requestFrom == 'patient') {
      return await this.doctorService.find({ where: {doctorId: In(doctorIds)}, relations: ['patients'] });
    }
    else {
      return await this.doctorService.find({ where: {doctorId: In(doctorIds)} });
    }
  }

  public async findDoctorsBySpecialization(specialization: string): Promise<Doctor[]> {
    return await this.doctorService.find({ where: {speciality: specialization} });
  }

  public async updateDoctorById(doctorId: number, updateDoctorDto: UpdateDoctorDto): Promise<boolean> {
    const response = await this.doctorService.update(doctorId, updateDoctorDto);
    if (!response) {
      return false;
    }
    return true;
  }
}
