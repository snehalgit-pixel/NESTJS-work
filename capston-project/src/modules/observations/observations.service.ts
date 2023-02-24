import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorService } from '../doctor/doctor.service';
import { PatientService } from '../patient/patient.service';
import { CreateObservationDto } from './dto/create-observation.dto';
import { UpdateObservationDto } from './dto/update-observation.dto';
import { Observation } from './entities/observation.entity';

@Injectable()
export class ObservationsService {
  constructor(
    @InjectRepository(Observation) private observationsService: Repository<Observation>,
    private patientService: PatientService,
    private doctorService: DoctorService
) {}
  public async createObservation(createObservationDto: CreateObservationDto): Promise<Observation> {
    const newObservation: Observation = await this.observationsService.save({
      date: createObservationDto.date ? createObservationDto.date : new Date(),
      report: createObservationDto.report ? createObservationDto.report : 'N/A',
    });
    const patientId = typeof(createObservationDto.patientId) == 'number' ? createObservationDto.patientId : Number(createObservationDto.patientId);
    const patient = await this.patientService.findOnePatientById(patientId, 'observations');
    patient.observations.push(newObservation);
    await patient.save();
    const doctorId = typeof (createObservationDto.doctorId) == 'number' ? createObservationDto.doctorId : Number(createObservationDto.doctorId);
    const doctorInCharge = await this.doctorService.findOneDoctorById(doctorId, 'observations');
    doctorInCharge.observations.push(newObservation);
    await doctorInCharge.save();
    return newObservation;
  }

  public async findAllObservations(): Promise<Observation[]> {
    return await this.observationsService.find({
      order: { observationId: 'DESC' }
    });
  }

  public async findOneObservationById(id: number): Promise<Observation> {
    return await this.observationsService.findOne({ where: {observationId: id} });
  }

  public async deleteObservationById(id: number): Promise<boolean> {
    const res = await this.observationsService.delete({ observationId: id });
    if (!res) {
      return false;
    }
    return true;
  }

  public async updateObservationById(observationId: number, updateObservationDto: UpdateObservationDto): Promise<boolean> {
    const response = await this.observationsService.update(observationId, updateObservationDto);
    if (!response) {
      return false;
    }
    return true;
  }
}
