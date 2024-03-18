import { IsDate } from "class-validator";
import { TimeStampEntity } from "src/generics/timestamp.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MaintenanceEntity } from "./Maintenance.entity";

@Entity('model-voiture')
export class Mvoiture extends TimeStampEntity { 
@PrimaryGeneratedColumn()
Id:number;
@Column()
brand:string;
@Column()
model:string;
@Column()
age:string;
@Column()
km:string;
@Column()
lastOilChangeDate:string;



@ManyToOne(
    type =>User,
    (user)=>user.voiture,
    {
        onDelete:"CASCADE"
    })

user:User;
@OneToMany(
    type=>MaintenanceEntity,
    (maintenace)=>maintenace.voiture,
    {
        onDelete: "CASCADE"  
    }
)
maintenance:MaintenanceEntity;
}