import { TimeStampEntity } from "src/generics/timestamp.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('model-voiture')
export class Mvoiture extends TimeStampEntity { 
@PrimaryGeneratedColumn()
Id:number;

@Column()
Marque:string;

@Column()
Modele:string;


@ManyToOne(
    type =>User,
    (user)=>user.voiture)
user:User;
}