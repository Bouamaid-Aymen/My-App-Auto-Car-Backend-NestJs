import { IsEmail, IsNotEmpty, IsNumber } from "class-validator";
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
    adress :string;
}