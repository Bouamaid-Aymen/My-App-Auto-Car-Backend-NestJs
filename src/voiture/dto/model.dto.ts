import { IsNotEmpty,  } from "class-validator";

export class modeldDto{
    @IsNotEmpty({
        
    })
    name:string;
    brand:number;


}