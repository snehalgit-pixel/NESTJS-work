import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";

export class CreateDoctorDto {
    @ApiProperty({ description: 'Name of the doctor', example: 'Dr. Amy Thomas' })
    @IsNotEmpty({message: 'Name cannot be empty'})
    @Length(1,9999)
    doctorName: string;

    @ApiProperty({ description: 'Contact number of the doctor', example: 9806745321 })
    @IsNotEmpty({message: 'Contact number cannot be empty'})
    @Length(1,10)
    contactNumber: number;

    @ApiProperty({ description: 'Registration number of the doctor', example: 1123465789018722 })
    @IsNotEmpty({message: 'Registration number cannot be empty'})
    @Length(1,12)
    registrationNumber: number;

    @ApiProperty({ description: 'Email ID of the doctor', example: 'amyThomas@yahoo.com' })
    @Length(1,9999)
    emailId?: string;

    @ApiProperty({ description: 'Date of joining of the doctor', example: new Date() })
    dateOfJoining?: Date;

    @ApiProperty({ description: 'Specialization of the doctor', example: ['Gynaecologist', 'Oncologist'] })
    specialization?: string;

    @ApiProperty({ description: 'IDs of the patients', example: [57804521, 1327887] })
    patientIds?: number[]
}
