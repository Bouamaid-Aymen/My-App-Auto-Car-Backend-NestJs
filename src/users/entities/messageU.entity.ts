
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { TimeStampEntity } from "src/generics/timestamp.entity";

@Entity('message')
export class message extends TimeStampEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    message: string;

    @Column()
    usernameU: string;  

    @Column()
    email: string;

    @Column()
    nom_service: string;
    @Column()
    emailU:string
    @Column()
    idUser:number
    @ManyToOne(
        type => User,
        (user)=>user.message,
        {

            onDelete: "CASCADE"
        }
        
    )
    user:User;
   
}
