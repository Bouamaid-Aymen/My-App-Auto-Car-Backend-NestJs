import { IsNotEmpty, IsOptional } from "class-validator";

export class maintenaceDto{
    @IsNotEmpty()
    date:string;
    @IsNotEmpty()
    km:number;
    @IsOptional()
    constatations:string;
    @IsOptional()
    defectuosites:string;
    @IsOptional()
    essaisFreinage:string;
    @IsOptional()
    distancesArret:string;
    @IsOptional()
    personneOperation:string;
    @IsOptional()
    modifications:string;
    @IsOptional()
    autre:string;
}