import { IsNotEmpty } from "class-validator";


export class voyantdto{
@IsNotEmpty()
nom:string;
@IsNotEmpty()
description:string;
@IsNotEmpty()
critique:string;
@IsNotEmpty()
image:string;
}