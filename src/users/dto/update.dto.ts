import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, } from "class-validator";

export class UpDateDTO {
    @IsNotEmpty()
    @IsOptional()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    oldPassword: string;

    @IsNotEmpty()
    @IsString()
    newPassword: string;
}