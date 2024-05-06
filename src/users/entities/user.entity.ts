import { RoleEnum } from "src/enums/role.enum";
import { TimeStampEntity } from "src/generics/timestamp.entity";
import { Mvoiture } from "src/model-voiture/entites/voiture.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { message } from "./messageU.entity";

@Entity('user')
export class User extends TimeStampEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique:true
    })
    username: string;

    @Column({
        unique: true
    })
    email: string;

    @Column({
        
    })
    tel:number;

    @Column()
    password: string;
    @Column()
    salt:string;

    @Column({
        default: RoleEnum.USER
    })
    role: RoleEnum
    
    @OneToMany(
        type => Mvoiture ,
        (voiture)=>voiture.user,
        {
            eager: true,
            onDelete: "CASCADE"
        }
    )
    voiture:Mvoiture;
    @OneToMany(
        type =>message,
        (message)=>message.user,
        {
            eager: true,
            onDelete:"CASCADE"
        })
        discussions: message[];
}