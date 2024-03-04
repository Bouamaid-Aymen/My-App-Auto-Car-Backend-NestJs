import { IsNotEmpty} from "class-validator";
export class MvoitureDto{
@IsNotEmpty()
brand:string;
@IsNotEmpty()
model:string;
@IsNotEmpty()
age:string;
@IsNotEmpty()
km:string;
@IsNotEmpty()
lastOilChangeDate:string

}