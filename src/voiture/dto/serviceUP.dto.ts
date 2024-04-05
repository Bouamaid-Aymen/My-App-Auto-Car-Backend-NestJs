import { IsEmail, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
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
    adress :string;
}