import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, } from "class-validator";

export class UpDateDTO {
    @IsNotEmpty()
    @IsOptional()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    @IsOptional()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    password: string;
}