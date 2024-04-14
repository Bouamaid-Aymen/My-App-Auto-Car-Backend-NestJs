import { IsEmail, IsOptional } from "class-validator";
import { VerificationEnum } from "src/enums/verification.enums";

export class serviceUPDto{
    @IsOptional()
    @IsEmail()
    email : string; 
    @IsOptional()
    nomS : string; 
    @IsOptional()
    nomP:string;
    @IsOptional()  
    tel :number;
    @IsOptional()
    gouvernorat:string;
    @IsOptional()
    ville:string;
    @IsOptional()
    description:string;
    @IsOptional()
    localisation:string;
}