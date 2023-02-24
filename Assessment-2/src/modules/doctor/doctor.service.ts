import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { Doctor } from './entities/doctor.entity';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor) private doctorService: Repository<Doctor>
) {}
  public async addDoctor(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    return await this.doctorService.save({
      doctorName: createDoctorDto.doctorName,
      contactNumber: createDoctorDto.contactNumber,
      registrationNumber: createDoctorDto.registrationNumber,
      emailId: createDoctorDto.emailId ? createDoctorDto.emailId : '',
      dateOfJoining: createDoctorDto.dateOfJoining ? createDoctorDto.dateOfJoining : new Date(),
      specialization: createDoctorDto.specialization ? createDoctorDto.specialization : ''
  });
  }

  public async findAllDoctors(size: number, pageNumber: number): Promise<Doctor[]> {
    return await this.doctorService.find(
      {
          skip: ( pageNumber - 1 ) * size,
          take: size,
          order: { doctorId: 'DESC' }
      }
      );
  }

  public async findOneDoctorById(id: number): Promise<Doctor> {
    return await this.doctorService.findOne({ where: {doctorId: id} });
  }

  public async findOneDoctorByName(name: string): Promise<Doctor> {
    return await this.doctorService.findOne({ where: {doctorName: name} });
  }

  public async findDoctorsByIds(ids: number[]): Promise<Doctor[]> {
    return await this.doctorService.find({ where: {doctorId: In(ids)} });
  }
}
