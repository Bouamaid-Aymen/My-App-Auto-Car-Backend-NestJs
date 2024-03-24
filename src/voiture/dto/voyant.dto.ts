import { IsNotEmpty } from "class-validator";


export class voyantdto{
@IsNotEmpty()
nom:string;
@IsNotEmpty()
description:string;
@IsNotEmpty()
image:string;
}