/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Manager } from './entities/manager.entity';
import { Put } from '@nestjs/common/decorators';

@ApiTags('Manager')
@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Successfully adds a new manager', type: Manager })
  @ApiBadRequestResponse({ description: 'Failed to add a new manager' })
  create(@Body() createManagerDto: CreateManagerDto) {
    return this.managerService.create(createManagerDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Successfully returns all existing managers', type: Manager })
  @ApiBadRequestResponse({ description: 'Failed to return managers' })
  findAll() {
    return this.managerService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Successfully returns a specific manager', type: Manager })
  @ApiBadRequestResponse({ description: 'Failed to return the specific manager' })
  @ApiParam({
    description: 'Manager ID',
    name: 'id',
    example: 1
  })
  findOne(@Param('id') id: string) {
    return this.managerService.findOne(+id);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Successfully updates a manager', type: Manager })
  @ApiBadRequestResponse({ description: 'Failed to update manager details' })
  update(@Param('id') id: string, @Body() updateManagerDto: UpdateManagerDto) {
    return this.managerService.update(+id, updateManagerDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Successfully deletes a manager', type: Manager })
  @ApiBadRequestResponse({ description: 'Failed to delete manager' })
  remove(@Param('id') id: string) {
    return this.managerService.remove(+id);
  }
}
