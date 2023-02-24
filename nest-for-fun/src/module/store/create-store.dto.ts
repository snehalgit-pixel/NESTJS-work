/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";

export class CreateStoreRequest {
    @ApiProperty({ description: 'Title of the store', example: 'Verma store' })
    @IsNotEmpty({message: 'Title cannot be empty'})
    @Length(3,255)
    title: string;

    // @IsNotEmpty({message: 'ID cannot be empty'})
    // id: number;
    @ApiProperty({ description: 'Description of the store', example: 'Daily necessities' })
    description: string;
}
