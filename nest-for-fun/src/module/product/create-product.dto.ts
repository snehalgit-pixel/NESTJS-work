/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";

export class CreateProductRequest {
    @ApiProperty({ description: 'Name or title of the product', example: 'NN Washing Powder' })
    @IsNotEmpty({message: 'Title cannot be empty'})
    @Length(3,255)
    title: string;
    
    @ApiProperty({ description: 'Description of the product and its purpose', example: 'Washing powder for clothes only' })
    description?: string;

    @ApiProperty({ description: 'Marked price of the product', example: 265 })
    price?: number;

    @ApiProperty({ description: 'Denotes if the product is available or not', example: true })
    isAvailable?: boolean;

    @ApiProperty({ description: 'ID of the store where the product is kept for sale', example: 2 })
    @IsNotEmpty()
    storeId: number;
}