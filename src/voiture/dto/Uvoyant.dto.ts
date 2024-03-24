import { IsOptional } from "class-validator";


export class Uvoyantdto{
@IsOptional()
nom:string;
@IsOptional()
description:string;
@IsOptional()
image:string;

}