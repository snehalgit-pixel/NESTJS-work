import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorService } from '../doctor/doctor.service';
import { PatientService } from '../patient/patient.service';
import { CreateMedicalTestDto } from './dto/create-medical-test.dto';
import { UpdateMedicalTestDto } from './dto/update-medical-test.dto';
import { Test } from './entities/test.entity';

@Injectable()
export class TestsService {
  constructor(
    @InjectRepository(Test) private testsService: Repository<Test>,
    private patientService: PatientService,
    private doctorService: DoctorService
  ) { }
  public async createMedicalTest(createTestDto: CreateMedicalTestDto): Promise<Test> {
    const newTest: Test = await this.testsService.save({
      description: createTestDto.description ? createTestDto.description : 'N/A',
      medicine: createTestDto.medicine ? createTestDto.medicine : 'N/A',
      testDate: createTestDto.testDate ? createTestDto.testDate : new Date(),
      isClosed: createTestDto.isClosed ? createTestDto.isClosed : false
    });
    const patientId = typeof (createTestDto.patientId) == 'number' ? createTestDto.patientId : Number(createTestDto.patientId);
    const patient = await this.patientService.findOnePatientById(patientId, 'tests');
    patient.tests.push(newTest);
    await patient.save();
    const doctorId = typeof (createTestDto.doctorId) == 'number' ? createTestDto.doctorId : Number(createTestDto.doctorId);
    const doctorInCharge = await this.doctorService.findOneDoctorById(doctorId, 'tests');
    doctorInCharge.tests.push(newTest);
    await doctorInCharge.save();
    return newTest;
  }

  public async findAllTests(): Promise<Test[]> {
    return await this.testsService.find({
      order: { testId: 'DESC' }
    });
  }

  public async findOneTestById(id: number): Promise<Test> {
    return await this.testsService.findOne({ where: { testId: id } });
  }

  public async deleteTestById(id: number): Promise<boolean> {
    const res = await this.testsService.delete({ testId: id });
    if (!res) {
      return false;
    }
    return true;
  }

  public async updateMedicalTestById(testId: number, updateMedicalTestDto: UpdateMedicalTestDto): Promise<boolean> {
    const response = await this.testsService.update(testId, updateMedicalTestDto);
    if (!response) {
      return false;
    }
    return true;
  }
}
