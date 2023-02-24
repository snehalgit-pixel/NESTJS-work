import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';
import { Hospital } from './entities/hospital.entity';

@Injectable()
export class HospitalService {
  constructor(
    @InjectRepository(Hospital) private hospitalService: Repository<Hospital>
) {}
public async addHospital(createHospitalDto: CreateHospitalDto): Promise<Hospital> {
  return await this.hospitalService.save({
    hospitalName: createHospitalDto.hospitalName,
    hospitalAddress: createHospitalDto.hospitalAddress,
});
}

public async findAllHospitals(): Promise<Hospital[]> {
    return await this.hospitalService.find(
      {
          order: { hospital_Id: 'DESC' }
      }
      );
  }

  public async findOneHospitalById(id: number, requestFrom?: string): Promise<Hospital> {
    if(requestFrom == 'doctor') {
      return await this.hospitalService.findOne({
        where: { hospital_Id:id  },
        relations: ['doctor'],
      });
    }
    else if (requestFrom == 'patient') {
      return await this.hospitalService.findOne({
        where: { hospital_Id:id  },
        relations: ['patient'],
      });
    }
    else {
      return await this.hospitalService.findOne({
        where: { hospital_Id: id  }
      });
    }
  }

  public async updateHospitalById(hospitalId: number, updateHospitalDto: UpdateHospitalDto): Promise<boolean> {
    const response = await this.hospitalService.update(hospitalId, updateHospitalDto);
    if (!response) {
      return false;
    }
    return true;
  }
}
