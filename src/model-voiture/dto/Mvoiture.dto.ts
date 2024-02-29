import { IsNotEmpty } from "class-validator";

export class MvoitureDto{
@IsNotEmpty()
Marque:string;
@IsNotEmpty()
Modele:string;


}