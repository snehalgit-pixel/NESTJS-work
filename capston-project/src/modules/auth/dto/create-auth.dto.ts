import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateAuthDto {
    @ApiProperty({ description: 'Username of the login', example: 'mk700@gmail.com' })
    @IsNotEmpty()
    username: string;
  
    @ApiProperty({ description: 'Password', example: 'Mk@12345' })
    @IsNotEmpty()
    password: string;
}
