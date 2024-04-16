import { IsEmail, IsNotEmpty, IsString, MinLength, } from "class-validator";

export class  messageDto {
    @IsNotEmpty()
    message:string;
    
    @IsNotEmpty()
    @IsString()

    usernameU: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    nom_service: string;

    @IsNotEmpty()
    emailU: string;
    

}