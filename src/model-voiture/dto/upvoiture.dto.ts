import { IsNotEmpty, IsOptional } from "class-validator";

export class upmvoitureDto{
@IsOptional()
Modele:string;

@IsOptional()
Marque:string;

}