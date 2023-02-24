import { ApiProperty } from "@nestjs/swagger";
import { Length } from "class-validator";

export class CreateMedicalTestDto {
    @ApiProperty({ description: 'Date of medication', example: new Date() })
    testDate?: Date;
    
    @ApiProperty({ description: 'Description of the medication', example: 'Operation' })
    @Length(0,9999)
    description?: string;

    @ApiProperty({ description: 'Medicines involved', example: 'Operation' })
    @Length(0,9999)
    medicine?: string;

    @ApiProperty({ description: 'Whether the test is closed or not', example: false })
    isClosed?: boolean;

    @ApiProperty({ description: 'Id of the patient', example: 67804521 })
    patientId: number;

    @ApiProperty({ description: 'Id of the doctor in charge', example: 67804521 })
    doctorId?: number;
}
