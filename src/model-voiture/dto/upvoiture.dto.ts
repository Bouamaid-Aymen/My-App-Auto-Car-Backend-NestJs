import {  IsString,IsNotEmpty, IsOptional, isNotEmpty } from "class-validator";
export class upmvoitureDto{
    @IsOptional()
    brand:string;
    @IsOptional()
    model:string;
    @IsOptional()
    age:string;
    @IsOptional()
    km:string;
    @IsOptional()
    lastOilChangeDate:string

}
