import { Injectable } from '@nestjs/common';
import { CreateObservationDto } from './dto/create-observation.dto';
import { UpdateObservationDto } from './dto/update-observation.dto';

@Injectable()
export class ObservationService {
  create(createObservationDto: CreateObservationDto) {
    return 'This action adds a new observation';
  }

  findAll() {
    return `This action returns all observation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} observation`;
  }

  update(id: number, updateObservationDto: UpdateObservationDto) {
    return `This action updates a #${id} observation`;
  }

  remove(id: number) {
    return `This action removes a #${id} observation`;
  }
}
