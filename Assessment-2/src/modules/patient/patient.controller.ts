import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Patient } from './entities/patient.entity';
import { Doctor } from '../doctor/entities/doctor.entity';

@ApiTags('Patient')
@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @ApiCreatedResponse({ description: 'Successfully adds a new patient', type: Patient })
  @ApiBadRequestResponse({ description: 'Failed to add a new patient' })
  @Post()
  public async addPatient(@Body() createPatientDto: CreatePatientDto): Promise<Patient> {
    return await this.patientService.addPatient(createPatientDto);
  }

  @ApiOkResponse({ description: 'Successfully returns all patients', type: [Patient] })
  @ApiBadRequestResponse({ description: 'Failed to return patients' })
  @Get()
  public async findAllPatients(
    @Param('pageWidth') pageWidth: number,
    @Param('page') pageNumber: number
  ): Promise<Patient[]> {
    return await this.patientService.findAllPatients(pageWidth, pageNumber);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Successfully returns the patient by matching ID', type: Doctor })
  @ApiBadRequestResponse({ description: 'Failed to return the patient by ID' })
  public async findOneDoctorById(@Param('id') id: string) {
    return this.patientService.findOnePatientById(+id);
  }
}
