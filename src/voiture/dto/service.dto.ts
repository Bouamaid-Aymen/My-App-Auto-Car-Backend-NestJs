import { IsEmail, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { VerificationEnum } from "src/enums/verification.enums";

export class serviceDto{
    @IsNotEmpty()
    @IsEmail()
    email : string; 
    @IsNotEmpty()
    nomS : string; 
    @IsNotEmpty()
    nomP:string;
    @IsNotEmpty()
    tel :number;
    @IsNotEmpty()
    gouvernorat:string;
    @IsNotEmpty()
    ville:string;
    @IsNotEmpty()
    description:string;
    @IsNotEmpty()
    password: string;
    @IsOptional()
    localisation:string;
}