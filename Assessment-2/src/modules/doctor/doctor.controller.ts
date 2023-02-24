import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiCreatedResponse, ApiBadRequestResponse, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { Doctor } from './entities/doctor.entity';

@ApiTags('Doctor')
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Successfully adds a new doctor', type: Doctor })
  @ApiBadRequestResponse({ description: 'Failed to add a new doctor' })
  public async addDoctor(@Body() createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    return await this.doctorService.addDoctor(createDoctorDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Successfully returns all the doctors', type: [ Doctor ] })
  @ApiBadRequestResponse({ description: 'Failed to return all the doctors' })
  public async findAllDoctors(
    @Param('pageWidth') pageWidth: number,
    @Param('page') pageNumber: number
  ): Promise<Doctor[]> {
    return await this.doctorService.findAllDoctors(pageWidth, pageNumber);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Successfully returns the doctor by matching ID', type: Doctor })
  @ApiBadRequestResponse({ description: 'Failed to return the doctor by ID' })
  public async findOneDoctorById(@Param('id') id: string) {
    return this.doctorService.findOneDoctorById(+id);
  }

  @Get('get-doctor-by-name/:name')
  @ApiOkResponse({ description: 'Successfully returns the doctor by matching name', type: Doctor })
  @ApiBadRequestResponse({ description: 'Failed to return the doctor by name' })
  public async findOneDoctorByName(@Param() param: {name: string}) {
    return await this.doctorService.findOneDoctorByName(param.name);
  }

  @Get('get-doctors-by-IDs/:ids')
  @ApiOkResponse({ description: 'Successfully returns the doctors by matching an array of IDs', type: Doctor })
  @ApiBadRequestResponse({ description: 'Failed to return the doctors by IDs' })
  public async findDoctorsByIds(@Param() param: {ids: number[]}) {
    return await this.doctorService.findDoctorsByIds(param.ids);
  }
}
