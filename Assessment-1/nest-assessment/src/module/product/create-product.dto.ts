/* eslint-disable prettier/prettier */
import { IsNotEmpty, Length } from "class-validator";

export class CreateProductRequest {
    @IsNotEmpty({message: 'Name cannot be empty'})
    @Length(3,255)
    name = '';
    
    description?: string;
    price?: number;
    isAvailableForSale?: boolean;
    isInStock?: boolean;
    isCoveredInReturnPolicy?: boolean;
    category?: string;
}