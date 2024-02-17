import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SignUpDTO {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    //Pattern with regEx
    password: string;
}