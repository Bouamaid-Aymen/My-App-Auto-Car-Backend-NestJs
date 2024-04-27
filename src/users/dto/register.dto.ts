import { IsEmail, IsNotEmpty, IsString, MinLength, } from "class-validator";

export class  RegisterDto {
    @IsNotEmpty()
    @IsString()

    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    tel: number;

    @IsNotEmpty()
    @MinLength(8)
    password: string;
}