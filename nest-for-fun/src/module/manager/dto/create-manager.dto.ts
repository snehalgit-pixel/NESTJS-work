/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateManagerDto {
    @ApiProperty({ description: 'ID of the Manager', example: '1354' })
    @IsNotEmpty({ message: 'Id cannot be empty' })
    managerId: number;

    @ApiProperty({ description: 'Name of the Manager', example: 'Vikram' })
    name?: string;

    @ApiProperty({ description: 'IDs of the stores under the specific manager', example: [1, 2] })
    storeIds?: number[];
}
