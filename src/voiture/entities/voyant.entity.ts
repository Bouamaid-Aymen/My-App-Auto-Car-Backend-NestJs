import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Init } from "v8";

@Entity('voyant')
export class Voyant{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    nom:string;
    @Column()
    description:string;


}