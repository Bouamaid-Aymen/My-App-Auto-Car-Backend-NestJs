import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, } from "class-validator";

export class UpDateDTO2 {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    newemail: string;

    @IsOptional()
    @IsString()
    newusername: string;
    
    @IsNotEmpty()
    @IsString()
    oldPassword: string;
}

 