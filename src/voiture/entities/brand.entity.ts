import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { modelEntity } from "./model.entity";

@Entity('brand')
export class brandEntity{

@PrimaryGeneratedColumn()
id:number;
@Column(
    { unique:true}
)
name:string;

@OneToMany(
    type => modelEntity ,
    (model)=>model.brand,
    {
        eager: true,
        onDelete: "CASCADE"        
        
    }
)
model:modelEntity[];
}