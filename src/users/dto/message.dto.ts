import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, } from "class-validator";
import { message } from "../entities/messageU.entity";

export class  messageDto {
    @IsNotEmpty()
    message:string;
    
    @IsOptional()
    @IsString()

    usernameU: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    nom_service: string;

    @IsOptional()
    emailU: string;
    @IsNotEmpty()
    idUser: number;
  


}