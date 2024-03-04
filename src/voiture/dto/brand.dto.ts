import { IsNotEmpty,  } from "class-validator";

export class brandDto{
    @IsNotEmpty({
        
    })
    name:string;


}