import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put, HttpException, HttpStatus } from '@nestjs/common';
import { TestsService } from './tests.service';
import { CreateMedicalTestDto } from './dto/create-medical-test.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Test } from './entities/test.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Patient } from '../patient/entities/patient.entity';
import { UpdateMedicalTestDto } from './dto/update-medical-test.dto';

@ApiTags('Medical Tests')
@UseGuards(JwtAuthGuard)
@Controller('tests')
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Successfully adds a new test', type: Test })
  @ApiBadRequestResponse({ description: 'Failed to add a new patient' })
  @UseGuards(JwtAuthGuard)
  public async createMedicalTest(@Body() createMedicalTestDto: CreateMedicalTestDto) {
    try {
      return await this.testsService.createMedicalTest(createMedicalTestDto);
    }
    catch(error) {
      throw new HttpException(`Server response failed! Details: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @ApiOkResponse({ description: 'Successfully returns all tests', type: [Test] })
  @ApiBadRequestResponse({ description: 'Failed to return tests' })
  @UseGuards(JwtAuthGuard)
  public async findAllTests(): Promise<Test[]> {
    try {
      return await this.testsService.findAllTests();
    }
    catch(error) {
      throw new HttpException(`Server response failed! Details: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Successfully returns the test by matching ID', type: Patient })
  @ApiBadRequestResponse({ description: 'Failed to return the test by ID' })
  @UseGuards(JwtAuthGuard)
  public async findOneTestById(@Param('id') id: number | string): Promise<Test> {
    try {
      const testId = typeof(id) == 'string' ? Number(id) : id;
      return await this.testsService.findOneTestById(testId);
    }
    catch(error) {
      throw new HttpException(`Server response failed! Details: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Successfully deletes product by ID', type: Boolean })
  @ApiBadRequestResponse({ description: 'Failed to delete the specified product' })
  @UseGuards(JwtAuthGuard)
  public async deleteTestById(@Param('id') id: number | string): Promise<boolean> {
    try {
      const testId = typeof(id) == 'string' ? Number(id) : id;
      return await this.testsService.deleteTestById(testId)
    }
    catch(error) {
      throw new HttpException(`Server response failed! Details: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Successfully updates a medical test', type: Boolean })
  @ApiBadRequestResponse({ description: 'Failed to update medical test details' })
  @UseGuards(JwtAuthGuard)
  public async updateMedicalTestById(@Param('id') id: string | number, @Body() updateMedicalTestDto: UpdateMedicalTestDto): Promise<boolean> {
    try {
      const testId = typeof(id) == 'string' ? Number(id) : id;
      return await this.testsService.updateMedicalTestById(testId, updateMedicalTestDto);
    }
    catch(error) {
      throw new HttpException(`Server response failed! Details: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
