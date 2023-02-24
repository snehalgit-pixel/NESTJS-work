import { IsNotEmpty, Length, Matches } from "class-validator";
import { REGEX } from "src/utils/gen.utils";

export class CreateUserDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @Length(8, 24)
    userName: string;

    @IsNotEmpty()
    @Length(8, 999)
    email: string;

    @IsNotEmpty()
    @Length(8, 24)
    @Matches(REGEX.PASSWORD_RULE)
    password: string;

    @IsNotEmpty()
    @Length(8, 24)
    @Matches(REGEX.PASSWORD_RULE)
    confirmPassword: string;
}

export class LoginUserDto {
    @IsNotEmpty()
    @Length(8, 50)
    email: string;

    @IsNotEmpty()
    @Length(8, 24)
    @Matches(REGEX.PASSWORD_RULE)
    password: string;
}
