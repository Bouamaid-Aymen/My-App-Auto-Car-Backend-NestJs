import { IsNotEmpty, IsOptional } from "class-validator";

export class upmvoitureDto{
@IsNotEmpty()
@IsOptional()
Modele:string;
@IsNotEmpty()
@IsOptional()
Marque:string;
@IsNotEmpty()
@IsOptional()
Voyant:string;

}