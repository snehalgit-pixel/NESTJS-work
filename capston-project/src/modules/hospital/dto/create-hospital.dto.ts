import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateHospitalDto {
  @ApiProperty({ description: 'Hospital name', example: 'XYZA' })
  @IsNotEmpty({ message: 'Name cannot be empty' })
  hospitalName: string;

  @ApiProperty({ description: 'Hospital address', example: 'ABCD' })
  @Length(3, 355)
  @IsNotEmpty({ message: 'Address cannot be empty' })
  hospitalAddress: string;

  @IsNotEmpty({ message: 'patientId cannot be empty' })
  patientId: number;

  @IsNotEmpty({ message: 'doctorId cannot be empty' })
  doctorId: number;
}
