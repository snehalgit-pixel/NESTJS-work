import { Controller, Get, Post, Body, Param, UseGuards, Put, HttpException, HttpStatus, Headers } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Patient } from './entities/patient.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleBasedAuthorization } from '../auth/role-based-authorization.guard';
import { Role } from '../auth/enums/role.enum';
import { UserService } from '../user/user.service';

@ApiBearerAuth()
@ApiHeader({ name: 'email', description: 'E-mail ID of the logged in user', example: 'xyz@yahoo.com' })
@ApiHeader({
  name: 'role',
  description: 'Role of the user',
  enum: Role,
  example: Role.Patient
})
@ApiTags('Patient')
@Controller('patient')
@UseGuards(new JwtAuthGuard())
@UseGuards(new RoleBasedAuthorization())
export class PatientController {
  constructor(
    private readonly patientService: PatientService,
    private readonly userService: UserService
    ) {}

  @Post()
  @ApiCreatedResponse({ description: 'Successfully adds a new patient', type: Patient })
  @ApiBadRequestResponse({ description: 'Failed to add a new patient' })
  public async addPatient(@Body() createPatientDto: CreatePatientDto, @Headers() headers: any): Promise<boolean> {
    try {
      return await this.patientService.addPatient(createPatientDto, headers);
    }
    catch(error) {
      throw new HttpException(`Server response failed! Details: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @ApiOkResponse({ description: 'Successfully returns all patients', type: [Patient] })
  @ApiBadRequestResponse({ description: 'Failed to return patients' })
  public async findAllPatients(): Promise<Patient[]> {
    try {
      return await this.patientService.findAllPatients();
    }
    catch(error) {
      throw new HttpException(`Server response failed! Details: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Successfully returns the patient by matching ID', type: Patient })
  @ApiBadRequestResponse({ description: 'Failed to return the patient by ID' })
  public async findOnePatientById(@Param('id') id: string | number, @Headers() headers: any) {
    try {
      const patient = await this.patientService.findOnePatientById(+id);
      const userEmail: string = headers?.email;
      if (!userEmail) {
        throw new HttpException("Could not verify user due to lack of e-mail ID in request header!", HttpStatus.BAD_REQUEST);
      }
      const currentUser = await this.userService.getUserByEmail({ email: userEmail });
      if ( !currentUser || ( currentUser?.role === Role.Patient && currentUser?.email !== patient.emailId ) ) {
        throw new HttpException("Forbidden! Patient(you) can view only self details", HttpStatus.FORBIDDEN);
      }
      else {
        return patient;
      }
    }
    catch(error) {
      throw new HttpException(`Server response failed! Details: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('get-patients-by-doctorId/:doctorId')
  @ApiOkResponse({ description: 'Successfully returns patients by matching the doctor ID', type: [Patient] })
  @ApiBadRequestResponse({ description: 'Failed to return patients' })
  public async findPatientsByDoctorId(@Param('doctorId') doctorId: string | number): Promise<Patient[]> {
    try {
      return await this.patientService.findPatientsByDoctorId(Number(doctorId));
    }
    catch(error) {
      throw new HttpException(`Server response failed! Details: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Successfully updates the details of a patient', type: Boolean })
  @ApiBadRequestResponse({ description: 'Failed to update the details of a patient' })
  public async updatePatientById(@Param('id') id: string | number, @Headers() headers: any, @Body() updatePatientDto: UpdatePatientDto): Promise<boolean> {
    try {
      const patient = await this.patientService.findOnePatientById(+id);
      const userEmail: string = headers?.email;
      if (!userEmail) {
        throw new HttpException("Could not verify user due to lack of e-mail ID in request header!", HttpStatus.BAD_REQUEST);
      }
      const currentUser = await this.userService.getUserByEmail({ email: userEmail });
      if ( !currentUser || ( currentUser?.role === Role.Patient && currentUser?.email !== patient.emailId ) ) {
        throw new HttpException("Forbidden! Patient(you) can edit only self details", HttpStatus.FORBIDDEN);
      }
      else {
        const patientId = typeof(id) == 'string' ? Number(id) : id;
        return await this.patientService.updatePatientById(patientId, updatePatientDto);
      }
    }
    catch(error) {
      throw new HttpException(`Server response failed! Details: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
