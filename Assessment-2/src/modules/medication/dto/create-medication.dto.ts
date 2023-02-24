import { ApiProperty } from "@nestjs/swagger";
import { Length } from "class-validator";

export class CreateMedicationDto {
    @ApiProperty({ description: 'Date of medication', example: new Date() })
    date?: Date;
    
    @ApiProperty({ description: 'Description of the medication', example: 'Operation' })
    @Length(0,9999)
    description?: string;

    @ApiProperty({ description: 'Id of the patient', example: 67804521 })
    patientId: number;
}
