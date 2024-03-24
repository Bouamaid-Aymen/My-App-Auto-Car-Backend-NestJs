import { IsNotEmpty } from "class-validator";
import { VerificationEnum } from "src/enums/verification.enums";

export class serviceDto{
    @IsNotEmpty()
    email : string; 
    @IsNotEmpty()
    nomS : string; 
    @IsNotEmpty()
    nomP:string;
    @IsNotEmpty()
    tel :string;
    @IsNotEmpty()
    verifier:VerificationEnum;
}