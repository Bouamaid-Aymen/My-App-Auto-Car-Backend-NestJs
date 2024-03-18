import { Column, Entity,ManyToOne,PrimaryGeneratedColumn} from "typeorm";
import { brandEntity } from "./brand.entity";

@Entity('model')
export class modelEntity{

    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;

    @ManyToOne(
        type=>brandEntity,
        (brand)=>brand.model,
        {
            onDelete: "CASCADE"   
        }
    )
    brand:brandEntity;
}