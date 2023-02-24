/* eslint-disable prettier/prettier */
import { IsNotEmpty, Length } from "class-validator";
import { Product } from "../product/product.entity";

export class PlaceOrderRequest {
    @IsNotEmpty({message: 'Name cannot be empty'})
    id = 0;

    @IsNotEmpty({message: 'Name cannot be empty'})
    @Length(3,255)
    nameOfPerson = '';
    
    amountPaid?: number;
    products?: Product[];
    dateOfOrder?: Date;
    discount?: number;
}