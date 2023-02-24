import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";

export class CreatePatientDto {
    @ApiProperty({ description: 'Name of the patient', example: 'Jerry Thomas' })
    @IsNotEmpty({message: 'Name cannot be empty'})
    @Length(1,9999)
    patientName: string;

    @ApiProperty({ description: 'Contact number of the patient', example: 9806745321 })
    @IsNotEmpty({message: 'Contact number cannot be empty'})
    @Length(1,10)
    contactNumber: number;

    @ApiProperty({ description: 'Aadhar number of the patient', example: 1123465789018722 })
    @IsNotEmpty({message: 'Aadhar number cannot be empty'})
    @Length(1,16)
    aadharNumber: number;

    @ApiProperty({ description: 'Email ID of the patient', example: 'jthomas@yahoo.com' })
    @Length(1,9999)
    emailId?: string;

    @ApiProperty({ description: 'Date of admission of the patient', example: new Date() })
    dateOfAdmission?: Date;

    @ApiProperty({ description: 'IDs of the doctors treating the patient', example: [67804521, 1320987] })
    doctorIds?: number[];

    @ApiProperty({ description: 'IDs of the medications', example: [67804521, 1320987] })
    medicationIds?: number[];

    @ApiProperty({ description: 'IDs of the observations', example: [67804521, 1320987] })
    observationIds?: number[];
}
