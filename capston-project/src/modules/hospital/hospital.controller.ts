import { Controller, Get, Post, Body, Param, UseGuards, Put } from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';
import { Hospital } from './entities/hospital.entity';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Doctor } from '../doctor/entities/doctor.entity';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@ApiTags('Hospital')
@UseGuards(JwtAuthGuard)
@Controller('hospital')
export class HospitalController {
  constructor(private readonly hospitalService: HospitalService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Successfully adds a new hospital', type: Hospital })
  @ApiBadRequestResponse({ description: 'Failed to add a new hospital' })
  public async addHospital(@Body() createHospitalDto: CreateHospitalDto): Promise<Hospital> {
    try {
      return await this.hospitalService.addHospital(createHospitalDto);
    }
    catch(error) {
      throw new HttpException(`Server response failed! Details: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @ApiOkResponse({ description: 'Successfully returns all the hospitals', type: [ Hospital ] })
  @ApiBadRequestResponse({ description: 'Failed to return all the hospitals' })
  public async findAllHospitals(): Promise<Hospital[]> {
    try {
      return await this.hospitalService.findAllHospitals();
    }
    catch(error) {
      throw new HttpException(`Server response failed! Details: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Successfully returns the hospital by matching ID', type: Doctor })
  @ApiBadRequestResponse({ description: 'Failed to return the hospital by ID' })
  public async findOneHospitalById(@Param('id') id: string | number): Promise<Hospital> {
    try {
      const hospital_Id = typeof(id) == 'string' ? Number(id) : id;
      return await this.hospitalService.findOneHospitalById(hospital_Id);
    }
    catch(error) {
      throw new HttpException(`Server response failed! Details: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Successfully updates a hospital', type: Boolean })
  @ApiBadRequestResponse({ description: 'Failed to update hospital details' })
  public async updateHospitalById(@Param('id') id: string | number, @Body() updateHospitalDto: UpdateHospitalDto): Promise<boolean> {
    try {
      const hospitalId = typeof(id) == 'string' ? Number(id) : id;
      return await this.hospitalService.updateHospitalById(hospitalId, updateHospitalDto);
    }
    catch(error) {
      throw new HttpException(`Server response failed! Details: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
