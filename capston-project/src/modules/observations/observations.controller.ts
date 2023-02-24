import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put, HttpException, HttpStatus } from '@nestjs/common';
import { ObservationsService } from './observations.service';
import { CreateObservationDto } from './dto/create-observation.dto';
import { UpdateObservationDto } from './dto/update-observation.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Observation } from './entities/observation.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
@ApiTags('Observations')
@UseGuards(JwtAuthGuard)
@Controller('observations')
export class ObservationsController {
  constructor(private readonly observationsService: ObservationsService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Successfully adds a new observation', type: Observation })
  @ApiBadRequestResponse({ description: 'Failed to add a new observation' })
  @UseGuards(JwtAuthGuard)
  public async createObservation(@Body() createObservationDto: CreateObservationDto): Promise<Observation> {
    try {
      return await this.observationsService.createObservation(createObservationDto);
    }
    catch(error) {
      throw new HttpException(`Server response failed! Details: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @Get()
  @ApiOkResponse({ description: 'Successfully returns all observation', type: [Observation] })
  @ApiBadRequestResponse({ description: 'Failed to return observation' })
  @UseGuards(JwtAuthGuard)
  public async findAllObservations(): Promise<Observation[]> {
    try {
      return await this.observationsService.findAllObservations();
    }
    catch(error) {
      throw new HttpException(`Server response failed! Details: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Successfully returns the observation by matching ID', type: Observation })
  @ApiBadRequestResponse({ description: 'Failed to return the observation by ID' })
  @UseGuards(JwtAuthGuard)
  public async findOneObservationById(@Param('id') id: number | string): Promise<Observation> {
    try {
      const observationId = typeof(id) == 'string' ? Number(id) : id;
      return await this.observationsService.findOneObservationById(observationId);
    }
    catch(error) {
      throw new HttpException(`Server response failed! Details: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Successfully deletes observation by ID', type: Boolean })
  @ApiBadRequestResponse({ description: 'Failed to delete the specified observation' })
  @UseGuards(JwtAuthGuard)
  public async deleteObservationById(@Param('id') id: number | string): Promise<boolean> {
    try {
      const observationId = typeof(id) == 'string' ? Number(id) : id;
      return await this.observationsService.deleteObservationById(observationId)
    }
    catch(error) {
      throw new HttpException(`Server response failed! Details: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Successfully updates an observation', type: Boolean })
  @ApiBadRequestResponse({ description: 'Failed to update observation details' })
  @UseGuards(JwtAuthGuard)
  public async updateObservationById(@Param('id') id: string | number, @Body() updateObservationDto: UpdateObservationDto): Promise<boolean> {
    try {
      const observationId = typeof(id) == 'string' ? Number(id) : id;
      return await this.observationsService.updateObservationById(observationId, updateObservationDto);
    }
    catch(error) {
      throw new HttpException(`Server response failed! Details: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
