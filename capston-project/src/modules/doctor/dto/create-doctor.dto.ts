import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty,IsOptional,Length } from 'class-validator';

export class CreateDoctorDto {
    @ApiProperty({ description: 'Doctor ID of the doctor', example: 35 })
    doctorId: number;

    @ApiProperty({ description: 'Name of the doctor', example: 'Dr. Rohit' })
    @IsNotEmpty({message:'Doctor name cannot be empty'})
    @Length(3, 255)
    doctorName: string;

    @ApiProperty({ description: 'Registration number of the doctor', example: 19234 })
    @IsNotEmpty({message: 'Registration number cannot be empty'})
    @Length(1,10)
    registrationNumber: number;

    @ApiProperty({ description: 'Contact number of the doctor', example: 907856438 })
    @IsNotEmpty({message: 'Contact number cannot be empty'})
    @Length(1,10)
    contactNumber: number;

    @ApiProperty({ description: 'ID of the hospital', example: 5 })
    @IsOptional()
    hospital_Id?: number;

    @IsOptional()
    dateOfJoining?: Date;

    @ApiProperty({ description: 'Specialization of the doctor', example: 'Gynaecologist' })
    @IsOptional()
    speciality? :string;

    @ApiProperty({ description: 'Email ID of the doctor', example: 'amyThomas@yahoo.com' })
    @IsOptional()
    @Length(1,9999)
    emailId?: string;

    @IsOptional()
    patientIds?: number[]
}
