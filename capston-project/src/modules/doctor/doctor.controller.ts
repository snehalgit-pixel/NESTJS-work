import { Controller, Get, Post, Body, Param, UseGuards, Put, HttpException, HttpStatus } from '@nestjs/common';
import { ApiCreatedResponse, ApiBadRequestResponse, ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleBasedAuthorization } from '../auth/role-based-authorization.guard';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';

@ApiTags('Doctor')
@UseGuards(JwtAuthGuard, RoleBasedAuthorization)
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) { }

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Successfully adds a new doctor', type: Boolean })
  @ApiBadRequestResponse({ description: 'Failed to add a new doctor' })
  public async addDoctor(@Body() createDoctorDto: CreateDoctorDto): Promise<boolean> {
    try {
      return await this.doctorService.addDoctor(createDoctorDto);
    }
    catch (error) {
      throw new HttpException(`Server response failed! Details: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Successfully returns all the doctors', type: [Doctor] })
  @ApiBadRequestResponse({ description: 'Failed to return all the doctors' })
  public async findAllDoctors(): Promise<Doctor[]> {
    try {
      return await this.doctorService.findAllDoctors();
    }
    catch (error) {
      throw new HttpException(`Server response failed! Details: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Successfully returns the doctor by matching ID', type: Doctor })
  @ApiBadRequestResponse({ description: 'Failed to return the doctor by ID' })
  public async findOneDoctorById(@Param('id') id: string | number): Promise<Doctor> {
    try {
      return await this.doctorService.findOneDoctorById(+id);
    }
    catch (error) {
      throw new HttpException(`Server response failed! Details: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('get-doctor-by-name/:name')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Successfully returns the doctor by matching name', type: Doctor })
  @ApiBadRequestResponse({ description: 'Failed to return the doctor by name' })
  public async findOneDoctorByName(@Param() param: { name: string }): Promise<Doctor> {
    try {
      return await this.doctorService.findOneDoctorByName(param.name);
    }
    catch (error) {
      throw new HttpException(`Server response failed! Details: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('get-doctor-by-specialization/:specialization')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Successfully returns the doctor by matching specialization', type: Doctor })
  @ApiBadRequestResponse({ description: 'Failed to return the doctor by specialization' })
  public async findDoctorsBySpecialization(@Param() param: { specialization: string }): Promise<Doctor[]> {
    try {
      return await this.doctorService.findDoctorsBySpecialization(param.specialization);
    }
    catch (error) {
      throw new HttpException(`Server response failed! Details: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Successfully updates the details of a doctor', type: Boolean })
  @ApiBadRequestResponse({ description: 'Failed to update the details of a doctor' })
  public async updateDoctorById(@Param('id') id: string | number, @Body() updateDoctorDto: UpdateDoctorDto): Promise<boolean> {
    try {
      const doctorId = typeof (id) == 'string' ? Number(id) : id;
      return await this.doctorService.updateDoctorById(doctorId, updateDoctorDto);
    }
    catch (error) {
      throw new HttpException(`Server response failed! Details: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('get-doctors-by-IDs')
  @ApiOkResponse({ description: 'Successfully returns the doctors by matching an array of IDs', type: [Doctor] })
  @ApiBadRequestResponse({ description: 'Failed to return the doctors by IDs' })
  public async findDoctorsByIds(@Body() doctorIds: {doctorIds: number[]}) {
    return await this.doctorService.findDoctorsByIds(doctorIds.doctorIds);
  }
}
